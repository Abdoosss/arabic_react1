import { motion } from "framer-motion";
import useCategories from "./useCategories";

const CategoriesTab = ({
  // categories,
  products,
  handleAddCategory,
  handleEditCategory,
  handleDeleteCategory,
}) => {
  const { categories, isLoading, isError, refetch } = useCategories();
  console.log(categories);

  if (isLoading) {
    return <div>جارٍ التحميل...</div>;
  }

  if (isError) {
    return (
      <div>
        حدث خطأ أثناء جلب الفئات.{" "}
        <button onClick={refetch} className="text-blue-500 underline">
          حاول مرة أخرى
        </button>
      </div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">الفئات</h2>
        <button onClick={handleAddCategory} className="btn-primary">
          إضافة فئة جديدة
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          return (
            <div key={category._id} className="p-6 rounded-lg bg-gray-50">
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                {category.name}
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                {category.productCount} منتج في هذه الفئة
              </p>
              <div className="flex space-x-2 space-x-reverse">
                <button
                  onClick={() => handleEditCategory(category)}
                  className="flex-1 px-3 py-2 text-sm text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
                >
                  تعديل
                </button>
                <button
                  onClick={() => handleDeleteCategory(category)}
                  className="flex-1 px-3 py-2 text-sm text-white transition-colors bg-red-500 rounded hover:bg-red-600"
                  disabled={categories.length <= 1}
                >
                  حذف
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default CategoriesTab;
