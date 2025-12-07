import { useMutation, useQueryClient } from "@tanstack/react-query";
import categoryServices from "../../../services/apiCategories";
import { toast } from "react-toastify";

const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteCategory, isPending: isDeleting } = useMutation({
    mutationFn: (categoryId) => categoryServices.deleteCategory(categoryId),
    onSuccess: () => {
      toast.success("تم حذف الفئة بنجاح");
      queryClient.invalidateQueries(["categories"]);
    },
    onError: (error) => {
      toast.error(error.message || "فشل حذف الفئة");
    },
  });

  return { deleteCategory, isDeleting };
};

export default useDeleteCategory;
