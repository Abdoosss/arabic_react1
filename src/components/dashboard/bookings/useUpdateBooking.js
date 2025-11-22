import { useMutation, useQueryClient } from "@tanstack/react-query";
import bookingServices from "../../../services/apiBookings";

const useUpdateBooking = () => {
  const queryClient = useQueryClient();
  const { mutate: updateBooking, isPending: isUpdating } = useMutation({
    mutationFn: ({ bookingId, updatedData }) =>
      bookingServices.updateBookingStatus(bookingId, updatedData),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["userBookings"] });
    },
  });

  return { updateBooking, isUpdating };
};

export default useUpdateBooking;
