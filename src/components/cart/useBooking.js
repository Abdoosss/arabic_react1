import { useMutation, useQueryClient } from "@tanstack/react-query";
import reservationServices from "../../services/apiReservations";

const useBooking = () => {
  const queryClient = useQueryClient();
  const { mutate: createReservation, isPending: isCreating } = useMutation({
    mutationFn: reservationServices.createReservation,
    onSuccess: () => {
      // Invalidate and refetch reservations data after a successful booking
      // queryClient.invalidateQueries({ queryKey: ["reservations"] });
    },
  });

  return {
    createReservation,
    isCreating,
  };
};

export default useBooking;
