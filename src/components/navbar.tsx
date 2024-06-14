import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import { Alert } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { getGenres } from "../services/TBMDAPI";
import { Genre } from "../types/genresTypes";
import { Link, NavLink } from "react-router-dom";

const Navigation = () => {
  const {
    data: genres = [],
    isLoading,
    error,
  } = useQuery<Genre[]>({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <Alert key="danger" variant="danger">
        Error loading genres!
      </Alert>
    );
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          TMBD
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/movies/now-playing">
              Now Playing
            </Nav.Link>
            <Nav.Link as={NavLink} to="/movies/trending">
              Trending
            </Nav.Link>
            <Nav.Link as={NavLink} to="/movies/top-rated">
              Top Rated
            </Nav.Link>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Genres
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {genres.map((genre) => (
                  <Dropdown.Item
                    key={genre.id}
                    as={NavLink}
                    to={`/genres/${genre.id}`}
                  >
                    {genre.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
