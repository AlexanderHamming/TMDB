import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fallbackIMG from "../assets/imgs/fallbackPeople.jpg";
import fallbackIMGPoster from "../assets/imgs/fallbackPoster.jpg";
import { getMovieDetails } from "../services/TBMDAPI";
import Navigation from "../components/navbar";
import { movieDetails } from "../types/moviesTypes";
import {
  Alert,
  Spinner,
  Container,
  Row,
  Col,
  Image,
  Card,
} from "react-bootstrap";

const MovieDetails: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();

  const {
    data: movie,
    isLoading,
    error,
    isError,
  } = useQuery<movieDetails, Error>({
    queryKey: ["movieDetails", movieId],
    queryFn: () => getMovieDetails(Number(movieId)),
  });

  if (isLoading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (isError) {
    return <Alert variant="danger">{error?.message} </Alert>;
  }

  if (!movie) {
    return <Alert variant="danger">Movie not</Alert>;
  }

  return (
    <div>
      <Navigation />
      <Container className="mt-4">
        <Row>
          <Col md={4}>
            <Image
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : fallbackIMGPoster
              }
              alt={movie.title}
              fluid
            />
          </Col>
          <Col md={8}>
            <h1>{movie.title}</h1>

            {movie.overview ? <p>{movie.overview}</p> : ""}

            {movie.release_date ? (
              <p>
                <strong>Release Date:</strong> {movie.release_date}
              </p>
            ) : (
              <p>
                <strong>Release Date:</strong> N/D.
              </p>
            )}
            {movie.vote_avarage ? (
              <p>
                <strong>Rating:</strong> {movie.vote_average}
              </p>
            ) : (
              <p>
                <strong>Rating:</strong> N/D.
              </p>
            )}
            {movie.runtime ? (
              <p>
                <strong>Runtime:</strong> {movie.runtime} minutes
              </p>
            ) : (
              <p>
                <strong>Runtime:</strong> N/D.
              </p>
            )}
            {movie.tagline ? (
              <p>
                <strong>Tagline:</strong> {movie.tagline}
              </p>
            ) : (
              <p>
                <strong>Tagline:</strong> N/D.
              </p>
            )}
            {movie.budget ? (
              <p>
                <strong>Budget:</strong> ${movie.budget.toLocaleString()}
              </p>
            ) : (
              <p>
                <strong>Budget:</strong> N/D.
              </p>
            )}
            {movie.revenue ? (
              <p>
                <strong>Revenue:</strong> ${movie.revenue.toLocaleString()}
              </p>
            ) : (
              <p>
                <strong>Revenue:</strong> N/D
              </p>
            )}
            {movie.genres && movie.genres.length > 0 ? (
              <p>
                <strong>Genres:</strong>{" "}
                {movie.genres.map((genre) => (
                  <Link key={genre.id} to={`/genres/${genre.id}`}>
                    {genre.name}
                  </Link>
                ))}
              </p>
            ) : (
              <p>
                <strong>Genres:</strong> N/D.
              </p>
            )}
            <h2 className="mt-4">Cast</h2>

            <div className="scroll-container">
              {movie.credits.cast.map((actor) => (
                <Card key={actor.id} className="actor-card">
                  <Link to={`/actors/${actor.id}`}>
                    <Card.Img
                      variant="top"
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                          : fallbackIMG
                      }
                      alt={actor.name}
                    />
                  </Link>
                  <Card.Body className="actorNC">
                    <Link to={`/actors/${actor.id}`}>
                      <Card.Title>{actor.name}</Card.Title>
                    </Link>
                    <Card.Text>{actor.character}</Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MovieDetails;
