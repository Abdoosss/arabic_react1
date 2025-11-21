import React from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const ProductPageTab = ({ 
    products,
    productPageSettings, 
    setProductPageSettings,
    handleToggleProductPageSetting,
    setEditingContent,
    setShowContentModal
}) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
        >
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">إعدادات صفحة عرض المنتج</h2>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => {
                            if (products.length > 0) {
                                window.open(`/products/${products[0].id}`, '_blank');
                            } else {
                                toast.info('لا توجد منتجات للمعاينة');
                            }
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        معاينة التغييرات
                    </button>
                    <div className="text-sm text-gray-500">
                        تحكم في شكل ومحتوى صفحة عرض المنتج
                    </div>
                </div>
            </div>

            {/* Booking Section Settings */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center">
                        <span className="bg-green-100 p-2 rounded-lg mr-3">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </span>
                        قسم الحجز والتواصل
                    </h3>
                    <button
                        onClick={() => {
                            setEditingContent({ key: 'bookingSection', data: productPageSettings.bookingSection });
                            setShowContentModal(true);
                        }}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        تعديل
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium">عرض زر الحجز</span>
                            <button
                                onClick={() => handleToggleProductPageSetting('bookingSection', 'showBookingButton')}
                                className={`w-12 h-6 rounded-full ${productPageSettings.bookingSection?.showBookingButton ? 'bg-green-500' : 'bg-gray-300'} relative transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
                            >
                                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${productPageSettings.bookingSection?.showBookingButton ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                            </button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium">عرض زر الواتساب</span>
                            <button
                                onClick={() => handleToggleProductPageSetting('bookingSection', 'showWhatsAppButton')}
                                className={`w-12 h-6 rounded-full ${productPageSettings.bookingSection?.showWhatsAppButton ? 'bg-green-500' : 'bg-gray-300'} relative transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
                            >
                                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${productPageSettings.bookingSection?.showWhatsAppButton ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                            </button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium">عرض زر الاتصال</span>
                            <button
                                onClick={() => handleToggleProductPageSetting('bookingSection', 'showPhoneButton')}
                                className={`w-12 h-6 rounded-full ${productPageSettings.bookingSection?.showPhoneButton ? 'bg-green-500' : 'bg-gray-300'} relative transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
                            >
                                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${productPageSettings.bookingSection?.showPhoneButton ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                            </button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium">عرض زر إضافة للعربة</span>
                            <button
                                onClick={() => handleToggleProductPageSetting('bookingSection', 'showAddToCartButton')}
                                className={`w-12 h-6 rounded-full ${productPageSettings.bookingSection?.showAddToCartButton ? 'bg-green-500' : 'bg-gray-300'} relative transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
                            >
                                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${productPageSettings.bookingSection?.showAddToCartButton ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                            </button>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <label className="block text-sm font-medium text-gray-700 mb-2">العنوان الحالي:</label>
                            <input
                                type="text"
                                value={productPageSettings.bookingSection?.title || ''}
                                onChange={(e) => {
                                    const updatedSettings = {
                                        ...productPageSettings,
                                        bookingSection: {
                                            ...productPageSettings.bookingSection,
                                            title: e.target.value
                                        }
                                    };
                                    setProductPageSettings(updatedSettings);
                                    localStorage.setItem('productPageSettings', JSON.stringify(updatedSettings));
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="احجز الآن أو تواصل معنا"
                            />
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <label className="block text-sm font-medium text-gray-700 mb-2">رقم الواتساب:</label>
                            <input
                                type="text"
                                value={productPageSettings.bookingSection?.whatsappNumber || ''}
                                onChange={(e) => {
                                    const updatedSettings = {
                                        ...productPageSettings,
                                        bookingSection: {
                                            ...productPageSettings.bookingSection,
                                            whatsappNumber: e.target.value
                                        }
                                    };
                                    setProductPageSettings(updatedSettings);
                                    localStorage.setItem('productPageSettings', JSON.stringify(updatedSettings));
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="201234567890"
                            />
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف:</label>
                            <input
                                type="text"
                                value={productPageSettings.bookingSection?.phoneNumber || ''}
                                onChange={(e) => {
                                    const updatedSettings = {
                                        ...productPageSettings,
                                        bookingSection: {
                                            ...productPageSettings.bookingSection,
                                            phoneNumber: e.target.value
                                        }
                                    };
                                    setProductPageSettings(updatedSettings);
                                    localStorage.setItem('productPageSettings', JSON.stringify(updatedSettings));
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="+201234567890"
                            />
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <label className="block text-sm font-medium text-gray-700 mb-2">وصف القسم:</label>
                            <textarea
                                value={productPageSettings.bookingSection?.description || ''}
                                onChange={(e) => {
                                    const updatedSettings = {
                                        ...productPageSettings,
                                        bookingSection: {
                                            ...productPageSettings.bookingSection,
                                            description: e.target.value
                                        }
                                    };
                                    setProductPageSettings(updatedSettings);
                                    localStorage.setItem('productPageSettings', JSON.stringify(updatedSettings));
                                }}
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                placeholder="يمكنك حجز هذا المنتج الآن أو التواصل معنا للاستفسار"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section Settings */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center">
                        <span className="bg-blue-100 p-2 rounded-lg mr-3">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                        </span>
                        قسم المميزات
                    </h3>
                    <button
                        onClick={() => {
                            setEditingContent({ key: 'featuresSection', data: productPageSettings.featuresSection });
                            setShowContentModal(true);
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        تعديل
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium">عرض قسم المميزات</span>
                            <button
                                onClick={() => handleToggleProductPageSetting('featuresSection', 'showFeatures')}
                                className={`w-12 h-6 rounded-full ${productPageSettings.featuresSection?.showFeatures ? 'bg-blue-500' : 'bg-gray-300'} relative transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                            >
                                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${productPageSettings.featuresSection?.showFeatures ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                            </button>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <label className="block text-sm font-medium text-gray-700 mb-2">عنوان القسم:</label>
                            <input
                                type="text"
                                value={productPageSettings.featuresSection?.title || ''}
                                onChange={(e) => {
                                    const updatedSettings = {
                                        ...productPageSettings,
                                        featuresSection: {
                                            ...productPageSettings.featuresSection,
                                            title: e.target.value
                                        }
                                    };
                                    setProductPageSettings(updatedSettings);
                                    localStorage.setItem('productPageSettings', JSON.stringify(updatedSettings));
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="المميزات الرئيسية"
                            />
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <label className="block text-sm font-medium text-gray-700 mb-2">مميزات إضافية (كل ميزة في سطر منفصل):</label>
                            <textarea
                                value={productPageSettings.featuresSection?.customFeatures?.join('\n') || ''}
                                onChange={(e) => {
                                    const updatedSettings = {
                                        ...productPageSettings,
                                        featuresSection: {
                                            ...productPageSettings.featuresSection,
                                            customFeatures: e.target.value.split('\n').filter(f => f.trim())
                                        }
                                    };
                                    setProductPageSettings(updatedSettings);
                                    localStorage.setItem('productPageSettings', JSON.stringify(updatedSettings));
                                }}
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                placeholder="ميزة إضافية 1&#10;ميزة إضافية 2&#10;ميزة إضافية 3"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                {productPageSettings.featuresSection?.customFeatures?.length || 0} ميزة مخصصة
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gallery Settings */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center">
                        <span className="bg-purple-100 p-2 rounded-lg mr-3">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </span>
                        معرض الصور
                    </h3>
                    <button
                        onClick={() => {
                            setEditingContent({ key: 'gallery', data: productPageSettings.gallery });
                            setShowContentModal(true);
                        }}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        تعديل
                    </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-xs font-medium">الصور المصغرة</span>
                        <button
                            onClick={() => handleToggleProductPageSetting('gallery', 'showThumbnails')}
                            className={`w-10 h-5 rounded-full ${productPageSettings.gallery?.showThumbnails ? 'bg-purple-500' : 'bg-gray-300'} relative transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
                        >
                            <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${productPageSettings.gallery?.showThumbnails ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
                        </button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-xs font-medium">أسهم التنقل</span>
                        <button
                            onClick={() => handleToggleProductPageSetting('gallery', 'showNavigation')}
                            className={`w-10 h-5 rounded-full ${productPageSettings.gallery?.showNavigation ? 'bg-purple-500' : 'bg-gray-300'} relative transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
                        >
                            <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${productPageSettings.gallery?.showNavigation ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
                        </button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-xs font-medium">نقاط التنقل</span>
                        <button
                            onClick={() => handleToggleProductPageSetting('gallery', 'showPagination')}
                            className={`w-10 h-5 rounded-full ${productPageSettings.gallery?.showPagination ? 'bg-purple-500' : 'bg-gray-300'} relative transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
                        >
                            <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${productPageSettings.gallery?.showPagination ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
                        </button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-xs font-medium">تكبير الصور</span>
                        <button
                            onClick={() => handleToggleProductPageSetting('gallery', 'allowZoom')}
                            className={`w-10 h-5 rounded-full ${productPageSettings.gallery?.allowZoom ? 'bg-purple-500' : 'bg-gray-300'} relative transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
                        >
                            <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${productPageSettings.gallery?.allowZoom ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Breadcrumb Settings */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center">
                        <span className="bg-orange-100 p-2 rounded-lg mr-3">
                            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </span>
                        شريط التنقل (Breadcrumb)
                    </h3>
                    <button
                        onClick={() => {
                            setEditingContent({ key: 'breadcrumb', data: productPageSettings.breadcrumb });
                            setShowContentModal(true);
                        }}
                        className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                    >
                        تعديل
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">عرض شريط التنقل</span>
                        <button
                            onClick={() => handleToggleProductPageSetting('breadcrumb', 'showBreadcrumb')}
                            className={`w-12 h-6 rounded-full ${productPageSettings.breadcrumb?.showBreadcrumb ? 'bg-orange-500' : 'bg-gray-300'} relative transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${productPageSettings.breadcrumb?.showBreadcrumb ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                        </button>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-2">نص الرئيسية:</label>
                        <input
                            type="text"
                            value={productPageSettings.breadcrumb?.homeText || ''}
                            onChange={(e) => {
                                const updatedSettings = {
                                    ...productPageSettings,
                                    breadcrumb: {
                                        ...productPageSettings.breadcrumb,
                                        homeText: e.target.value
                                    }
                                };
                                setProductPageSettings(updatedSettings);
                                localStorage.setItem('productPageSettings', JSON.stringify(updatedSettings));
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="الرئيسية"
                        />
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-2">نص المنتجات:</label>
                        <input
                            type="text"
                            value={productPageSettings.breadcrumb?.productsText || ''}
                            onChange={(e) => {
                                const updatedSettings = {
                                    ...productPageSettings,
                                    breadcrumb: {
                                        ...productPageSettings.breadcrumb,
                                        productsText: e.target.value
                                    }
                                };
                                setProductPageSettings(updatedSettings);
                                localStorage.setItem('productPageSettings', JSON.stringify(updatedSettings));
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="المنتجات"
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductPageTab;
