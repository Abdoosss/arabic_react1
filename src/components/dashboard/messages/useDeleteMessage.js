import { useMutation, useQueryClient } from "@tanstack/react-query";

import messagesServices from "../../../services/apiMessages";

import { toast } from "react-toastify";

const useDeleteMessage = () => {
  const queryClient = useQueryClient();
  const {
    mutate: deleteMessage,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (messageId) => messagesServices.deleteMessage(messageId),
    onSuccess: () => {
      // Optionally, you can add logic here to refetch messages or show a success notification
      queryClient.invalidateQueries({ queryKey: ["contactMessages"] });
      toast.success("تم حذف الرسالة بنجاح");
    },
    onError: () => {
      // Optionally, you can add logic here to show an error notification
      toast.error("حدث خطأ أثناء حذف الرسالة");
    },
  });

  return {
    deleteMessage,
    isPending,
    isError,
  };
};

export default useDeleteMessage;
