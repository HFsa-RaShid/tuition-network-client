
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePaidJobs = (email) => {
  const axiosPublic = useAxiosPublic();
  const {refetch,data: paidJobs = null,isLoading,isError,} = useQuery({
    queryKey: ["paidJobs"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/user/paidJobs/${email}`);
      return res.data;
    },
  });
  return { paidJobs, refetch, isLoading, isError };
};

export default usePaidJobs;