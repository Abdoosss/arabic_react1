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
    cacheTime: 30 * 60 * 1000, // 30 minutes
    retry: 1,
  });

  return {
    messages: messages || [],
    isLoading,
    isError,
    refetch,
  };
};

export default useMessages;
