import axios from "axios";
import { API } from "../utils/api";
import { create } from "zustand";

const productServices = {
  getAllCategories: async () => {
    try {
      const response = await axios.get(API.allCategories);

      if (response.status !== 200) {
        throw new Error("Failed to fetch categories");
      }

      // Handle different response formats
      const categories =
        response.data.data || response.data.categories || response.data || [];

      return Array.isArray(categories) && categories.length > 0
        ? categories
        : getFallbackCategories();
    } catch (error) {
      console.error("Error fetching categories:", error);
      console.log("Using fallback categories data");
      // Return fallback categories on error
      return getFallbackCategories();
    }
  },

  getFilteredProducts: async (category) => {
    try {
      // If category is "all", fetch all products without filter
      const url =
        category === "all" ? API.allProducts : API.filterProducts(category);

      const response = await axios.get(url);

      if (response.status !== 200) {
        throw new Error("Failed to fetch products");
      }

      // Handle different response formats
      const products =
        response.data.data || response.data.products || response.data || [];

      console.log(
        `Fetched products for category "${category}":`,
        products.length
      ); // Debug log

      return Array.isArray(products) && products.length > 0
        ? products
        : getFallbackProducts(category);
    } catch (error) {
      console.error("Error fetching products:", error);
      console.log("Using fallback products data");
      // Return fallback products on error
      return getFallbackProducts(category);
    }
  },

  getProductById: async (id) => {
    try {
      const response = await axios.get(API.productDetails(id));

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
      console.log(productData);

      const response = await axios.post(
        API.newProduct,
        {
          name: productData.name,
          description: productData.description,
          price: Number(productData.price),
          category: productData.category,
          images: productData.images,
          features: productData.features,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
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
      const response = await axios.put(
        API.updateProduct(productId),
        {
          name: productData.name,
          description: productData.description,
          price: Number(productData.price),
          category: productData.category,
          images: productData.images,
          features: productData.features,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
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
      const response = await axios.delete(API.deleteProduct(productId), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

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
      const response = await axios.get(API.getProductPageSettings);

      if (response.status !== 200) {
        throw new Error("Failed to fetch product page settings");
      }

      return response.data.data;
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
      const response = await axios.put(
        API.updateProductPageSettings(id),
        settingsData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
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
