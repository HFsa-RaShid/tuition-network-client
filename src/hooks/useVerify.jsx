import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useVerify = () => {
  const axiosSecure = useAxiosSecure();
  const {refetch,data: verification = [],isLoading,isError,} = useQuery({
    queryKey: ["verification"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/verification`);
      return res.data;
    },
    enabled: true, 
  });
  return { verification, refetch, isLoading, isError };
};

export default useVerify;