import * as React from 'react';
import { Heart } from 'lucide-react';

interface Props {
  slug: string;
}

export default function FavoriteButton({ slug }: Props) {
  const [isFav, setIsFav]       = React.useState(false);
  const [loading, setLoading]   = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    fetch('/api/favorites', { credentials: 'include' })
      .then((r) => {
        if (r.status === 401) { setLoggedIn(false); setLoading(false); return []; }
        setLoggedIn(true);
        return r.json() as Promise<string[]>;
      })
      .then((slugs: string[]) => { setIsFav(slugs.includes(slug)); setLoading(false); })
      .catch(() => setLoading(false));
  }, [slug]);

  async function toggle() {
    if (!loggedIn) { window.location.href = '/login'; return; }
    const optimistic = !isFav;
    setIsFav(optimistic);
    setLoading(true);
    try {
      const r = await fetch('/api/favorites', {
        method: optimistic ? 'POST' : 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      });
      if (!r.ok) setIsFav(!optimistic);
    } catch { setIsFav(!optimistic); }
    finally { setLoading(false); }
  }

  const label = !loggedIn ? 'Sign in to save' : isFav ? 'Saved' : 'Save';
  const title = !loggedIn ? 'Sign in to save this tool' : isFav ? 'Remove from favorites' : 'Save to favorites';

  return (
    <button type="button" onClick={toggle} disabled={loading} aria-label={title} title={title}
      className={['flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-150 disabled:opacity-40',
        isFav && loggedIn
          ? 'border-completion/40 bg-completion-muted text-completion'
          : 'border-base-700 bg-base-900 text-base-400 hover:border-base-500 hover:text-base-200',
      ].join(' ')}>
      <Heart size={14} aria-hidden fill={isFav && loggedIn ? 'currentColor' : 'none'} />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
