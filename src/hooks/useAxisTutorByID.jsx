import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useAxisTutorByID = (email) => {
  const axiosPublic = useAxiosPublic();
  const {refetch,data: tutorProfile = null,isLoading,isError,} = useQuery({
    queryKey: ["TutorProfile"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/tutors/profile/${email}`);
      return res.data;
    },
    enabled: !!email,
  });
  return { tutorProfile, refetch, isLoading, isError };
};

export default useAxisTutorByID;