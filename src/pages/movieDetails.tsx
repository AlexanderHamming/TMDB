import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieDeta} from "../services/TBMDAPI";
import { Movie } from "../types/moviesTypes";
import { Alert, Spinner } from "react-bootstrap";
import Movies from "../components/Movies";
import Navigation from "../components/navbar";
import { useGenres } from "../hooks/useGenres";