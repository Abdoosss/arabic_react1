import { useQuery } from "@tanstack/react-query";
import bookingServices from "../../../services/apiBookings";

const useBookings = () => {
  const {
    data: bookings,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["userBookings"],
    queryFn: bookingServices.getUserBookings,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    bookings: bookings || [],
    isLoading,
    isError,
    refetch,
  };
};

export default useBookings;
