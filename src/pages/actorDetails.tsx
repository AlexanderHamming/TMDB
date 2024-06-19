import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fallbackIMGPoster from "../assets/imgs/fallbackPoster.jpg";
import fallbackIMGPeople from "../assets/imgs/fallbackPeople.jpg";
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
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : fallbackIMGPeople
              }
              alt={actor.name}
              fluid
              className="actor-poster"
            />
          </Col>
          <Col md={8}>
            <h1>{actor.name}</h1>

            {actor.biography ? <p>{actor.biography}</p> : ""}

            {actor.birthday ? (
              <p>
                <strong>Birthday:</strong> {actor.birthday}
              </p>
            ) : (
              <p>
                <strong>Birthday:</strong> N/D.
              </p>
            )}
            {actor.place_of_birth ? (
              <p>
                <strong>Birth Place:</strong> {actor.place_of_birth}
              </p>
            ) : (
              <p>
                <strong>Birth Place:</strong> N/D.
              </p>
            )}

            <h2 className="mt-4">Movies</h2>

            <div className="scroll-container">
              {actorMovies &&
                actorMovies.map((movie) => (
                    <Card key={movie.id} className="film-card">
                      <Link to={`/movies/${movie.id}`}>
                        <Card.Img
                          variant="top"
                          src={
                            movie.poster_path
                              ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                              : fallbackIMGPoster
                          }
                          alt={movie.title}
                         
                        />
                      </Link>
                      <Card.Body className="movieNC">
                        <Link to={`/movies/${movie.id}`}>
                          <Card.Title>{movie.title}</Card.Title>
                        </Link>
                        <Card.Text>{movie.character}</Card.Text>
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

export default ActorDetails;
