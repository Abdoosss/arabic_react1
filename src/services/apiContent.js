import axios from "axios";
import { API } from "../utils/api";

const contentServices = {
  // Hero Content Services
  getHeroSlides: async () => {
    try {
      const response = await axios.get(API.getHeroSlides);
      if (!response.data || !response.data.data) {
        throw new Error("No hero slides data found");
      }

      return response.data.data;
    } catch (error) {
      console.error("Error fetching hero slides:", error);
      throw error;
    }
  },

  createHeroSlide: async (slideData) => {
    try {
      const response = await axios.post(API.createHeroSlide, slideData);
      return response.data;
    } catch (error) {
      console.error("Error creating hero slide:", error);
      throw error;
    }
  },
  updateHeroSlide: async (slideId, slideData) => {
    try {
      const response = await axios.put(API.updateHeroSlide(slideId), slideData);
      return response.data;
    } catch (error) {
      console.error("Error updating hero slide:", error);
      throw error;
    }
  },
  deleteHeroSlide: async (slideId) => {
    try {
      const response = await axios.delete(API.deleteHeroSlide(slideId));
      return response.data;
    } catch (error) {
      console.error("Error deleting hero slide:", error);
      throw error;
    }
  },
};

export default contentServices;
