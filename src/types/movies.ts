import { Genre } from "./genres";

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
  genres?: Genre[];
}

export interface MovieResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}
