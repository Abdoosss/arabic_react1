import useProducts from "../../../hooks/products/useProducts";
import useCreateProduct from "./useCreateProduct";

import { motion } from "framer-motion";

const ProductManagementTab = ({
  handleAddProduct,
  handleDeleteProduct,
  setSelectedProductForEdit,
  setShowProductEditModal,
  setSelectedProductForPreview,
  setShowProductPreviewModal,
}) => {
  const { products, categories } = useProducts();
  const { createProduct, isError, isPending } = useCreateProduct();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">إدارة المنتجات</h2>
        <button
          onClick={handleAddProduct}
          className="flex items-center px-6 py-3 text-white transition-colors rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          إضافة منتج جديد
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-4">
        <div className="p-4 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-100">إجمالي المنتجات</p>
              <p className="text-2xl font-bold">{products.length}</p>
            </div>
            <div className="p-3 bg-blue-400 rounded-lg bg-opacity-30">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="p-4 text-white bg-gradient-to-r from-green-500 to-green-600 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-100">المنتجات المميزة</p>
              <p className="text-2xl font-bold">
                {products.filter((p) => p.featured).length}
              </p>
            </div>
            <div className="p-3 bg-green-400 rounded-lg bg-opacity-30">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="p-4 text-white bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-100">الفئات</p>
              <p className="text-2xl font-bold">{categories.length}</p>
            </div>
            <div className="p-3 bg-purple-400 rounded-lg bg-opacity-30">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="p-4 text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-100">إجمالي الصور</p>
              <p className="text-2xl font-bold">
                {products.reduce(
                  (total, product) => total + (product.images?.length || 0),
                  0
                )}
              </p>
            </div>
            <div className="p-3 bg-orange-400 rounded-lg bg-opacity-30">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="overflow-hidden bg-white border border-gray-200 shadow-lg rounded-xl product-card-hover"
          >
            {/* Product Image */}
            <div className="relative h-48 bg-gray-100">
              <img
                src={
                  product.images?.[0] ||
                  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800"
                }
                alt={product.name}
                className="object-cover w-full h-full"
              />
              <div className="absolute top-3 right-3">
                <span className="px-2 py-1 text-xs font-medium text-white rounded-full bg-primary">
                  {product.category.name}
                </span>
              </div>
              {product.featured && (
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 text-xs font-medium text-white bg-yellow-500 rounded-full">
                    مميز
                  </span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="mb-2 text-lg font-bold text-gray-900">
                {product.name}
              </h3>
              <p className="mb-3 text-sm text-gray-600 line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-primary">
                  {product.price} جنيه
                </span>
                <div className="flex items-center text-sm text-gray-500">
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {product.images?.length || 1} صورة
                </div>
              </div>

              {/* Features Preview */}
              {product.features && product.features.length > 0 && (
                <div className="mb-4">
                  <p className="mb-2 text-xs font-medium text-gray-700">
                    المميزات:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded"
                      >
                        {feature.length > 15
                          ? feature.substring(0, 15) + "..."
                          : feature}
                      </span>
                    ))}
                    {product.features.length > 2 && (
                      <span className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded">
                        +{product.features.length - 2} أخرى
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setSelectedProductForEdit(product);
                    setShowProductEditModal(true);
                  }}
                  className="flex items-center justify-center w-full px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  تعديل تفاصيل المنتج
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setSelectedProductForPreview(product);
                      setShowProductPreviewModal(true);
                    }}
                    className="flex items-center justify-center px-3 py-2 text-sm text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
                  >
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    معاينة
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="flex items-center justify-center px-3 py-2 text-sm text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
                  >
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    حذف
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="py-12 text-center">
          <div className="mb-4 text-6xl">📦</div>
          <h3 className="mb-2 text-xl font-semibold text-gray-900">
            لا توجد منتجات
          </h3>
          <p className="mb-6 text-gray-600">
            ابدأ بإضافة منتجات جديدة لإدارتها من هنا
          </p>
          <button onClick={handleAddProduct} className="btn-primary">
            إضافة منتج جديد
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ProductManagementTab;
