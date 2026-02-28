import { useEffect, useState } from 'react';

import { fetchDiscoverMovies, fetchDiscoverTv } from '../api/api';
import type { Movie } from '../types';
import { mapTmdbTitleToMovie } from '../utils/tmdb';

export type DiscoverType = 'movie' | 'tv';

interface UseDiscoverListResult {
  titles: Movie[];
  isLoading: boolean;
  error: string | null;
}

export const useDiscoverList = (type: DiscoverType): UseDiscoverListResult => {
  const [titles, setTitles] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data =
          type === 'movie' ? await fetchDiscoverMovies() : await fetchDiscoverTv();

        setTitles(data.map(mapTmdbTitleToMovie));
      } catch (err) {
        console.error('Error fetching discover list', err);
        setError('Unable to load titles right now. Please try again soon.');
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [type]);

  return {
    titles,
    isLoading,
    error,
  };
};
