import { useEffect, useState, useMemo } from 'react';

import { fetchTitleDetails } from '../api/api';
import type { TmdbTitle } from '../api/api';
import { FAVORITES_KEY } from '../utils/favorites';
import { buildImageUrl } from '../utils/tmdb';

export const useDetailsData = (id?: string, type?: 'movie' | 'tv') => {
  const [title, setTitle] = useState<TmdbTitle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!id || !type) return;
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchTitleDetails(id, type);
        setTitle(data);
        setIsFavorite(checkIsFavorite(data.id));
      } catch (err) {
        console.error(err);
        setError('Unable to load details.');
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [id, type]);

  const toggleFavorite = () => {
    if (!title) return;
    const favorites = getFavorites();
    const exists = favorites.find((item) => item.id === title.id);
    let next: TmdbTitle[];
    if (exists) {
      next = favorites.filter((item) => item.id !== title.id);
    } else {
      next = [...favorites, title];
    }
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    setIsFavorite(!exists);
  };

  const imageUrl = useMemo(() => {
    if (!title) return '';
    const path = title.backdrop_path || title.poster_path;
    return path ? buildImageUrl(path, 'w780') : '';
  }, [title]);

  const year = useMemo(() => {
    const raw = title?.release_date || title?.first_air_date || '';
    return raw.split('-')[0] || 'Unknown';
  }, [title]);

  const displayTitle = useMemo(() => {
    if (!title) return 'Untitled';
    return (
      title.title || title.name || title.original_title || title.original_name || 'Untitled'
    );
  }, [title]);

  return {
    title,
    isLoading,
    error,
    isFavorite,
    toggleFavorite,
    imageUrl,
    year,
    displayTitle,
  };
};

function getFavorites(): TmdbTitle[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? (JSON.parse(raw) as TmdbTitle[]) : [];
  } catch {
    return [];
  }
}

function checkIsFavorite(id: number): boolean {
  return getFavorites().some((item) => item.id === id);
}
