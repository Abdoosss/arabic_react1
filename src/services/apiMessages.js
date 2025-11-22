import axios from "axios";
import { API } from "../utils/api";

const messagesServices = {
  getAllMessages: async () => {
    const response = await axios.get(API.allMessages, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch messages data");
    }

    return response.data.data;
  },

  submitMessage: async (messageData) => {
    const response = await axios.post(API.submitMessage, messageData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    if (response.status !== 201) {
      throw new Error("Failed to submit message");
    }

    return response.data.data;
  },
};

export default messagesServices;
