import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllTutors = () => {
  const axiosPublic = useAxiosPublic();
  const {
    refetch,
    data: allTutors = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["AllTutors"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tutors");
      return res.data;
    },
    enabled: true,
  });
  return { allTutors, refetch, isLoading, isError };
};

export default useAllTutors;