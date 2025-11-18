import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useStatsSummary = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data = {}, isLoading, isError, refetch } = useQuery({
    queryKey: ["statsSummary", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats-summary");
      return res.data || {};
    },
  });

  return { summary: data, isLoading, isError, refetch };
};

export default useStatsSummary;

