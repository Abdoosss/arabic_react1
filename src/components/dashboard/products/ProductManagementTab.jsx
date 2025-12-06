import { useState, useEffect } from "react";
import useProducts from "../../../hooks/products/useProducts";
import useCreateProduct from "./useCreateProduct";
import useUpdateProduct from "./useUpdateProduct";
import useDeleteProduct from "./useDeleteProduct";

import { motion } from "framer-motion";
import Modal from "../../Modal";
import { OurUploadDropzone } from "../../UploadthingDropzone";

const ProductManagementTab = ({
  handleDeleteProduct,
  setSelectedProductForPreview,
  setShowProductPreviewModal,
}) => {
  const { products, categories } = useProducts();
  const { createProduct, isError, isPending } = useCreateProduct();
  const {
    updateProduct,
    isError: isUpdateError,
    isPending: isUpdatePending,
  } = useUpdateProduct();
  const {
    deleteProduct,
    isError: isDeleteError,
    isPending: isDeletePending,
  } = useDeleteProduct();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    features: "",
    images: [], // Stores uploaded image URLs
  });
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    itemFeatures: "",
    images: [],
    isActive: true,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isEditUploading, setIsEditUploading] = useState(false);

  const handleAddProduct = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: categories.length > 0 ? categories[0]._id : "",
      itemFeatures: "",
      images: [],
    });
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadComplete = (res) => {
    // res is an array of uploaded file info with URLs
    const uploadedUrls = res.map((file) => file.ufsUrl);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...uploadedUrls],
    }));
    setIsUploading(false);
  };

  const handleUploadError = (error) => {
    console.error("Upload error:", error);
    setIsUploading(false);
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create data object for submission (images are already uploaded URLs)
    const submitData = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      category: formData.category,
      itemFeatures: formData.itemFeatures
        ? formData.itemFeatures
            .split(",")
            .map((f) => f.trim())
            .filter((f) => f)
        : [],
      images: formData.images, // Already contains uploaded URLs
    };

    createProduct(submitData, {
      onSuccess: () => {
        setIsModalOpen(false);
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          itemFeatures: "",
          images: [],
        });
      },
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      itemFeatures: "",
      images: [],
    });
  };

  const handleEditProduct = (product) => {
    console.log(product);

    setEditingProduct(product);
    setEditFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category._id || product.category.name,
      itemFeatures: Array.isArray(product.itemFeatures)
        ? product.itemFeatures.join(", ")
        : "",
      images: product.images || [],
      isActive: product.isActive !== undefined ? product.isActive : true,
    });
    setIsEditModalOpen(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditUploadComplete = (res) => {
    const uploadedUrls = res.map((file) => file.ufsUrl);
    setEditFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...uploadedUrls],
    }));
    setIsEditUploading(false);
  };

  const handleEditUploadError = (error) => {
    console.error("Upload error:", error);
    setIsEditUploading(false);
  };

  const handleEditRemoveImage = (indexToRemove) => {
    setEditFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const submitData = {
      name: editFormData.name,
      description: editFormData.description,
      price: editFormData.price,
      category: editFormData.category,
      itemFeatures: editFormData.itemFeatures
        ? editFormData.itemFeatures
            .split(",")
            .map((f) => f.trim())
            .filter((f) => f)
        : [],
      images: editFormData.images,
      isActive: editFormData.isActive,
    };

    updateProduct(
      { productId: editingProduct._id, productData: submitData },
      {
        onSuccess: () => {
          setIsEditModalOpen(false);
          setEditingProduct(null);
          setEditFormData({
            name: "",
            description: "",
            price: "",
            category: "",
            itemFeatures: "",
            images: [],
            isActive: true,
          });
        },
      }
    );
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingProduct(null);
    setEditFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      itemFeatures: "",
      images: [],
      isActive: true,
    });
  };

  const handleDeleteProductClick = (product) => {
    if (
      window.confirm(
        `هل أنت متأكد من حذف المنتج "${product.name}"؟\n\nلن تتمكن من التراجع عن هذا الإجراء.`
      )
    ) {
      deleteProduct(product._id, {
        onSuccess: () => {
          console.log("Product deleted successfully");
        },
        onError: (error) => {
          console.error("Error deleting product:", error);
          alert("حدث خطأ أثناء حذف المنتج. حاول مرة أخرى.");
        },
      });
    }
  };

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
              {/* Active Status Badge */}
              <div className="absolute bottom-3 right-3">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    product.isActive
                      ? "bg-green-500 text-white"
                      : "bg-gray-400 text-white"
                  }`}
                >
                  {product.isActive ? "نشط" : "غير نشط"}
                </span>
              </div>
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
              {product.itemFeatures && product.itemFeatures.length > 0 && (
                <div className="mb-4">
                  <p className="mb-2 text-xs font-medium text-gray-700">
                    المميزات:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {product.itemFeatures.slice(0, 2).map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded"
                      >
                        {feature.length > 15
                          ? feature.substring(0, 15) + "..."
                          : feature}
                      </span>
                    ))}
                    {product.itemFeatures.length > 2 && (
                      <span className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded">
                        +{product.itemFeatures.length - 2} أخرى
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => handleEditProduct(product)}
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
                    onClick={() => handleDeleteProductClick(product)}
                    disabled={isDeletePending}
                    className="flex items-center justify-center px-3 py-2 text-sm text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
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
                    {isDeletePending ? "جاري الحذف..." : "حذف"}
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

      {/* Add Product Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="إضافة منتج جديد"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              اسم المنتج
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              placeholder="أدخل اسم المنتج"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              الوصف
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              placeholder="أدخل وصف المنتج"
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              السعر (جنيه)
            </label>
            <input
              id="price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleFormChange}
              placeholder="أدخل سعر المنتج"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min="0"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              الفئة
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">اختر الفئة</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="features"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              المميزات (مفصولة بفاصلة)
            </label>
            <input
              id="features"
              type="text"
              name="itemFeatures"
              value={formData.itemFeatures}
              onChange={handleFormChange}
              placeholder="ميزة 1، ميزة 2، ميزة 3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              صور المنتج
            </label>
            <OurUploadDropzone
              endpoint="imageUploader"
              onUploadComplete={handleUploadComplete}
              onUploadError={handleUploadError}
              onUploadBegin={() => setIsUploading(true)}
            />
            {/* Preview uploaded images */}
            {formData.images.length > 0 && (
              <div className="mt-3">
                <p className="mb-2 text-sm text-gray-600">
                  {formData.images.length} صورة مرفوعة
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {formData.images.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`صورة ${index + 1}`}
                        className="object-cover w-full h-20 border border-gray-200 rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 -mt-1 -mr-1 text-white transition-opacity bg-red-500 rounded-full opacity-0 group-hover:opacity-100"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {isError && (
            <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
              حدث خطأ أثناء إنشاء المنتج. حاول مرة أخرى.
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isPending || isUploading}
              className="flex-1 px-4 py-2 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
            >
              {isPending
                ? "جاري الإنشاء..."
                : isUploading
                ? "جاري رفع الصور..."
                : "إنشاء المنتج"}
            </button>
            <button
              type="button"
              onClick={handleCloseModal}
              className="flex-1 px-4 py-2 text-gray-700 transition-colors bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              إلغاء
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Product Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        title="تعديل المنتج"
      >
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="edit-name"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              اسم المنتج
            </label>
            <input
              id="edit-name"
              type="text"
              name="name"
              value={editFormData.name}
              onChange={handleEditFormChange}
              placeholder="أدخل اسم المنتج"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="edit-description"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              الوصف
            </label>
            <textarea
              id="edit-description"
              name="description"
              value={editFormData.description}
              onChange={handleEditFormChange}
              placeholder="أدخل وصف المنتج"
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="edit-price"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              السعر (جنيه)
            </label>
            <input
              id="edit-price"
              type="number"
              name="price"
              value={editFormData.price}
              onChange={handleEditFormChange}
              placeholder="أدخل سعر المنتج"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min="0"
            />
          </div>

          <div>
            <label
              htmlFor="edit-category"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              الفئة
            </label>
            <select
              id="edit-category"
              name="category"
              value={editFormData.category}
              onChange={handleEditFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">اختر الفئة</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="edit-features"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              المميزات (مفصولة بفاصلة)
            </label>
            <input
              id="edit-features"
              type="text"
              name="itemFeatures"
              value={editFormData.itemFeatures}
              onChange={handleEditFormChange}
              placeholder="ميزة 1، ميزة 2، ميزة 3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="edit-isActive"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              حالة المنتج
            </label>
            <select
              id="edit-isActive"
              name="isActive"
              value={editFormData.isActive ? "true" : "false"}
              onChange={(e) =>
                setEditFormData((prev) => ({
                  ...prev,
                  isActive: e.target.value === "true",
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="true">نشط - يظهر للعملاء</option>
              <option value="false">غير نشط - لا يظهر للعملاء</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              صور المنتج
            </label>
            <OurUploadDropzone
              endpoint="imageUploader"
              onUploadComplete={handleEditUploadComplete}
              onUploadError={handleEditUploadError}
              onUploadBegin={() => setIsEditUploading(true)}
            />
            {/* Preview uploaded images */}
            {editFormData.images.length > 0 && (
              <div className="mt-3">
                <p className="mb-2 text-sm text-gray-600">
                  {editFormData.images.length} صورة مرفوعة
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {editFormData.images.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`صورة ${index + 1}`}
                        className="object-cover w-full h-20 border border-gray-200 rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleEditRemoveImage(index)}
                        className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 -mt-1 -mr-1 text-white transition-opacity bg-red-500 rounded-full opacity-0 group-hover:opacity-100"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {isUpdateError && (
            <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
              حدث خطأ أثناء تحديث المنتج. حاول مرة أخرى.
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isUpdatePending || isEditUploading}
              className="flex-1 px-4 py-2 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
            >
              {isUpdatePending
                ? "جاري التحديث..."
                : isEditUploading
                ? "جاري رفع الصور..."
                : "تحديث المنتج"}
            </button>
            <button
              type="button"
              onClick={handleCloseEditModal}
              className="flex-1 px-4 py-2 text-gray-700 transition-colors bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              إلغاء
            </button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
};

export default ProductManagementTab;
