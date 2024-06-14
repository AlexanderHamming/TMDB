import axios from "axios";
import { GenreResponse, Genre } from "../types/genresTypes";
import { Movie, MovieResponse, movieDetails} from "../types/moviesTypes";

const BASE_URL = import.meta.env.VITE_API_BASEURL;
const API_KEY = import.meta.env.VITE_API_KEY;

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  params: {
    api_key: API_KEY,
    include_adult: false, 
  },
});

const get = async <T>(
  endpoint: string,
  params?: Record<string, unknown>
): Promise<T> => {
  const res = await instance.get<T>(endpoint, {
    params: {
      ...params,
      api_key: API_KEY,
      include_adult: false, 
    },
  });
  return res.data;
};

export const getGenres = async (): Promise<Genre[]> => {
  return get<GenreResponse>("/genre/movie/list").then(
    (response) => response.genres
  );
};

const getMovies = async (
  endpoint: string,
  params?: Record<string, unknown>
): Promise<Movie[]> => {
  const genres = await getGenres();
  const genreMap = genres.reduce((map, genre) => {
    map[genre.id] = genre;
    return map;
  }, {} as Record<number, Genre>);

  const movies = await get<MovieResponse>(endpoint, params).then(
    (response) => response.results
  );

  return movies.map((movie) => ({
    ...movie,
    genres: movie.genre_ids.map((id: number) => genreMap[id]),
  }));
};

export const getNowPlaying = async (): Promise<Movie[]> => {
  return getMovies("movie/now_playing");
};

export const getTopRated = async (): Promise<Movie[]> => {
  return getMovies("/movie/top_rated");
};

export const getTrending = async (): Promise<Movie[]> => {
  return getMovies("/trending/movie/week");
};

export const getMovieByGenre = async (genreId: number): Promise<Movie[]> => {
  return getMovies("/discover/movie", { with_genres: genreId });
};

export const getMovieDetails = async (movieId: number): Promise<movieDetails>{
  return 
}