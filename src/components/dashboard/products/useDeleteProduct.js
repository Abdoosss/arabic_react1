import { useMutation, useQueryClient } from "@tanstack/react-query";
import productServices from "../../../services/apiProducts";

const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteProduct,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (productId) => productServices.deleteProduct(productId),
    onSuccess: () => {
      // Invalidate and refetch products data after successful deletion
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { deleteProduct, isPending, isError };
};

export default useDeleteProduct;
