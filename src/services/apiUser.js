import axiosInstance from "../utils/axiosInstance";
import { API } from "../utils/api";

const userServices = {
  fetchAllUsersForAdmin: async () => {
    const response = await axiosInstance.get(API.allUsers);

    if (response.status !== 200) {
      throw new Error("Fetching all users failed");
    }

    return response.data.data;
  },
};

export default userServices;
