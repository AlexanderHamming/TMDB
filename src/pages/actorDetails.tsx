import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fallbackIMG from "../assets/imgs/fallbackPoster.jpg";
import { getActorDetails } from "../services/TBMDAPI";
import Navigation from "../components/navbar";
import { actorMovies } from "../types/actorTypes";
import { actorDetails } from "../types/actorTypes";
import { getActorMovies } from "../services/TBMDAPI";
import {
  Alert,
  Spinner,
  Container,
  Row,
  Col,
  Image,
  Card,
} from "react-bootstrap";

const ActorDetails: React.FC = () => {
  const { actorId } = useParams<{ actorId: string }>();

  const {
    data: actor,
    isLoading,
    error,
    isError,
  } = useQuery<actorDetails, Error>({
    queryKey: ["actorDetails", actorId],
    queryFn: () => getActorDetails(Number(actorId)),
  });

  const {
    data: actorMovies,
    isLoading: isMoviesLoading,
    error: moviesError,
  } = useQuery<actorMovies[], Error>({
    queryKey: ["actorMovies", actorId],
    queryFn: () => getActorMovies(Number(actorId)),
  });

  if (isLoading || isMoviesLoading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (isError || moviesError) {
    return <Alert variant="danger">{error?.message} </Alert>;
  }

  if (!actor) {
    return <Alert variant="danger">Movie not</Alert>;
  }

  return (
    <div>
      <Navigation />
      <Container className="mt-4">
        <Row>
          <Col md={4}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
              fluid
            />
          </Col>
          <Col md={8}>
            <h1>{actor.name}</h1>
            <p>{actor.biography}</p>
            <p>
              <strong>Birthday:</strong> {actor.birthday}
            </p>
            <p>
              <strong>Rating:</strong> {actor.place_of_birth}
            </p>
            <h2 className="mt-4">Movies</h2>
            <Row>
              {actorMovies &&
                actorMovies.map((movie) => (
                  <Col key={movie.id} xs={6} md={3} lg={2} className="mb-4">
                    <Link to={`/movies/${movie.id}`}>
                      <Card>
                        <Card.Img
                          variant="top"
                          src={
                            movie.poster_path
                              ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                              : fallbackIMG
                          }
                          alt={movie.title}
                        />
                        <Card.Body>
                          <Card.Title>{movie.title}</Card.Title>
                          <Card.Text>{movie.character}</Card.Text>
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

export default ActorDetails;
