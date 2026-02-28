import { useMemo, useState } from 'react';

import Container from '../components/Container';
import MoviesRow from '../components/MoviesRow';
import Navigation from '../components/Navigation';
import type { Movie } from '../types';
import { loadFavorites } from '../utils/favorites';
import { getTitle } from '../utils/tmdb';

const MyList = () => {
  const [favorites] = useState<Movie[]>(() => loadFavorites());
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFavorites = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return favorites;
    return favorites.filter((movie) => getTitle(movie).toLowerCase().includes(query));
  }, [favorites, searchQuery]);

  const rowTitle = useMemo(() => {
    const trimmed = searchQuery.trim();
    return trimmed ? `My List results for "${trimmed}"` : 'My List';
  }, [searchQuery]);

  const rowHelper = useMemo(() => {
    const trimmed = searchQuery.trim();
    return trimmed ? 'Filtered favorites' : 'Your favorite titles';
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="relative isolate overflow-hidden pb-8">
        <div className="relative z-10">
          <Container>
            <Navigation searchQuery={searchQuery} onSearchChange={setSearchQuery} />

            <header className="mt-10 mb-4 flex flex-col gap-2">
              {!favorites.length && !searchQuery && (
                <p className="text-sm text-white/60">
                  You don&apos;t have any favorites yet. Add titles from details pages.
                </p>
              )}
            </header>

            <MoviesRow
              title={rowTitle}
              helperText={rowHelper}
              movies={filteredFavorites}
              emptyFallback={
                favorites.length
                  ? 'No favorites match your search.'
                  : 'No favorites yet. Add titles from details pages.'
              }
            />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default MyList;
