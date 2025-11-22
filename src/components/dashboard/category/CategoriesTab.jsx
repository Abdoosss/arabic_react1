import { motion } from "framer-motion";
import useCategories from "./useCategories";
import useCreateCategory from "./useCreateCategory";
import useEditCategory from "./useEditCategory";
import Modal from "../../Modal";
import { DotsLoader } from "react-loadly";
import { useState } from "react";

const CategoriesTab = () => {
  const { categories, isLoading, isError, refetch } = useCategories();
  const { createCategory, isCreating } = useCreateCategory();
  const { editCategory, isEditing } = useEditCategory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // "create" or "edit"
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const handleAddCategory = () => {
    setModalMode("create");
    setFormData({ name: "", description: "" });
    setEditingCategoryId(null);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setModalMode("edit");
    setFormData({ name: category.name, description: category.description });
    setEditingCategoryId(category._id);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = (category) => {
    // TODO: Implement delete category
    console.log("Delete category:", category._id);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalMode === "create") {
      createCategory(formData, {
        onSuccess: () => {
          setIsModalOpen(false);
          setFormData({ name: "", description: "" });
        },
      });
    } else if (modalMode === "edit") {
      editCategory(
        { categoryId: editingCategoryId, categoryData: formData },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setFormData({ name: "", description: "" });
            setEditingCategoryId(null);
          },
        }
      );
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: "", description: "" });
    setEditingCategoryId(null);
  };

  if (isLoading) {
    return (
      <DotsLoader
        size={20}
        color="#8e7ab5"
        speed={1.4}
        loaderCenter={true}
        count={3}
        borderwidth={4}
        secondaryColor="#8e7ab5"
      />
    );
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
              <div className="flex gap-4 space-x-reverse">
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

      {/* Category Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={modalMode === "create" ? "إضافة فئة جديدة" : "تعديل الفئة"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              اسم الفئة
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              placeholder="أدخل اسم الفئة"
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
              placeholder="أدخل وصف الفئة"
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isCreating || isEditing}
              className="flex-1 px-4 py-2 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
            >
              {isCreating || isEditing
                ? "جاري..."
                : modalMode === "create"
                ? "إنشاء"
                : "تحديث"}
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
    </motion.div>
  );
};

export default CategoriesTab;
