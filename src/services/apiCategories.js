import axiosInstance from "../utils/axiosInstance";
import { API } from "../utils/api";

const categoryServices = {
  getAllCategoriesForAdmin: async () => {
    try {
      const response = await axiosInstance.get(API.allCategoriesForAdmin);

      if (response.status !== 200) {
        throw new Error("Failed to fetch categories");
      }

      // Handle different response formats
      const categories =
        response.data.data || response.data.categories || response.data || [];

      return categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  },

  createCategory: async (categoryData) => {
    try {
      const response = await axiosInstance.post(
        API.newCategory,
        { name: categoryData.name, description: categoryData.description }
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
      const response = await axiosInstance.put(
        API.updateCategory(categoryId),
        { name: categoryData.name, description: categoryData.description }
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
      const response = await axiosInstance.delete(API.deleteCategory(categoryId));

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
