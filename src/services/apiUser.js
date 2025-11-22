import axios from "axios";
import { API } from "../utils/api";

const userServices = {
  fetchAllUsersForAdmin: async () => {
    const response = await axios.get(API.allUsers, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Fetching all users failed");
    }

    return response.data.data;
  },
};

export default userServices;
