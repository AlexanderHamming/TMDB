import { useQuery } from "@tanstack/react-query";
import Movies from "../components/Movies";
import { getTrending } from "../services/TBMDAPI";
import { Movie } from "../types/moviesTypes";
import Navigation from "../components/navbar";
import { Alert, Spinner } from "react-bootstrap";
const TrendingMovies: React.FC = () => {
  const {
    data: trendingMovies,
    isLoading,
    error,
    isError,
  } = useQuery<Movie[], Error>({
    queryKey: ["trendingMovies"],
    queryFn: getTrending,
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
      {trendingMovies && <Movies movies={trendingMovies} />}
    </div>
  );
};

export default TrendingMovies;
