import "./assets/app.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import NotFoundPage from "./components/notFoundPage";
import NowPlaying from "./pages/nowPlaying";

function App() {
  return (
    <div id="App">
      <Container className="mt-3">
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/movies/now-playing" element={<NowPlaying />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
