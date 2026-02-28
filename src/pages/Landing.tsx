import { useMemo, useState } from 'react';

import CategoryFilter from '../components/CategoryFilter';
import Container from '../components/Container';
import HeroDetails from '../components/HeroDetails';
import HeroFallback from '../components/HeroFallback';
import MoviesRow from '../components/MoviesRow';
import Navigation from '../components/Navigation';
import TopTenRow from '../components/TopTenRow';
import { useLandingData } from '../hooks/useLandingData';
import { getCategoryHelper, getCategoryLabel } from '../utils/categories';
import { buildImageUrl, getTitle } from '../utils/tmdb';

const Landing = () => {
  const {
    activeCategory,
    setActiveCategory,
    isLoading,
    error,
    heroMovie,
    categoryMovies,
    topTen,
  } = useLandingData();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMovies = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return categoryMovies;
    return categoryMovies.filter((movie) =>
      getTitle(movie).toLowerCase().includes(query),
    );
  }, [categoryMovies, searchQuery]);

  const rowTitle = useMemo(() => {
    const trimmed = searchQuery.trim();
    return trimmed ? `Results for "${trimmed}"` : getCategoryLabel(activeCategory);
  }, [activeCategory, searchQuery]);

  const rowHelper = useMemo(() => {
    const trimmed = searchQuery.trim();
    return trimmed ? 'Filtered by search' : getCategoryHelper(activeCategory);
  }, [activeCategory, searchQuery]);
  const heroBackground = useMemo(() => {
    if (!heroMovie?.backdrop_path) return '';
    return buildImageUrl(heroMovie.backdrop_path, 'original');
  }, [heroMovie]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="relative isolate overflow-hidden pb-24">
        {heroBackground && (
          <>
            <img
              src={heroBackground}
              alt={getTitle(heroMovie)}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/70 to-transparent" />
          </>
        )}

        <div className="relative z-10">
          <Container>
            <Navigation
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            <section className="mt-10 grid gap-10 pb-8 md:grid-cols-[minmax(0,560px)_auto]">
              {heroMovie && !isLoading ? (
                <HeroDetails movie={heroMovie} />
              ) : (
                <HeroFallback isLoading={isLoading} error={error} />
              )}
            </section>
          </Container>
        </div>
      </div>

      <main className="space-y-8 bg-neutral-950 pb-16">
        <Container>
          <CategoryFilter
            active={activeCategory}
            onChange={setActiveCategory}
          />

          <MoviesRow
            title={rowTitle}
            helperText={rowHelper}
            movies={filteredMovies}
            emptyFallback="No titles available in this category right now."
          />

          <TopTenRow movies={topTen} />
        </Container>
      </main>
    </div>
  );
};
export default Landing;