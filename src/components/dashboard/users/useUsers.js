import { useQuery } from "@tanstack/react-query";
import userServices from "../../../services/apiUser";

const useUsers = () => {
  const {
    data: users,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: userServices.fetchAllUsersForAdmin,
    staleTime: 60 * 1000, // 1 minute
  });

  return {
    users,
    isLoading,
    isError,
    refetch,
  };
};

export default useUsers;
