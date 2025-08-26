
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

//for tutor 
const useAllHiredByAStudent = (email) => {
  const axiosPublic = useAxiosPublic();
  const {refetch,data: paidJobs = [],isLoading,isError,} = useQuery({
    queryKey: ["paidJobs",email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/student/paidJobs/${email}`);
      return res.data;
    },
    enabled: !!email, 
  });
  return { paidJobs, refetch, isLoading, isError };
};

export default useAllHiredByAStudent;