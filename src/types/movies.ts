export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

export interface MovieResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}
