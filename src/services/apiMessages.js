import axiosInstance from "../utils/axiosInstance";
import { API } from "../utils/api";
import { mark } from "framer-motion/client";

const messagesServices = {
  getAllMessages: async () => {
    const response = await axiosInstance.get(API.allMessages);

    if (response.status !== 200) {
      throw new Error("Failed to fetch messages data");
    }

    return response.data.data;
  },

  submitMessage: async (messageData) => {
    const response = await axiosInstance.post(API.submitMessage, messageData);

    if (response.status !== 201) {
      throw new Error("Failed to submit message");
    }

    return response.data.data;
  },

  markMessageAsRead: async (messageId) => {
    const response = await axiosInstance.put(
      API.markMessageAsRead(messageId),
      {}
    );

    if (response.status !== 200) {
      throw new Error("Failed to mark message as read");
    }

    return response.data.data;
  },

  deleteMessage: async (messageId) => {
    const response = await axiosInstance.delete(API.deleteMessage(messageId));

    if (response.status !== 200) {
      throw new Error("Failed to delete message");
    }

    return response.data.data;
  },
};

export default messagesServices;
