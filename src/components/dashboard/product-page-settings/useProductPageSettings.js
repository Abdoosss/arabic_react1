import { useQuery } from "@tanstack/react-query";
import productServices from "../../../services/apiProducts";

const useProductPageSettings = () => {
  const {
    data: productPageSettings,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["productPageSettings"],
    queryFn: productServices.getProductPageSettings,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return { productPageSettings, isLoading, error, refetch };
};

export default useProductPageSettings;
