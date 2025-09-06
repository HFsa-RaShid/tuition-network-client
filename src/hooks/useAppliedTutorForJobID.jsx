import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useAppliedTutorForJobID = (jobId) => {
  const axiosPublic = useAxiosPublic();
  const {refetch,data: appliedTutorForJobId = [],isLoading,isError,} = useQuery({
    queryKey: ["AppliedTutorForJobID", jobId],
    queryFn: async () => {
      const res = await axiosPublic.get(`/appliedTutorForJobId/${jobId}`);
      return res.data;
    },
    enabled: !!jobId, 
    // refetchInterval: 5000,
  });
  return { appliedTutorForJobId, refetch, isLoading, isError };
};

export default useAppliedTutorForJobID;