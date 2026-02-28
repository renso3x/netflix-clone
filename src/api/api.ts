const TMDB_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
  },
} as const;

const API_URL = import.meta.env.VITE_API_URL;

export interface TmdbTitle {
  id: number;
  backdrop_path: string | null;
  poster_path: string | null;
  overview: string;
  vote_average: number;
  media_type?: 'movie' | 'tv';
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  release_date?: string;
  first_air_date?: string;
}

interface TmdbListResponse {
  results: TmdbTitle[];
}

async function tmdbGet<T>(path: string): Promise<T> {
  if (!API_URL) throw new Error('Missing VITE_API_URL');

  const url = `${API_URL}${path}`;
  const response = await fetch(url, TMDB_OPTIONS);

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function fetchTopTenMovies(): Promise<TmdbTitle[]> {
  const data = await tmdbGet<TmdbListResponse>('/trending/all/day');
  return data.results.slice(0, 10);
}

export async function fetchTrending(): Promise<TmdbTitle[]> {
  const data = await tmdbGet<TmdbListResponse>('/trending/all/day');
  return data.results;
}

export async function fetchTopRated(): Promise<TmdbTitle[]> {
  const data = await tmdbGet<TmdbListResponse>('/movie/top_rated?language=en-US&page=1');
  // Ensure media_type is set for consistency
  return data.results.map((item) => ({ ...item, media_type: item.media_type ?? 'movie' }));
}

export async function fetchActionMovies(): Promise<TmdbTitle[]> {
  const data = await tmdbGet<TmdbListResponse>(
    '/discover/movie?with_genres=28&language=en-US&sort_by=popularity.desc&page=1',
  );
  return data.results.map((item) => ({ ...item, media_type: item.media_type ?? 'movie' }));
}

export async function fetchComedyMovies(): Promise<TmdbTitle[]> {
  const data = await tmdbGet<TmdbListResponse>(
    '/discover/movie?with_genres=35&language=en-US&sort_by=popularity.desc&page=1',
  );
  return data.results.map((item) => ({ ...item, media_type: item.media_type ?? 'movie' }));
}

export async function fetchDiscoverMovies(): Promise<TmdbTitle[]> {
  const data = await tmdbGet<TmdbListResponse>(
    '/discover/movie?language=en-US&sort_by=popularity.desc&page=1',
  );
  return data.results.map((item) => ({ ...item, media_type: item.media_type ?? 'movie' }));
}

export async function fetchDiscoverTv(): Promise<TmdbTitle[]> {
  const data = await tmdbGet<TmdbListResponse>(
    '/discover/tv?language=en-US&sort_by=popularity.desc&page=1',
  );
  return data.results.map((item) => ({ ...item, media_type: item.media_type ?? 'tv' }));
}

export async function searchTitles(query: string): Promise<TmdbTitle[]> {
  if (!query.trim()) return [];
  const encoded = encodeURIComponent(query.trim());
  const data = await tmdbGet<TmdbListResponse>(
    `/search/multi?query=${encoded}&include_adult=false&language=en-US&page=1`,
  );
  return data.results;
}

export async function fetchTitleDetails(
  id: string,
  type: 'movie' | 'tv',
): Promise<TmdbTitle> {
  const details = await tmdbGet<TmdbTitle>(`/${type}/${id}?language=en-US`);
  return { ...details, media_type: type };
}

