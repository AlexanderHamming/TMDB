import { useQuery } from "@tanstack/react-query";
import Movies from "../components/Movies";
import { getTopRated } from "../services/TBMDAPI";
import { Movie } from "../types/movies";
import Navigation from "../components/navbar";
import { Alert, Spinner } from "react-bootstrap";
const TopRated: React.FC = () => {
  const {
    data: topRatedMovies,
    isLoading,
    error,
    isError,
  } = useQuery<Movie[], Error>({
    queryKey: ["topRatedMovies"],
    queryFn: getTopRated,
  });

  if (isLoading)
    return (
      <div className="text-center my-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  if (isError) return <Alert variant="danger">{error.message}</Alert>

  return (
    <div>
      <Navigation />
      <h1>Top Rated</h1>
      {topRatedMovies && <Movies movies={topRatedMovies} />}
    </div>
  );
};

export default TopRated;
