import { useQuery } from "@tanstack/react-query";
import productServices from "../../services/apiProducts";

// Hook to fetch product details by ID
const useProduct = (id) => {
  const {
    data: product = null,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productServices.getProductById(id),
    enabled: !!id, // only run the query if id is provided
  });

  return {
    product,
    isProductLoading,
    isProductError,
  };
};

export default useProduct;
