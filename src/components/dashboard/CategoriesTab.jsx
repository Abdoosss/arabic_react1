import React from 'react';
import { motion } from 'framer-motion';

const CategoriesTab = ({ categories, products, handleAddCategory, handleEditCategory, handleDeleteCategory }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">الفئات</h2>
                <button
                    onClick={handleAddCategory}
                    className="btn-primary"
                >
                    إضافة فئة جديدة
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => {
                    const categoryProductsCount = products.filter(p => p.category === category).length;
                    return (
                        <div key={category} className="bg-gray-50 rounded-lg p-6">
                            <h3 className="font-semibold text-gray-900 mb-2 text-lg">{category}</h3>
                            <p className="text-gray-600 text-sm mb-4">
                                {categoryProductsCount} منتج في هذه الفئة
                            </p>
                            <div className="flex space-x-2 space-x-reverse">
                                <button
                                    onClick={() => handleEditCategory(category)}
                                    className="flex-1 bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600 transition-colors"
                                >
                                    تعديل
                                </button>
                                <button
                                    onClick={() => handleDeleteCategory(category)}
                                    className="flex-1 bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600 transition-colors"
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
