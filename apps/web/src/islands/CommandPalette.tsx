import * as React from 'react';
import { Command } from 'cmdk';
import Fuse from 'fuse.js';
import { Search } from 'lucide-react';
import { getSearchIndex, CATEGORIES, type SearchableTool } from '@toolorbit/tool-registry';

// Bundled into the page's JS at build time by Vite/Astro — this is a plain
// in-memory array by the time it ships, not a fetch, so search is instant
// and the command palette never makes a network call.
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
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setOpen(false);
    }
    function onOpenRequest() {
      setOpen(true);
    }

    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('toolorbit:open-search', onOpenRequest);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('toolorbit:open-search', onOpenRequest);
    };
  }, []);

  const results = query.trim()
    ? fuse.search(query).map((r) => r.item)
    : SEARCH_INDEX;

  const grouped = results.reduce<Record<string, SearchableTool[]>>((acc, tool) => {
    (acc[tool.category] ??= []).push(tool);
    return acc;
  }, {});

  function navigateTo(slug: string) {
    setOpen(false);
    window.location.href = `/tools/${slug}`;
  }

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Search ToolOrbit"
      shouldFilter={false}
      className="fixed inset-0 z-command-palette"
    >
      <div
        className="fixed inset-0 bg-base-950/70 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div className="fixed left-1/2 top-24 w-[92vw] max-w-xl -translate-x-1/2 overflow-hidden rounded-xl border border-base-700 bg-base-900 shadow-lg">
        <div className="flex items-center gap-2 border-b border-base-700 px-4">
          <Search size={16} className="text-base-400" aria-hidden="true" />
          <Command.Input
            autoFocus
            value={query}
            onValueChange={setQuery}
            placeholder="Search tools…"
            className="h-12 flex-1 bg-transparent text-sm text-base-50 placeholder:text-base-400 focus:outline-none"
          />
          <kbd className="rounded border border-base-600 bg-base-800 px-1.5 py-0.5 font-mono text-[10px] text-base-400">
            Esc
          </kbd>
        </div>

        <Command.List className="max-h-[60vh] overflow-y-auto p-2">
          <Command.Empty className="px-3 py-6 text-center text-sm text-base-400">
            No tools found for "{query}"
          </Command.Empty>

          {Object.entries(grouped).map(([category, tools]) => (
            <Command.Group
              key={category}
              heading={categoryNameBySlug[category] ?? category}
              className="px-1 py-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-base-400"
            >
              {tools.map((tool) => (
                <Command.Item
                  key={tool.slug}
                  value={tool.slug}
                  onSelect={() => navigateTo(tool.slug)}
                  className="flex cursor-pointer flex-col gap-0.5 rounded-md px-3 py-2 text-sm text-base-100 aria-selected:bg-interactive-muted aria-selected:text-interactive"
                >
                  <span className="font-medium">{tool.name}</span>
                  <span className="text-xs text-base-400">{tool.description}</span>
                </Command.Item>
              ))}
            </Command.Group>
          ))}
        </Command.List>
      </div>
    </Command.Dialog>
  );
}
