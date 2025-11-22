import axios from "axios";
import { API } from "../utils/api";

const bookingServices = {
  getUserBookings: async () => {
    const response = await axios.get(API.allReservations, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch bookings data");
    }

    return response.data.data;
  },

  updateBookingStatus: async (bookingId, newStatus) => {
    console.log(bookingId, newStatus);

    const response = await axios.put(
      API.updateReservationStatus(bookingId),
      newStatus,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to update booking status");
    }

    return response.data;
  },
};

export default bookingServices;
