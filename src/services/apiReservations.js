import axiosInstance from "../utils/axiosInstance";
import { API } from "../utils/api";

const reservationServices = {
  getUserReservations: async () => {
    const response = await axiosInstance.get(API.allReservations);

    if (response.status !== 200) {
      throw new Error("Failed to fetch reservations data");
    }

    return response.data.data;
  },

  createReservation: async (reservationData) => {
    const response = await axiosInstance.post(API.newReservation, reservationData);

    if (response.status !== 201) {
      throw new Error("Failed to create reservation");
    }

    return response.data.data;
  },
};

export default reservationServices;
