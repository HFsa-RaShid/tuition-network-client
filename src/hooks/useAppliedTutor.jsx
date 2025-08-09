import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useAppliedTutor = (email) => {
  const axiosPublic = useAxiosPublic();
  const {refetch,data: appliedTutor = null,isLoading,isError,} = useQuery({
    queryKey: ["AppliedTutor"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/appliedTutors/${email}`);
      return res.data;
    },
    enabled: !!email,
  });
  return { appliedTutor, refetch, isLoading, isError };
};

export default useAppliedTutor;