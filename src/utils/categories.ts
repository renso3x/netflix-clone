import type { CategoryKey } from '../types';

export const getCategoryLabel = (category: CategoryKey): string => {
  switch (category) {
    case 'top_rated':
      return 'Top Rated';
    case 'action':
      return 'Action Hits';
    case 'comedy':
      return 'Comedies';
    case 'trending':
    default:
      return 'Trending Now';
  }
};

export const getCategoryHelper = (category: CategoryKey): string => {
  switch (category) {
    case 'top_rated':
      return 'Critics love these';
    case 'action':
      return 'High-octane picks';
    case 'comedy':
      return 'Laugh-out-loud titles';
    case 'trending':
    default:
      return 'Popular today';
  }
};
