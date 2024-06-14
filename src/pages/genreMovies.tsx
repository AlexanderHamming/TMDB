import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieByGenre } from "../services/TBMDAPI";
import { Movie } from "../types/moviesTypes";
import { Alert, Spinner } from "react-bootstrap";
import Movies from "../components/Movies";
import Navigation from "../components/navbar";
import { useGenres } from "../hooks/useGenres";

const GenreMovies: React.FC = () => {
  const { genreId } = useParams<{ genreId: string }>();

  const {
    data: genres,
    isLoading: isGenresLoading,
    error: genresError,
    isError: isgeneresError,
  } = useGenres();

  const genre = genres?.find((genre) => genre.id === Number(genreId));

  const {
    data: genreMovies,
    isLoading,
    error,
    isError,
  } = useQuery<Movie[], Error>({
    queryKey: ["genreMovies", genreId],
    queryFn: () => getMovieByGenre(Number(genreId)),
  });

  if (isGenresLoading || isLoading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (isgeneresError || isError) {
    return (
      <Alert variant="danger">{error?.message || genresError?.message} </Alert>
    );
  }

  return (
    <div>
      <Navigation />
      <h1>{genre ? genre.name : "Movies"}</h1>
      {genreMovies && <Movies movies={genreMovies} />}
    </div>
  );
};

export default GenreMovies;
