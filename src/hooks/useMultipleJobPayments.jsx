import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMultipleJobPayments = (jobIds) => {
  const axiosPublic = useAxiosPublic();

  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["multipleJobPayments", jobIds],
    queryFn: async () => {
      if (!jobIds || jobIds.length === 0) return [];
      const res = await axiosPublic.post("/payments/multiple", { jobIds });
      return res.data;
    },
    enabled: jobIds && jobIds.length > 0,
  });

  return { paidJobsByJobIds: data, isLoading, isError, refetch };
};

export default useMultipleJobPayments;
