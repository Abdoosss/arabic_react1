import { useMutation, useQueryClient } from "@tanstack/react-query";
import productServices from "../../../services/apiProducts";

const useCreateProduct = () => {
  const queryClient = useQueryClient();

  const {
    mutate: createProduct,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (productData) => productServices.createProduct(productData),
    onSuccess: () => {
      // Invalidate and refetch products data after successful creation
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { createProduct, isPending, isError };
};

export default useCreateProduct;
