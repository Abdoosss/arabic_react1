import axios from "axios";
import { API } from "../utils/api";

const categoryServices = {
  getAllCategoriesForAdmin: async () => {
    try {
      const response = await axios.get(API.allCategoriesForAdmin, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to fetch categories");
      }

      // Handle different response formats
      const categories =
        response.data.data || response.data.categories || response.data || [];

      console.log("Fetched categories:", categories); // Debug log

      //   return Array.isArray(categories) && categories.length > 0
      //     ? categories
      //     : getFallbackCategories();

      return categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      console.log("Using fallback categories data");
      // Return fallback categories on error
      //   return getFallbackCategories();
    }
  },
};

export default categoryServices;
