import { Genre } from "./genresTypes";

// MOVIE

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
  page: number;
}

//MOVIEDETAILS

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

export interface movieDetails {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
  genres?: Genre[];
  overview: string;
  release_date: string;
  vote_avarage: number;
  credits: {
    cast: Cast[];
  }
  runtime: number;
  revenue: number;
  budget: number;
  tagline: string;
  vote_average: number;
}
