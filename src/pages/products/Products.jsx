import { useState, useMemo } from "react";
import useProducts from "../../hooks/products/useProducts";
import { useSearchParams } from "react-router-dom";

import { motion } from "framer-motion";
import ProductCard from "../../components/ProductCard";
import Loading from "../../components/Loading";

const Products = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [sortBy, setSortBy] = useState("name");

  const {
    categories,
    products,
    isProductsLoading,
    isProductsError,
    refetchProducts,
  } = useProducts(selectedCategory);

  // client-side sorted products (memoized)
  const sortedProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    const copy = [...products];
    switch (sortBy) {
      case "price-low":
        copy.sort((a, b) => parseInt(a.price) - parseInt(b.price));
        break;
      case "price-high":
        copy.sort((a, b) => parseInt(b.price) - parseInt(a.price));
        break;
      case "name":
      default:
        copy.sort((a, b) => (a.name || "").localeCompare(b.name || "", "ar"));
        break;
    }
    return copy;
  }, [products, sortBy]);

  const sortOptions = [
    { value: "name", label: "الاسم" },
    { value: "price-low", label: "السعر: من الأقل للأعلى" },
    { value: "price-high", label: "السعر: من الأعلى للأقل" },
  ];

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            منتجاتنا
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            اكتشف مجموعتنا الكاملة من الأثاث الفاخر والعصري
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="p-6 mb-8 bg-white rounded-lg shadow-md"
        >
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            {/* Category Filter */}
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <label className="font-medium text-gray-700 whitespace-nowrap">
                تصفية حسب الفئة:
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === "all"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  جميع المنتجات
                </button>
                {categories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => setSelectedCategory(category._id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category._id
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-4">
              <label className="font-medium text-gray-700 whitespace-nowrap">
                ترتيب حسب:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field min-w-[200px]"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="pt-4 mt-4 border-t border-gray-200">
            <p className="text-gray-600">
              عرض {sortedProducts.length} منتج
              {selectedCategory !== "all" && (
                <span className="font-medium text-primary">
                  {" "}
                  في فئة{" "}
                  {categories.find((cat) => cat._id === selectedCategory)?.name}
                </span>
              )}
            </p>
          </div>
        </motion.div>

        {/* Products Grid / Loading */}
        {isProductsLoading ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="py-16 text-center"
          >
            <div className="flex items-center justify-center py-8">
              <Loading />
            </div>
          </motion.div>
        ) : sortedProducts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {sortedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="py-16 text-center"
          >
            <div className="mb-4 text-gray-400">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-700">
              لا توجد منتجات
            </h3>
            <p className="mb-6 text-gray-500">
              لم نجد أي منتجات تطابق المعايير المحددة
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSortBy("name");
              }}
              className="btn-primary"
            >
              إعادة تعيين الفلاتر
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Products;
