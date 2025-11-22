import { useMutation, useQueryClient } from "@tanstack/react-query";
import categoryServices from "../../../services/apiCategories";

const useEditCategory = () => {
  const queryClient = useQueryClient();
  const { mutate: editCategory, isPending: isEditing } = useMutation({
    mutationFn: (params) =>
      categoryServices.updateCategory(params.categoryId, params.categoryData),
    onSuccess: (data, variables, context) => {
      // Invalidate and refetch categories data after a successful edit
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return {
    editCategory,
    isEditing,
  };
};
export default useEditCategory;
