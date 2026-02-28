import type { Movie } from '../types';

export const FAVORITES_KEY = 'netflix_favorites';

export const loadFavorites = (): Movie[] => {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? (JSON.parse(raw) as Movie[]) : [];
  } catch {
    return [];
  }
};
