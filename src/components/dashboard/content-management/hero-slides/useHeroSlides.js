import { useQuery } from "@tanstack/react-query";
import contentServices from "../../../../services/apiContent";

const useHeroSlides = () => {
  const {
    data: heroSlides,
    isLoading: isHeroSlidesLoading,
    refetch: refetchHeroSlides,
  } = useQuery({
    queryKey: ["heroSlides"],
    queryFn: contentServices.getHeroSlides,
  });

  return {
    heroSlides,
    isHeroSlidesLoading,
    refetchHeroSlides,
  };
};

export default useHeroSlides;
