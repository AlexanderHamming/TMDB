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
}

//MOVIEDETAILS

export interface Crew {
  id: number;
  name: string;
  job: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
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
    crew: Crew[];
    cast: Cast[];
  }
  
}
