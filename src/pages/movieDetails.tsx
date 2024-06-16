import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fallbackIMG from "../assets/imgs/fallbackPeople.jpg";
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
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fluid
            />
          </Col>
          <Col md={8}>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p>
              <strong>Rating:</strong> {movie.vote_average}
            </p>
            <p>
              <strong>Runtime:</strong> {movie.runtime} minutes
            </p>
            <p>
              <strong>Tagline:</strong> {movie.tagline}
            </p>
            <p>
              <strong>Budget:</strong> ${movie.budget.toLocaleString()}
            </p>
            <p>
              <strong>Revenue:</strong> ${movie.revenue.toLocaleString()}
            </p>
            <p>
              <strong>Genres:</strong>{" "}
              {movie.genres &&
                movie.genres.map((genre) => genre.name).join(", ")}
            </p>
            <h2 className="mt-4">Cast</h2>
            <Row>
              {movie.credits.cast.map((actor) => (
                <Col key={actor.id} xs={6} md={3} lg={3} className="mb-4">
                  <Link to={`/actors/${actor.id}`}>
                    <Card>
                      <Card.Img
                        variant="top"
                        src= {actor.profile_path 
                            ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                        : fallbackIMG}  
                        alt={actor.name}
                      />
                      <Card.Body>
                        <Card.Title>{actor.name}</Card.Title>
                        <Card.Text>{actor.character}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MovieDetails;
