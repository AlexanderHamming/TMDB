import { useQuery } from "@tanstack/react-query";
import Movies from "../components/Movies";
import { getNowPlaying } from "../services/TBMDAPI";
import { Movie } from "../types/moviesTypes";
import Navigation from "../components/navbar";
import { Alert, Spinner } from "react-bootstrap";
const NowPlaying: React.FC = () => {
  const {
    data: nowPlayingMovies,
    isLoading,
    error,
    isError,
  } = useQuery<Movie[], Error>({
    queryKey: ["nowPlaying"],
    queryFn: getNowPlaying,
  });

  if (isLoading)
    return (
      <div className="text-center my-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  if (isError) return <Alert variant="danger">{error.message}</Alert>;

  return (
    <div>
      <Navigation />
      <h1>Now Playing</h1>
      {nowPlayingMovies && <Movies movies={nowPlayingMovies} />}
    </div>
  );
};

export default NowPlaying;
