import * as React from 'react';
import { Command } from 'cmdk';
import Fuse from 'fuse.js';
import { Search, ArrowRight } from 'lucide-react';
import { getSearchIndex, CATEGORIES, type SearchableTool } from '@toolorbit/tool-registry';

const SEARCH_INDEX: SearchableTool[] = getSearchIndex();

const fuse = new Fuse(SEARCH_INDEX, {
  keys: [
    { name: 'name', weight: 2 },
    { name: 'description', weight: 1 },
    { name: 'keywords', weight: 1.5 },
  ],
  threshold: 0.35,
});

const categoryNameBySlug = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c.name]));

export default function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((p) => !p);
      }
      if (e.key === 'Escape') setOpen(false);
    }
    function onOpen() { setOpen(true); }
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('toolorbit:open-search', onOpen);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('toolorbit:open-search', onOpen);
    };
  }, []);

  // Reset query when closing
  React.useEffect(() => { if (!open) setQuery(''); }, [open]);

  const results = query.trim() ? fuse.search(query).map((r) => r.item) : SEARCH_INDEX;
  const grouped = results.reduce<Record<string, SearchableTool[]>>((acc, tool) => {
    (acc[tool.category] ??= []).push(tool);
    return acc;
  }, {});

  function go(slug: string) {
    setOpen(false);
    window.location.href = `/tools/${slug}`;
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[50] flex items-start justify-center pt-[10vh] px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-base-950/75 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Dialog */}
      <Command
        shouldFilter={false}
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-base-700 bg-base-900 shadow-2xl"
        aria-label="Search ToolOrbit"
      >
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-base-700 px-4 py-3">
          <Search size={16} className="shrink-0 text-base-400" aria-hidden="true" />
          <Command.Input
            autoFocus
            value={query}
            onValueChange={setQuery}
            placeholder="Search 42 tools..."
            className="h-8 flex-1 bg-transparent text-sm text-base-50 placeholder:text-base-500 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="shrink-0 text-xs text-base-500 hover:text-base-300 transition-colors"
            >
              Clear
            </button>
          )}
          <kbd
            onClick={() => setOpen(false)}
            className="shrink-0 cursor-pointer rounded border border-base-600 bg-base-800 px-1.5 py-0.5 font-mono text-[10px] text-base-400 hover:text-base-200 transition-colors"
          >
            Esc
          </kbd>
        </div>

        {/* Results */}
        <Command.List className="max-h-[55vh] overflow-y-auto overscroll-contain p-2">
          <Command.Empty className="flex flex-col items-center gap-2 py-10 text-center text-sm text-base-400">
            <Search size={24} className="text-base-600" />
            <span>No tools found for <strong className="text-base-300">"{query}"</strong></span>
          </Command.Empty>

          {Object.entries(grouped).map(([category, tools]) => (
            <Command.Group key={category}>
              <div className="mb-1 mt-3 px-2 text-[10px] font-semibold uppercase tracking-widest text-base-500 first:mt-0">
                {categoryNameBySlug[category] ?? category}
              </div>
              {tools.slice(0, query ? tools.length : 5).map((tool) => (
                <Command.Item
                  key={tool.slug}
                  value={tool.slug}
                  onSelect={() => go(tool.slug)}
                  className="group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-colors aria-selected:bg-interactive-muted"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-base-100 group-aria-selected:text-interactive truncate">
                      {tool.name}
                    </p>
                    <p className="mt-0.5 text-xs text-base-500 truncate">{tool.description}</p>
                  </div>
                  <ArrowRight
                    size={14}
                    className="shrink-0 text-base-600 opacity-0 transition-opacity group-aria-selected:text-interactive group-aria-selected:opacity-100"
                  />
                </Command.Item>
              ))}
              {!query && tools.length > 5 && (
                <a
                  href={`/${category}-tools`}
                  className="block px-3 py-1.5 text-xs text-base-500 hover:text-interactive transition-colors"
                >
                  +{tools.length - 5} more {categoryNameBySlug[category]} tools...
                </a>
              )}
            </Command.Group>
          ))}
        </Command.List>

        {/* Footer hint */}
        <div className="border-t border-base-700 px-4 py-2 flex items-center gap-4 text-[10px] text-base-600">
          <span><kbd className="font-mono">Enter</kbd> to open</span>
          <span><kbd className="font-mono">Esc</kbd> to close</span>
          <span className="ml-auto">{results.length} tools</span>
        </div>
      </Command>
    </div>
  );
}
