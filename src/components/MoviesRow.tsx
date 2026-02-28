import type { Movie } from '../types';
import { PosterCard } from './PosterCard';

type MoviesRowProps = {
  title?: string;
  helperText?: string;
  movies: Movie[];
  emptyFallback: string;
};

const MoviesRow = ({ title, helperText, movies, emptyFallback }: MoviesRowProps) => (
  <section className="space-y-3">
    <header className="flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-red-400">{helperText}</p>
        <h2 className="text-3xl uppercase">{title}</h2>
      </div>
      <button className="text-sm text-white/70 transition hover:text-white">View all</button>
    </header>

    {movies.length ? (
      <div className="scroll-row flex gap-3 overflow-x-auto pb-2 pr-3">
        {movies.map((movie) => (
          <PosterCard key={movie.id} movie={movie} />
        ))}
      </div>
    ) : (
      <p className="text-sm text-white/60">{emptyFallback}</p>
    )}
  </section>
);

export default MoviesRow;