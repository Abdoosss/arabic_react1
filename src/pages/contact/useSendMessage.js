import { useMutation, useQueryClient } from "@tanstack/react-query";
import messagesServices from "../../services/apiMessages";

const useSendMessage = () => {
  const queryClient = useQueryClient();
  const {
    mutate: sendMessage,
    isLoading: isSending,
    isError: isSendError,
  } = useMutation({
    mutationFn: messagesServices.submitMessage,
    onSuccess: () => {
      // Invalidate and refetch messages after sending a new one
      queryClient.invalidateQueries({ queryKey: ["contactMessages"] });
    },
  });

  return {
    sendMessage,
    isSending,
    isSendError,
  };
};

export default useSendMessage;
