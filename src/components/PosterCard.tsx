import { Link } from "react-router";

import { buildImageUrl, getTitle } from "../utils/tmdb";

import type { Movie } from "../types";

export const PosterCard = ({ movie }: { movie: Movie }) => {
  const href = `/title/${movie.media_type ?? 'movie'}/${movie.id}`;

  return (
    <article className="group relative min-w-44 shrink-0">
      <Link to={href}>
        {movie.poster_path ? (
          <img
            src={buildImageUrl(movie.poster_path, 'w500')}
            alt={getTitle(movie)}
            className="h-72 w-44 rounded-2xl object-cover shadow-2xl transition group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-72 w-44 items-center justify-center rounded-2xl bg-neutral-800 text-white/40">
            No Art
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 transition group-hover:opacity-100" />

        <div className="pointer-events-none absolute bottom-0 w-full px-3 pb-3 opacity-0 transition group-hover:opacity-100">
          <h3 className="line-clamp-2 text-sm font-semibold text-white drop-shadow-lg">
            {getTitle(movie)}
          </h3>
        </div>
      </Link>
    </article>
  );
};
