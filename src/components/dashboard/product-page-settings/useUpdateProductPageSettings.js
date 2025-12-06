import { useMutation, useQueryClient } from "@tanstack/react-query";
import productServices from "../../../services/apiProducts";
import { toast } from "react-toastify";

const useUpdateProductPageSettings = () => {
  const queryClient = useQueryClient();
  const {
    mutate: updateProductPageSettings,
    isPending,
    isError,
  } = useMutation({
    mutationFn: ({ id, data }) =>
      productServices.updateProductPageSettings(id, data),
    onSuccess: () => {
      toast.success("تم تحديث إعدادات صفحة المنتج بنجاح");
      queryClient.invalidateQueries({ queryKey: ["productPageSettings"] });
    },
    onError: () => {
      toast.error("حدث خطأ أثناء تحديث إعدادات صفحة المنتج");
    },
  });
  return { updateProductPageSettings, isPending, isError };
};

export default useUpdateProductPageSettings;
