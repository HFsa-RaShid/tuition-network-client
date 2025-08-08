import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllJobs = () => {
  const axiosPublic = useAxiosPublic();
  const {refetch,data: allJobs = null,isLoading,isError,} = useQuery({
    queryKey: ["AllJobs"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/tutorRequests`);
      return res.data;
    },
    enabled: true, 
  });
  return { allJobs, refetch, isLoading, isError };
};

export default useAllJobs;