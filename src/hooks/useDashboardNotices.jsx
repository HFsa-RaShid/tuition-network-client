import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useDashboardNotices = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: notices = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["dashboardNotices"],
    queryFn: async () => {
      const res = await axiosPublic.get("/notices");
      return res.data || [];
    },
  });

  return { notices, isLoading, isError, refetch };
};

export default useDashboardNotices;

