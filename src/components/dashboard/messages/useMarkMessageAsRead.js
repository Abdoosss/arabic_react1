import { useMutation, useQueryClient } from "@tanstack/react-query";

import messagesServices from "../../../services/apiMessages";

import { toast } from "react-toastify";

const useMarkMessageAsRead = () => {
  const queryClient = useQueryClient();
  const {
    mutate: markMessageAsRead,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (messageId) => messagesServices.markMessageAsRead(messageId),
    onSuccess: () => {
      // Optionally, you can add logic here to refetch messages or show a success notification
      queryClient.invalidateQueries({ queryKey: ["contactMessages"] });
      toast.success("تم وضع العلامة كمقروءة بنجاح");
    },
    onError: () => {
      // Optionally, you can add logic here to show an error notification
      toast.error("حدث خطأ أثناء وضع العلامة كمقروءة");
    },
  });

  return {
    markMessageAsRead,
    isPending,
    isError,
  };
};

export default useMarkMessageAsRead;
