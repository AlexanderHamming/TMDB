export interface actorDetails {
  id: number;
  name: string;
  biography: string;
  profile_path: string;
  birthday: string;
  place_of_birth: string;
}

export interface actorMovies {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  character: string;
}

export interface ActorMoviesResponse {
    cast: actorMovies[]
}
