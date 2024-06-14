import { getGenres } from "../services/TBMDAPI";
import { useQuery } from "@tanstack/react-query";
import { Genre } from "../types/genresTypes";

export const useGenres = () => {
  return useQuery<Genre[]>({
    queryKey: ["genres"],
    queryFn: getGenres,
    staleTime: Infinity,
  });
};
