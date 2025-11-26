import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useDemoRequests = () => {
  const axiosSecure = useAxiosSecure();

  const {
    refetch,
    data: demoRequests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["DemoRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tutorRequests/demo`);
      return res.data?.requests || res.data || [];
    },
    enabled: true,
  });

  return { demoRequests, refetch, isLoading, isError };
};

export default useDemoRequests;
