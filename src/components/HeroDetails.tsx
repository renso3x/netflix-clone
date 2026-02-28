import { getTitle } from '../utils/tmdb';
import type { Movie } from '../types';
import { faCircleInfo, faPlay } from '@fortawesome/free-solid-svg-icons';
import HeroActionButton from './HeroActionButton';

type HeroDetailsProps = {
  movie: Movie;
};

const HeroDetails = ({ movie }: HeroDetailsProps) => (
  <div className="flex flex-col gap-6">
    <div className="space-y-4">
      <span className="text-sm uppercase tracking-[0.3em] text-red-400">{movie.media_type === 'movie' ? 'Movie' : 'TV Series'}</span>
      <h1 className="text-6xl leading-none text-white drop-shadow-2xl md:text-7xl">
        {getTitle(movie)}
      </h1>
    </div>

    <div className="flex flex-wrap gap-4">
      <HeroActionButton label="Play" icon={faPlay} variant="primary" />
      <HeroActionButton label="More info" icon={faCircleInfo} variant="secondary" />
    </div>
  </div>
);

export default HeroDetails;