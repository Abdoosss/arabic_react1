import axios from "axios";
import { API } from "../utils/api";

const reservationServices = {
  getUserReservations: async () => {
    const response = await axios.get(API.allReservations, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch reservations data");
    }

    return response.data.data;
  },

  createReservation: async (reservationData) => {
    const response = await axios.post(API.newReservation, reservationData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    if (response.status !== 201) {
      throw new Error("Failed to create reservation");
    }

    return response.data.data;
  },
};

export default reservationServices;
