import { Link } from "react-router-dom";
import { Movie } from "../types/moviesTypes";
import { Container, Row, Col, Card } from "react-bootstrap";

interface MoviesProps {
  movies: Movie[];
}
[];

const Movies: React.FC<MoviesProps> = ({ movies }) => {
  return (
    <Container>
      <Row>
        {movies.map((movie) => (
          <Col key={movie.id} sm={12} md={6} lg={4} xl={3} className="mb-4">
            <Link to={`/movies/${movie.id}`}>
              <Card className="Card-height">
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Movies;
