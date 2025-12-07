import { useMutation, useQueryClient } from "@tanstack/react-query";
import productServices from "../../../services/apiProducts";

const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  const {
    mutate: updateProduct,
    isPending,
    isError,
  } = useMutation({
    mutationFn: ({ productId, productData }) =>
      productServices.updateProduct(productId, productData),
    onSuccess: () => {
      // Invalidate and refetch products data after successful update
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { updateProduct, isPending, isError };
};

export default useUpdateProduct;
