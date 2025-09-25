import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllPayment = () => {
  const axiosSecure = useAxiosSecure();
  const {refetch,data: allPayment = [],isLoading,isError,} = useQuery({
    queryKey: ["AllPayment"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/paymentBkash`);
      return res.data;
    },
    enabled: true, 
  });
  return { allPayment, refetch, isLoading, isError };
};

export default useAllPayment;