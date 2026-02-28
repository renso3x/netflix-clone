// Define reusable types and interfaces here

// Movie type
export interface Movie {
  id: number;
  title: string;
  backdrop_path?: string;
  poster_path?: string;
  media_type?: string;
  overview?: string;
  vote_average?: number;
}

// CategoryKey type
export type CategoryKey = 'trending' | 'top_rated' | 'action' | 'comedy';