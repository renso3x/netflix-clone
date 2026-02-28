import { useMemo, useState } from 'react';

import Container from '../components/Container';
import MoviesRow from '../components/MoviesRow';
import Navigation from '../components/Navigation';
import { useDiscoverList } from '../hooks/useDiscoverList';
import { getTitle } from '../utils/tmdb';

const Movies = () => {
  const { titles, isLoading, error } = useDiscoverList('movie');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTitles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return titles;
    return titles.filter((item) => getTitle(item).toLowerCase().includes(query));
  }, [searchQuery, titles]);

  const rowTitle = useMemo(() => {
    const trimmed = searchQuery.trim();
    return trimmed ? `Movie results for "${trimmed}"` : 'Movies';
  }, [searchQuery]);

  const rowHelper = useMemo(() => {
    const trimmed = searchQuery.trim();
    if (trimmed) return 'Filtered by search';
    if (isLoading) return 'Loading popular movies...';
    if (error) return 'Unable to load movies right now.';
    return 'Popular movie picks for you';
  }, [error, isLoading, searchQuery]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="relative isolate overflow-hidden pb-8">
        <div className="relative z-10">
          <Container>
            <Navigation searchQuery={searchQuery} onSearchChange={setSearchQuery} />

            <header className="mt-10 mb-4 flex flex-col gap-2">
              {error && !isLoading && (
                <p className="text-sm text-red-300">{error}</p>
              )}
            </header>

            <MoviesRow
              title={rowTitle}
              helperText={rowHelper}
              movies={filteredTitles}
              emptyFallback={isLoading ? 'Loading movies...' : 'No movies available.'}
            />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Movies;
