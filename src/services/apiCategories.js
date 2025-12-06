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

  createCategory: async (categoryData) => {
    try {
      const response = await axios.post(
        API.newCategory,
        { name: categoryData.name, description: categoryData.description },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.status !== 201) {
        throw new Error("Failed to create category");
      }

      return response.data;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  },

  updateCategory: async (categoryId, categoryData) => {
    try {
      const response = await axios.put(
        API.updateCategory(categoryId),
        { name: categoryData.name, description: categoryData.description },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to update category");
      }

      return response.data;
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  },

  deleteCategory: async (categoryId) => {
    try {
      const response = await axios.delete(API.deleteCategory(categoryId), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to delete category");
      }

      return response.data;
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  },
};

export default categoryServices;
