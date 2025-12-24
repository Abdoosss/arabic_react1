import axiosInstance from "../utils/axiosInstance";
import { API } from "../utils/api";

const cartServices = {
  getUserCart: () => {
    const response = axiosInstance.get(API.myCart);

    if (response.status !== 200) {
      throw new Error("Failed to fetch cart data");
    }

    return response;
  },
};

export default cartServices;
