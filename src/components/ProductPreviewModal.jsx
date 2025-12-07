import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductPreviewModal = ({ isOpen, product, onClose }) => {
    if (!isOpen || !product) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto modal-enter">
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 rounded-t-xl">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold flex items-center">
                            <svg className="w-8 h-8 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            معاينة المنتج
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-white hover:text-gray-200 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Product Images */}
                        <div className="space-y-4">
                            <div className="bg-gray-100 rounded-lg overflow-hidden">
                                <Swiper
                                    modules={[Navigation, Pagination]}
                                    navigation
                                    pagination={{ clickable: true }}
                                    className="h-80"
                                >
                                    {(product.images || []).map((image, index) => (
                                        <SwiperSlide key={index}>
                                            <img
                                                src={image}
                                                alt={`${product.name} - ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                            
                            {/* Image Count */}
                            <div className="text-center text-sm text-gray-500">
                                {(product.images || []).length} صورة
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            {/* Basic Info */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                                        {product.category}
                                    </span>
                                    {product.featured && (
                                        <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                            مميز
                                        </span>
                                    )}
                                </div>
                                
                                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                    {product.name}
                                </h1>
                                
                                <div className="text-3xl font-bold text-primary mb-6">
                                    {product.price} جنيه
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">الوصف</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {/* Features */}
                            {product.features && product.features.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        المميزات الرئيسية
                                    </h3>
                                    <ul className="space-y-3">
                                        {product.features.map((feature, index) => (
                                            <li key={index} className="flex items-center">
                                                <svg className="w-5 h-5 text-primary ml-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Action Buttons Preview */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                                    أزرار العمل (معاينة فقط)
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <button className="btn-primary w-full opacity-50 cursor-not-allowed">
                                        أضف للعربة
                                    </button>
                                    <button className="btn-secondary w-full opacity-50 cursor-not-allowed">
                                        احجز الآن
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                                    <button className="btn-secondary w-full opacity-50 cursor-not-allowed">
                                        واتساب
                                    </button>
                                    <button className="btn-secondary w-full opacity-50 cursor-not-allowed">
                                        اتصال
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Close Button */}
                    <div className="flex justify-center pt-6 border-t border-gray-200 mt-8">
                        <button
                            onClick={onClose}
                            className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            إغلاق المعاينة
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPreviewModal;