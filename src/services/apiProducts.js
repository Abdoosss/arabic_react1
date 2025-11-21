import axios from "axios";
import { API } from "../utils/api";
import productsData from "../data/products.json";

// Helper function to get fallback products
const getFallbackProducts = (category) => {
  // Convert local products to match API format
  const formattedProducts = productsData.map(product => ({
    _id: product.id.toString(),
    name: product.name,
    category: product.category,
    type: product.type,
    price: product.price,
    description: product.description,
    features: product.features,
    images: product.images,
    featured: product.featured
  }));

  // Filter by category if not "all"
  if (category === "all") {
    return formattedProducts;
  }
  
  return formattedProducts.filter(p => p.category === category);
};

// Helper function to get fallback categories
const getFallbackCategories = () => {
  return [
    { _id: "My Break", name: "My Break" },
    { _id: "Ghassanko", name: "Ghassanko" }
  ];
};

const productServices = {
  getAllCategories: async () => {
    try {
      const response = await axios.get(API.allCategories);

      if (response.status !== 200) {
        throw new Error("Failed to fetch categories");
      }

      // Handle different response formats
      const categories = response.data.data || response.data.categories || response.data || [];
      
      console.log("Fetched categories:", categories); // Debug log
      
      return Array.isArray(categories) && categories.length > 0 ? categories : getFallbackCategories();
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
      const url = category === "all" 
        ? API.allProducts 
        : API.filterProducts(category);
      
      const response = await axios.get(url);

      if (response.status !== 200) {
        throw new Error("Failed to fetch products");
      }

      // Handle different response formats
      const products = response.data.data || response.data.products || response.data || [];
      
      console.log(`Fetched products for category "${category}":`, products.length); // Debug log
      
      return Array.isArray(products) && products.length > 0 ? products : getFallbackProducts(category);
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
};

export default productServices;
