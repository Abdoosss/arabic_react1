import axiosInstance from "../utils/axiosInstance";
import { API } from "../utils/api";

const bookingServices = {
  getUserBookings: async () => {
    const response = await axiosInstance.get(API.allReservations);

    if (response.status !== 200) {
      throw new Error("Failed to fetch bookings data");
    }

    return response.data.data;
  },

  updateBookingStatus: async (bookingId, newStatus) => {
    const response = await axiosInstance.put(
      API.updateReservationStatus(bookingId),
      newStatus
    );

    if (response.status !== 200) {
      throw new Error("Failed to update booking status");
    }

    return response.data;
  },
};

export default bookingServices;
