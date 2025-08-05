import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePayment = (tranId) => {
  const axiosPublic = useAxiosPublic();
  const {refetch,data: payments = null,isLoading,isError,} = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/myApplications/payment/success/${tranId}`);
      return res.data;
    },
  });
  return { payments, refetch, isLoading, isError };
};

export default usePayment;