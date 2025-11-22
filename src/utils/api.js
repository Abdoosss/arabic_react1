// export const BASE_URL = "https://my-break-furniture-app.vercel.app";
export const BASE_URL = "http://localhost:3000";

export const API = {
  health: `${BASE_URL}/api/health`,
  register: `${BASE_URL}/api/auth/register`,
  login: `${BASE_URL}/api/auth/login`,
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
  submitMessage: `${BASE_URL}/api/messages/submit`,
  allMessages: `${BASE_URL}/api/messages/all-messages`,
  newProduct: `${BASE_URL}/api/products/new-product`,
  allProducts: `${BASE_URL}/api/products/filter-products`,
  filterProducts: (category) =>
    `${BASE_URL}/api/products/filter-products?category=${category}`,
  productDetails: (productId) =>
    `${BASE_URL}/api/products/get-product/${productId}`,
  newReservation: `${BASE_URL}/api/reservations/new-reservation`,
  allReservations: `${BASE_URL}/api/reservations/all-reservations`,
  updateReservationStatus: (reservationId) =>
    `${BASE_URL}/api/reservations/update-reservation-status/${reservationId}`,
};
