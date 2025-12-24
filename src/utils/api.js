export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const API = {
  health: `${BASE_URL}/api/health`,
  register: `${BASE_URL}/api/auth/register`,
  login: `${BASE_URL}/api/auth/login`,
  refresh: `${BASE_URL}/api/auth/refresh`,
  allUsers: `${BASE_URL}/api/users/all-users`,
  addToCart: `${BASE_URL}/api/cart/add-item`,
  myCart: `${BASE_URL}/api/cart/my-cart`,
  updateCartItem: `${BASE_URL}/api/cart/update-item`,
  removeCartItem: (productId) =>
    `${BASE_URL}/api/cart/remove-item/${productId}`,
  clearCart: `${BASE_URL}/api/cart/clear-cart`,
  newCategory: `${BASE_URL}/api/categories/new-category`,
  allCategories: `${BASE_URL}/api/categories/all-categories`,
  allCategoriesForAdmin: `${BASE_URL}/api/categories/all-categories-admin`,
  updateCategory: (categoryId) =>
    `${BASE_URL}/api/categories/update-category/${categoryId}`,
  deleteCategory: (categoryId) =>
    `${BASE_URL}/api/categories/delete-category/${categoryId}`,
  submitMessage: `${BASE_URL}/api/messages/submit`,
  allMessages: `${BASE_URL}/api/messages/all-messages`,
  markMessageAsRead: (messageId) =>
    `${BASE_URL}/api/messages/mark-as-read/${messageId}`,
  deleteMessage: (messageId) => `${BASE_URL}/api/messages/delete/${messageId}`,
  newProduct: `${BASE_URL}/api/products/new-product`,
  allProducts: `${BASE_URL}/api/products/filter-products`,
  allProductsForAdmin: `${BASE_URL}/api/products/all-products`,
  filterProducts: (category) =>
    `${BASE_URL}/api/products/filter-products?category=${category}`,
  productDetails: (productId) =>
    `${BASE_URL}/api/products/get-product/${productId}`,
  updateProduct: (productId) =>
    `${BASE_URL}/api/products/update-product/${productId}`,
  deleteProduct: (productId) =>
    `${BASE_URL}/api/products/delete-product/${productId}`,
  newReservation: `${BASE_URL}/api/reservations/new-reservation`,
  allReservations: `${BASE_URL}/api/reservations/all-reservations`,
  updateReservationStatus: (reservationId) =>
    `${BASE_URL}/api/reservations/update-reservation-status/${reservationId}`,

  createHeroSlide: `${BASE_URL}/api/hero-content/new-hero-content`,
  getHeroSlides: `${BASE_URL}/api/hero-content/all-hero-content`,
  updateHeroSlide: (slideId) =>
    `${BASE_URL}/api/hero-content/update-hero-content/${slideId}`,
  deleteHeroSlide: (slideId) =>
    `${BASE_URL}/api/hero-content/delete-hero-content/${slideId}`,
  getProductPageSettings: `${BASE_URL}/api/reservation-contact-settings/all`,
  updateProductPageSettings: (id) =>
    `${BASE_URL}/api/reservation-contact-settings/${id}`,
};
