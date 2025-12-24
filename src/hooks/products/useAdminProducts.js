import { useQuery } from "@tanstack/react-query";
import productServices from "../../services/apiProducts";

// Hook to fetch all products and categories for admin
const useAdminProducts = () => {
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

  // Fetch all products for admin
  const {
    data: products = [],
    refetch: refetchProducts,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useQuery({
    queryKey: ["admin-products"],
    queryFn: productServices.getAllProductsForAdmin,
    staleTime: 2 * 60 * 1000, // Cache for 2 minutes
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

export default useAdminProducts;

