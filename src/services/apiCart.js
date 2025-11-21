import axios from "axios";
import { API } from "../utils/api";

const cartServices = {
  getUserCart: () => {
    const response = axios.get(API.getCart, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch cart data");
    }

    return response;
  },
};

export default cartServices;
