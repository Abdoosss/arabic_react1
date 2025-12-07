import { useQuery } from "@tanstack/react-query";
import productServices from "../../services/apiProducts";
import { useSearchParams } from "react-router-dom";

// Hook to fetch categories and products. `category` controls which products are fetched.
const useProducts = (category = "all") => {
  const [searchParams] = useSearchParams();

  // Fetch categories (with fallback handled in service)
  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: productServices.getAllCategories,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const getProducts = async (cat) => {
    // delegate to service; service should handle "all"
    return await productServices.getFilteredProducts(cat || "all");
  };

  const {
    data: products = [],
    refetch: refetchProducts,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useQuery({
    // include the category in the key so React Query refetches when it changes
    queryKey: ["products", category],
    queryFn: () => getProducts(category || searchParams.get("category")),
    keepPreviousData: true,
  });

  return {
    categories,
    products,
    refetchProducts,
    isProductsLoading,
    isProductsError,
    isCategoriesLoading,
    isCategoriesError,
  };
};

export default useProducts;
