import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCurrentUser = (email) => {
  const axiosPublic = useAxiosPublic();
  const {refetch,data: currentUser = null,isLoading,isError,} = useQuery({
    queryKey: ["CurrentUser"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${email}`);
      return res.data;
    },
  });
  return { currentUser, refetch, isLoading, isError };
};

export default useCurrentUser;
