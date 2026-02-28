import { useEffect, useMemo, useState } from 'react';

import { fetchActionMovies, fetchComedyMovies, fetchTopRated, fetchTrending } from '../api/api';
import type { Movie, CategoryKey } from '../types';
import { loadFavorites } from '../utils/favorites.ts';
import { mapTmdbTitleToMovie } from '../utils/tmdb';

export const useLandingData = () => {
  const [trending, setTrending] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [comedyMovies, setComedyMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('trending');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [trendingData, topRatedData, actionData, comedyData] = await Promise.all([
          fetchTrending(),
          fetchTopRated(),
          fetchActionMovies(),
          fetchComedyMovies(),
        ]);

        setTrending(trendingData.map(mapTmdbTitleToMovie));
        setTopRated(topRatedData.map(mapTmdbTitleToMovie));
        setActionMovies(actionData.map(mapTmdbTitleToMovie));
        setComedyMovies(comedyData.map(mapTmdbTitleToMovie));
        setFavorites(loadFavorites());
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Unable to load titles right now. Please try again soon.');
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, []);

  const heroMovie = trending[0];

  const categoryMovies = useMemo(() => {
    switch (activeCategory) {
      case 'top_rated':
        return topRated;
      case 'action':
        return actionMovies;
      case 'comedy':
        return comedyMovies;
      case 'trending':
      default:
        return trending;
    }
  }, [activeCategory, actionMovies, comedyMovies, topRated, trending]);

  const topTen = useMemo(() => trending.slice(0, 10), [trending]);

  return {
    trending,
    topRated,
    actionMovies,
    comedyMovies,
    favorites,
    activeCategory,
    setActiveCategory,
    isLoading,
    error,
    heroMovie,
    categoryMovies,
    topTen,
  };
};
