import type { Movie } from '../types';
import type { TmdbTitle } from '../api/api';

export const getTitle = (movie?: Movie | null) =>
  movie?.title || 'Untitled';

export const buildImageUrl = (
  path: string | null,
  size: 'original' | 'w500' | 'w780' = 'w500',
) => {
  if (!path) return '';
  const base = (import.meta.env.VITE_IMAGE_BASE_URL || '').replace(/\/$/, '');
  const normalizedBase = base.endsWith('/p') ? base : `${base}/p`;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase}/${size}${normalizedPath}`;
};

// Utility function to map TmdbTitle to Movie
export const mapTmdbTitleToMovie = (tmdbTitle: TmdbTitle): Movie => ({
  id: tmdbTitle.id,
  title: tmdbTitle.title || tmdbTitle.name || tmdbTitle.original_title || tmdbTitle.original_name || 'Untitled',
  backdrop_path: tmdbTitle.backdrop_path ?? undefined,
  poster_path: tmdbTitle.poster_path ?? undefined,
  media_type: tmdbTitle.media_type,
  overview: tmdbTitle.overview,
  vote_average: tmdbTitle.vote_average,
});
