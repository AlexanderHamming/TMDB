import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieByGenre } from "../services/TBMDAPI";
import { MovieResponse } from "../types/moviesTypes";
import { Alert, Spinner } from "react-bootstrap";
import Movies from "../components/Movies";
import Navigation from "../components/navbar";
import { useGenres } from "../hooks/useGenres";
import Pagination from "../components/pagination";

const GenreMovies: React.FC = () => {
  const { genreId } = useParams<{ genreId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

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
    isFetching,
  } = useQuery<MovieResponse, Error>({
    queryKey: ["genreMovies", genreId, currentPage],
    queryFn: () => getMovieByGenre(Number(genreId), currentPage),
  });

  const handleNextPage = () => {
    if (genreMovies && genreMovies.page < genreMovies.total_pages) {
      const nextPage = currentPage + 1;
      setSearchParams({ page: nextPage.toString() });
    }
  };

  const handlePreviousPage = () => {
    if (genreMovies && genreMovies.page > 1) {
      const prevPage = currentPage - 1;
      setSearchParams({ page: prevPage.toString() });
    }
  };

  if (isGenresLoading || (isLoading && !isFetching)) {
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
      {genreMovies && <Movies movies={genreMovies.results} />}
      {isFetching && (
        <div className="text-center my-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {genreMovies && (
        <Pagination
          hasNextPage={genreMovies.page < genreMovies.total_pages}
          hasPreviousPage={genreMovies.page > 1}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
          currentPage={genreMovies.page}
          totalPages={genreMovies.total_pages}
          isLoading={isFetching}
        />
      )}
    </div>
  );
};
export default GenreMovies;
