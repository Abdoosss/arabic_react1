import { useQuery } from "@tanstack/react-query";
import categoryServices from "../../../services/apiCategories";

const useCategories = () => {
  const {
    data: categories,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: categoryServices.getAllCategoriesForAdmin,
    staleTime: 60 * 1000, // 1 minute
    onError: (error) => {
      console.error("Error fetching categories:", error);
    },
  });

  return {
    categories,
    isLoading,
    isError,
    refetch,
  };
};

export default useCategories;
