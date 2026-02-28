import type { Movie } from '../types';
import { Link } from 'react-router-dom';
import { buildImageUrl, getTitle } from '../utils/tmdb';

const TopTenRow = ({ movies }: { movies: Movie[] }) => (
  <section className="space-y-3">
    <header className="flex items-center justify-between">
      <h2 className="text-3xl uppercase">Top 10 in your country</h2>
    </header>

    {movies.length ? (
      <div className="scroll-row flex gap-6 overflow-x-auto pb-3 pr-3">
        {movies.map((movie, index) => (
          <article
            key={movie.id}
            className="group relative shrink-0"
            style={{ width: 220 }} // controls card width like the design
          >
            {/* Big numeral behind */}
            <div className="pointer-events-none absolute -left-2 bottom-0 select-none">
              <span
                className="block text-[180px] font-black leading-[0.8] text-transparent"
                style={{
                  WebkitTextStroke: '10px rgba(255,255,255,0.10)',
                  textShadow: '0 20px 60px rgba(0,0,0,0.8)',
                }}
              >
                {index + 1}
              </span>
            </div>

            {/* Poster */}
            <div className="relative ml-16">
              {movie.poster_path ? (
                <Link to={`/title/${movie.media_type ?? 'movie'}/${movie.id}`}>
                  <img
                    src={buildImageUrl(movie.poster_path, 'w500')}
                    alt={getTitle(movie)}
                    className="h-72 w-44 rounded-2xl object-cover shadow-2xl transition group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </Link>
              ) : (
                <div className="flex h-72 w-44 items-center justify-center rounded-2xl bg-neutral-800 text-white/40">
                  No Art
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    ) : (
      <p className="text-sm text-white/60">
        Top titles will appear once available.
      </p>
    )}
  </section>
);

export default TopTenRow;