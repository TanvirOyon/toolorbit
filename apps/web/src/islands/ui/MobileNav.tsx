import * as React from 'react';
import { Menu, X, Orbit } from 'lucide-react';

interface Category { slug: string; name: string; count: number }
interface Props { categories: Category[] }

export default function MobileNav({ categories }: Props) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  function openSearch() {
    setOpen(false);
    window.dispatchEvent(new Event('toolorbit:open-search'));
  }

  const liveCategories = categories.filter(c => c.count > 0);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}
        className="flex items-center justify-center rounded-md p-2 text-base-400 transition-colors hover:text-base-50 md:hidden"
        aria-label="Open navigation" aria-expanded={open}>
        <Menu size={20} aria-hidden />
      </button>

      {/* Backdrop */}
      {open && (
        <div className="fixed inset-0 z-40 bg-base-950/80 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)} aria-hidden />
      )}

      {/* Drawer */}
      <div role="dialog" aria-label="Navigation" aria-modal="true"
        className={`fixed inset-y-0 right-0 z-50 flex w-72 flex-col border-l border-base-700 bg-base-900 transition-transform duration-200 ease-out md:hidden ${open ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Drawer header */}
        <div className="flex h-16 items-center justify-between border-b border-base-700 px-4">
          <div className="flex items-center gap-2 font-display text-base font-bold text-base-50">
            <Orbit size={18} className="text-interactive" aria-hidden />
            ToolOrbit
          </div>
          <button type="button" onClick={() => setOpen(false)}
            className="rounded-md p-1.5 text-base-400 transition-colors hover:text-base-50" aria-label="Close">
            <X size={18} aria-hidden />
          </button>
        </div>

        {/* Search trigger */}
        <div className="px-4 pt-4">
          <button type="button" onClick={openSearch}
            className="flex w-full items-center gap-2 rounded-lg border border-base-700 bg-base-800 px-3 py-2.5 text-sm text-base-400 transition-colors hover:border-base-500 hover:text-base-200">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <span className="flex-1 text-left">Search tools…</span>
            <kbd className="rounded border border-base-600 bg-base-900 px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd>
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto px-4 pt-4" aria-label="Mobile navigation">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-base-500">Categories</p>
          <ul className="space-y-0.5 mb-5">
            {liveCategories.map((cat) => (
              <li key={cat.slug}>
                <a href={`/${cat.slug}-tools`} onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-base-200 transition-colors hover:bg-base-800 hover:text-interactive">
                  <span>{cat.name}</span>
                  <span className="rounded-full bg-base-800 px-2 py-0.5 text-xs text-base-500">{cat.count}</span>
                </a>
              </li>
            ))}
          </ul>

          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-base-500">More</p>
          <ul className="space-y-0.5">
            <li><a href="/blog" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm text-base-200 transition-colors hover:bg-base-800 hover:text-interactive">Blog</a></li>
            <li><a href="/about" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm text-base-200 transition-colors hover:bg-base-800 hover:text-interactive">About</a></li>
          </ul>
        </nav>

        {/* Footer links */}
        <div className="border-t border-base-700 px-4 py-4">
          <div className="flex gap-4 text-xs text-base-500">
            <a href="/login" onClick={() => setOpen(false)} className="hover:text-base-300 transition-colors">Sign in</a>
            <a href="/dashboard" onClick={() => setOpen(false)} className="hover:text-base-300 transition-colors">Dashboard</a>
            <a href="/privacy" onClick={() => setOpen(false)} className="hover:text-base-300 transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </>
  );
}
