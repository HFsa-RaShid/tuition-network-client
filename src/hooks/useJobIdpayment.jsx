// hooks/useJobIdpayment.js
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useJobIdpayment = (jobId) => {
  const axiosPublic = useAxiosPublic();

  const {
    refetch,
    data: paidJobsById = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["paidJobsById", jobId], 
    queryFn: async () => {
      if (!jobId) return [];
      const res = await axiosPublic.get(`/payments/${jobId}`);
      return res.data;
    },
    enabled: !!jobId, 
  });

  return { paidJobsById, refetch, isLoading, isError };
};

export default useJobIdpayment;
