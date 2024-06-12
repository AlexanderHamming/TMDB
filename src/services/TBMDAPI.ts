import axios from "axios";
import { GenreResponse, Genre } from "../types/genres";
import { Movie, MovieResponse } from "../types/movies";

const BASE_URL = import.meta.env.VITE_API_BASEURL;
const API_KEY = import.meta.env.VITE_API_KEY;

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const get = async <T>(endpoint: string): Promise<T> => {
  const res = await instance.get<T>(endpoint, {
    params: {
      api_key: API_KEY,
    },
  });
  return res.data;
};

export const getGenres = async (): Promise<Genre[]> => {
  return get<GenreResponse>("/genre/movie/list").then(
    (response) => response.genres
  );
};

export const getNowPlaying = async (): Promise<Movie[]> => {
  return get<MovieResponse>("/movie/now_playing").then(
    (response) => response.results
  );
};
