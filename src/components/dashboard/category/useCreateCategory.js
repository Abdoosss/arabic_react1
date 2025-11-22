import { useMutation, useQueryClient } from "@tanstack/react-query";
import categoryServices from "../../../services/apiCategories";

const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const { mutate: createCategory, isPending: isCreating } = useMutation({
    mutationFn: categoryServices.createCategory,
    onSuccess: (data, variables, context) => {
      // Invalidate and refetch categories data after a successful creation
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return {
    createCategory,
    isCreating,
  };
};

export default useCreateCategory;
