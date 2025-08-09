import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useAppliedTutorForJobID = (jobId) => {
  const axiosPublic = useAxiosPublic();
  const {refetch,data: appliedTutorForJobId = null,isLoading,isError,} = useQuery({
    queryKey: ["AppliedTutorForJobID", jobId],
    queryFn: async () => {
      const res = await axiosPublic.get(`/appliedTutorForJobId/${jobId}`);
      return res.data;
    },
    enabled: !!jobId, 
  });
  return { appliedTutorForJobId, refetch, isLoading, isError };
};

export default useAppliedTutorForJobID;