import { useParams } from 'react-router';
import Container from '../components/Container';
import Navigation from '../components/Navigation';

import { useDetailsData } from '../hooks/useDetailsData';
import { buildImageUrl } from '../utils/tmdb';
import HeroActionButton from '../components/HeroActionButton';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const Details = () => {
  const { id, type } = useParams<{ id: string; type: 'movie' | 'tv' }>();
  const { title, isLoading, error, isFavorite, toggleFavorite, imageUrl, year, displayTitle } =
    useDetailsData(id, type);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="relative isolate overflow-hidden">
        {imageUrl && title && (
          <>
            <img
              src={imageUrl}
              alt={displayTitle}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/70 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-transparent" />
          </>
        )}

        <div className="relative z-10">
          <Container>
            <Navigation />

            <div className="pb-14 pt-6 md:pb-20 md:pt-10">
              {isLoading && (
                <p className="text-lg text-white/70">Loading details...</p>
              )}
              {!isLoading && error && (
                <p className="text-lg text-red-300">{error}</p>
              )}
              {!isLoading && !error && title && (
                <section className="grid items-end gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,0.9fr)]">
                  <div className="space-y-5">
                    <div className="space-y-3">
                      <span className="text-xs uppercase tracking-[0.4em] text-red-400">
                        {title.media_type === 'movie' ? 'Movie' : 'TV Series'}
                      </span>
                      <h1 className="text-4xl leading-none drop-shadow-2xl md:text-6xl">
                        {displayTitle}
                      </h1>

                      <div className="flex flex-wrap items-center gap-3 text-sm text-white/75">
                        <span>{year}</span>
                        <span className="rounded border border-white/40 px-2 py-0.5 text-[11px] uppercase">
                          {title.media_type === 'tv' ? 'TV' : 'Movie'}
                        </span>
                        <span className="rounded border border-white/40 px-2 py-0.5 text-[11px] uppercase">
                          Rating {title.vote_average?.toFixed(1) ?? 'N/A'}
                        </span>
                      </div>
                    </div>

                    <p className="max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
                      {title.overview || 'No description available.'}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <HeroActionButton
                        label="Play"
                        icon={faPlay}
                        variant="primary"
                      />

                      <HeroActionButton
                        label={isFavorite ? 'Remove from My List' : 'Add to My List'}
                        onClick={toggleFavorite}
                        variant="secondary"
                      />
                      <HeroActionButton
                        label="Back"
                        to="/"
                        variant="secondary"
                      />
                    </div>
                  </div>

                  {title.poster_path && (
                    <div className="hidden justify-end md:flex">
                      <img
                        src={buildImageUrl(title.poster_path, 'w500')}
                        alt={displayTitle}
                        className="w-64 rounded-3xl border border-white/10 shadow-2xl"
                      />
                    </div>
                  )}
                </section>
              )}
            </div>
          </Container>
        </div>

        <div className="h-16 bg-linear-to-t from-neutral-950 to-transparent" />
      </header>
    </div>
  );
};
export default Details;

