import axiosInstance from "../utils/axiosInstance";
import { API } from "../utils/api";
import { create } from "zustand";

const productServices = {
  getAllCategories: async () => {
    try {
      const response = await axiosInstance.get(API.allCategories);

      if (response.status !== 200) {
        throw new Error("Failed to fetch categories");
      }

      // Handle different response formats
      const categories =
        response.data.data || response.data.categories || response.data || [];

      return Array.isArray(categories) ? categories : [];
    } catch (error) {
      console.error("Error fetching categories:", error);
      // Return empty array on error
      return [];
    }
  },

  getAllProductsForAdmin: async () => {
    try {
      const response = await axiosInstance.get(API.allProductsForAdmin);

      if (response.status !== 200) {
        throw new Error("Failed to fetch all products");
      }

      // Handle different response formats
      const products =
        response.data.data || response.data.products || response.data || [];

      return Array.isArray(products) ? products : [];
    } catch (error) {
      console.error("Error fetching all products for admin:", error);
      throw error;
    }
  },

  getFilteredProducts: async (category) => {
    try {
      // If category is "all", fetch all products without filter
      const url =
        category === "all" ? API.allProducts : API.filterProducts(category);

      const response = await axiosInstance.get(url);

      if (response.status !== 200) {
        throw new Error("Failed to fetch products");
      }

      // Handle different response formats
      const products =
        response.data.data || response.data.products || response.data || [];

      return Array.isArray(products) ? products : [];
    } catch (error) {
      console.error("Error fetching products:", error);
      // Return empty array on error for user-facing products
      return [];
    }
  },

  getProductById: async (id) => {
    try {
      const response = await axiosInstance.get(API.productDetails(id));

      if (response.status !== 200) {
        throw new Error("Failed to fetch product details");
      }

      return response.data.data;
    } catch (error) {
      console.error("Error fetching product details:", error);
      throw error; // Re-throw for product details since we need to show error page
    }
  },

  createProduct: async (productData) => {
    try {
      const response = await axiosInstance.post(
        API.newProduct,
        {
          name: productData.name,
          description: productData.description,
          price: Number(productData.price),
          category: productData.category,
          images: productData.images,
          itemFeatures: productData.itemFeatures,
        }
      );

      if (response.status !== 201) {
        throw new Error("Failed to create product");
      }

      return response.data.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  updateProduct: async (productId, productData) => {
    try {
      const response = await axiosInstance.put(
        API.updateProduct(productId),
        {
          name: productData.name,
          description: productData.description,
          price: Number(productData.price),
          category: productData.category,
          images: productData.images,
          itemFeatures: productData.itemFeatures,
          isActive: productData.isActive,
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to update product");
      }

      return response.data.data;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  },

  deleteProduct: async (productId) => {
    try {
      const response = await axiosInstance.delete(API.deleteProduct(productId));

      if (response.status !== 200) {
        throw new Error("Failed to delete product");
      }

      return response.data;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  },

  getProductPageSettings: async () => {
    try {
      const response = await axiosInstance.get(API.getProductPageSettings);

      if (response.status !== 200) {
        throw new Error("Failed to fetch product page settings");
      }

      return response.data.data[0];
    } catch (error) {
      console.error("Error fetching product page settings:", error);
      throw error;
    }
  },

  updateProductPageSettings: async (id, settingsData) => {
    try {
      if (!id) {
        throw new Error("Settings ID is required for update");
      }
      const response = await axiosInstance.put(
        API.updateProductPageSettings(id),
        settingsData
      );

      if (response.status !== 200) {
        throw new Error("Failed to update product page settings");
      }

      return response.data.data;
    } catch (error) {
      console.error("Error updating product page settings:", error);
      throw error;
    }
  },
};

export default productServices;
