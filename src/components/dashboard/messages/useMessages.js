import { useQuery } from "@tanstack/react-query";
import messagesServices from "../../../services/apiMessages";

const useMessages = () => {
  const {
    data: messages,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["contactMessages"],
    queryFn: messagesServices.getAllMessages,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    messages: messages || [],
    isLoading,
    isError,
    refetch,
  };
};

export default useMessages;
