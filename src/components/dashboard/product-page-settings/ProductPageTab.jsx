import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import useProductPageSettings from "../../../hooks/products/useProductPageSettings";
import useUpdateProductPageSettings from "./useUpdateProductPageSettings";

const ProductPageTab = () => {
  const [productPageSettings, setProductPageSettings] = useState({});

  const { productPageSettings: fetchedSettings, isLoading } =
    useProductPageSettings();
  const { updateProductPageSettings } = useUpdateProductPageSettings();

  useEffect(() => {
    if (fetchedSettings) {
      // Handle array response - take the first item
      const settings = Array.isArray(fetchedSettings)
        ? fetchedSettings[0]
        : fetchedSettings;
      if (settings) {
        setProductPageSettings(settings);
      }
    }
  }, [fetchedSettings]);

  const handleBlurUpdate = () => {
    if (productPageSettings?._id) {
      updateProductPageSettings({
        id: productPageSettings._id,
        data: productPageSettings,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-500">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          إعدادات صفحة عرض المنتج
        </h2>
        <div className="flex items-center gap-4"></div>
      </div>

      {/* Booking Section Settings */}
      <div className="p-6 bg-white border border-gray-200 shadow-lg rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="flex items-center text-xl font-bold text-gray-900">
            <span className="p-2 mr-3 bg-green-100 rounded-lg">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </span>
            قسم الحجز والتواصل
          </h3>
          {/* <button
            onClick={() => {
              setEditingContent({
                key: "bookingSection",
                data: productPageSettings.bookingSection,
              });
              setShowContentModal(true);
            }}
            className="px-4 py-2 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
          >
            تعديل
          </button> */}
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <span className="text-sm font-medium">عرض زر الحجز</span>
              <button
                onClick={() => {
                  const updatedSettings = {
                    ...productPageSettings,
                    displayBookingButton:
                      !productPageSettings.displayBookingButton,
                  };
                  setProductPageSettings(updatedSettings);
                  if (productPageSettings?._id) {
                    updateProductPageSettings({
                      id: productPageSettings._id,
                      data: updatedSettings,
                    });
                  }
                }}
                className={`w-12 h-6 rounded-full ${
                  productPageSettings?.displayBookingButton
                    ? "bg-green-500"
                    : "bg-gray-300"
                } relative transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    productPageSettings?.displayBookingButton
                      ? "translate-x-6"
                      : "translate-x-0.5"
                  }`}
                ></div>
              </button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <span className="text-sm font-medium">عرض زر الواتساب</span>
              <button
                onClick={() => {
                  const updatedSettings = {
                    ...productPageSettings,
                    displayWhatsappButton:
                      !productPageSettings.displayWhatsappButton,
                  };
                  setProductPageSettings(updatedSettings);
                  if (productPageSettings?._id) {
                    updateProductPageSettings({
                      id: productPageSettings._id,
                      data: updatedSettings,
                    });
                  }
                }}
                className={`w-12 h-6 rounded-full ${
                  productPageSettings?.displayWhatsappButton
                    ? "bg-green-500"
                    : "bg-gray-300"
                } relative transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    productPageSettings?.displayWhatsappButton
                      ? "translate-x-6"
                      : "translate-x-0.5"
                  }`}
                ></div>
              </button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <span className="text-sm font-medium">عرض زر الاتصال</span>
              <button
                onClick={() => {
                  const updatedSettings = {
                    ...productPageSettings,
                    displayPhoneButton: !productPageSettings.displayPhoneButton,
                  };
                  setProductPageSettings(updatedSettings);
                  if (productPageSettings?._id) {
                    updateProductPageSettings({
                      id: productPageSettings._id,
                      data: updatedSettings,
                    });
                  }
                }}
                className={`w-12 h-6 rounded-full ${
                  productPageSettings?.displayPhoneButton
                    ? "bg-green-500"
                    : "bg-gray-300"
                } relative transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    productPageSettings?.displayPhoneButton
                      ? "translate-x-6"
                      : "translate-x-0.5"
                  }`}
                ></div>
              </button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <span className="text-sm font-medium">عرض زر إضافة للعربة</span>
              <button
                onClick={() => {
                  const updatedSettings = {
                    ...productPageSettings,
                    displayAddToCartButton:
                      !productPageSettings.displayAddToCartButton,
                  };
                  setProductPageSettings(updatedSettings);
                  if (productPageSettings?._id) {
                    updateProductPageSettings({
                      id: productPageSettings._id,
                      data: updatedSettings,
                    });
                  }
                }}
                className={`w-12 h-6 rounded-full ${
                  productPageSettings?.displayAddToCartButton
                    ? "bg-green-500"
                    : "bg-gray-300"
                } relative transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    productPageSettings?.displayAddToCartButton
                      ? "translate-x-6"
                      : "translate-x-0.5"
                  }`}
                ></div>
              </button>
            </div>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-blue-50">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                العنوان الحالي:
              </label>
              <input
                type="text"
                value={productPageSettings?.address || ""}
                onChange={(e) => {
                  setProductPageSettings({
                    ...productPageSettings,
                    address: e.target.value,
                  });
                }}
                onBlur={handleBlurUpdate}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="احجز الآن أو تواصل معنا"
              />
            </div>
            <div className="p-3 rounded-lg bg-blue-50">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                رقم الواتساب:
              </label>
              <input
                type="text"
                value={productPageSettings?.whatsappNumber || ""}
                onChange={(e) => {
                  setProductPageSettings({
                    ...productPageSettings,
                    whatsappNumber: e.target.value,
                  });
                }}
                onBlur={handleBlurUpdate}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="201234567890"
              />
            </div>
            <div className="p-3 rounded-lg bg-blue-50">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                رقم الهاتف:
              </label>
              <input
                type="text"
                value={productPageSettings?.phoneNumber || ""}
                onChange={(e) => {
                  setProductPageSettings({
                    ...productPageSettings,
                    phoneNumber: e.target.value,
                  });
                }}
                onBlur={handleBlurUpdate}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+201234567890"
              />
            </div>
            <div className="p-3 rounded-lg bg-blue-50">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                وصف القسم:
              </label>
              <textarea
                value={productPageSettings?.sectionDescription || ""}
                onChange={(e) => {
                  setProductPageSettings({
                    ...productPageSettings,
                    sectionDescription: e.target.value,
                  });
                }}
                onBlur={handleBlurUpdate}
                rows="3"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="يمكنك حجز هذا المنتج الآن أو التواصل معنا للاستفسار"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section Settings */}
      {/* <div className="p-6 bg-white border border-gray-200 shadow-lg rounded-xl">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="flex items-center text-xl font-bold text-gray-900">
                        <span className="p-2 mr-3 bg-blue-100 rounded-lg">
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
                        className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                        تعديل
                    </button>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
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
                        <div className="p-3 rounded-lg bg-blue-50">
                            <label className="block mb-2 text-sm font-medium text-gray-700">عنوان القسم:</label>
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
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="المميزات الرئيسية"
                            />
                        </div>
                        <div className="p-3 rounded-lg bg-blue-50">
                            <label className="block mb-2 text-sm font-medium text-gray-700">مميزات إضافية (كل ميزة في سطر منفصل):</label>
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
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="ميزة إضافية 1&#10;ميزة إضافية 2&#10;ميزة إضافية 3"
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                {productPageSettings.featuresSection?.customFeatures?.length || 0} ميزة مخصصة
                            </p>
                        </div>
                    </div>
                </div>
            </div> */}

      {/* Gallery Settings */}
      {/* <div className="p-6 bg-white border border-gray-200 shadow-lg rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="flex items-center text-xl font-bold text-gray-900">
            <span className="p-2 mr-3 bg-purple-100 rounded-lg">
              <svg
                className="w-6 h-6 text-purple-600"
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
            </span>
            معرض الصور
          </h3>
          <button
            onClick={() => {
              setEditingContent({
                key: "gallery",
                data: productPageSettings.gallery,
              });
              setShowContentModal(true);
            }}
            className="px-4 py-2 text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            تعديل
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
            <span className="text-xs font-medium">الصور المصغرة</span>
            <button
              onClick={() =>
                handleToggleProductPageSetting("gallery", "showThumbnails")
              }
              className={`w-10 h-5 rounded-full ${
                productPageSettings.gallery?.showThumbnails
                  ? "bg-purple-500"
                  : "bg-gray-300"
              } relative transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${
                  productPageSettings.gallery?.showThumbnails
                    ? "translate-x-5"
                    : "translate-x-0.5"
                }`}
              ></div>
            </button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
            <span className="text-xs font-medium">أسهم التنقل</span>
            <button
              onClick={() =>
                handleToggleProductPageSetting("gallery", "showNavigation")
              }
              className={`w-10 h-5 rounded-full ${
                productPageSettings.gallery?.showNavigation
                  ? "bg-purple-500"
                  : "bg-gray-300"
              } relative transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${
                  productPageSettings.gallery?.showNavigation
                    ? "translate-x-5"
                    : "translate-x-0.5"
                }`}
              ></div>
            </button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
            <span className="text-xs font-medium">نقاط التنقل</span>
            <button
              onClick={() =>
                handleToggleProductPageSetting("gallery", "showPagination")
              }
              className={`w-10 h-5 rounded-full ${
                productPageSettings.gallery?.showPagination
                  ? "bg-purple-500"
                  : "bg-gray-300"
              } relative transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${
                  productPageSettings.gallery?.showPagination
                    ? "translate-x-5"
                    : "translate-x-0.5"
                }`}
              ></div>
            </button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
            <span className="text-xs font-medium">تكبير الصور</span>
            <button
              onClick={() =>
                handleToggleProductPageSetting("gallery", "allowZoom")
              }
              className={`w-10 h-5 rounded-full ${
                productPageSettings.gallery?.allowZoom
                  ? "bg-purple-500"
                  : "bg-gray-300"
              } relative transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${
                  productPageSettings.gallery?.allowZoom
                    ? "translate-x-5"
                    : "translate-x-0.5"
                }`}
              ></div>
            </button>
          </div>
        </div>
      </div> */}

      {/* Breadcrumb Settings */}
      {/* <div className="p-6 bg-white border border-gray-200 shadow-lg rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="flex items-center text-xl font-bold text-gray-900">
            <span className="p-2 mr-3 bg-orange-100 rounded-lg">
              <svg
                className="w-6 h-6 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            شريط التنقل (Breadcrumb)
          </h3>
          <button
            onClick={() => {
              setEditingContent({
                key: "breadcrumb",
                data: productPageSettings.breadcrumb,
              });
              setShowContentModal(true);
            }}
            className="px-4 py-2 text-white transition-colors bg-orange-600 rounded-lg hover:bg-orange-700"
          >
            تعديل
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
            <span className="text-sm font-medium">عرض شريط التنقل</span>
            <button
              onClick={() =>
                handleToggleProductPageSetting("breadcrumb", "showBreadcrumb")
              }
              className={`w-12 h-6 rounded-full ${
                productPageSettings.breadcrumb?.showBreadcrumb
                  ? "bg-orange-500"
                  : "bg-gray-300"
              } relative transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  productPageSettings.breadcrumb?.showBreadcrumb
                    ? "translate-x-6"
                    : "translate-x-0.5"
                }`}
              ></div>
            </button>
          </div>
          <div className="p-3 rounded-lg bg-orange-50">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              نص الرئيسية:
            </label>
            <input
              type="text"
              value={productPageSettings.breadcrumb?.homeText || ""}
              onChange={(e) => {
                const updatedSettings = {
                  ...productPageSettings,
                  breadcrumb: {
                    ...productPageSettings.breadcrumb,
                    homeText: e.target.value,
                  },
                };
                setProductPageSettings(updatedSettings);
                localStorage.setItem(
                  "productPageSettings",
                  JSON.stringify(updatedSettings)
                );
              }}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="الرئيسية"
            />
          </div>
          <div className="p-3 rounded-lg bg-orange-50">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              نص المنتجات:
            </label>
            <input
              type="text"
              value={productPageSettings.breadcrumb?.productsText || ""}
              onChange={(e) => {
                const updatedSettings = {
                  ...productPageSettings,
                  breadcrumb: {
                    ...productPageSettings.breadcrumb,
                    productsText: e.target.value,
                  },
                };
                setProductPageSettings(updatedSettings);
                localStorage.setItem(
                  "productPageSettings",
                  JSON.stringify(updatedSettings)
                );
              }}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="المنتجات"
            />
          </div>
        </div>
      </div> */}
    </motion.div>
  );
};

export default ProductPageTab;
