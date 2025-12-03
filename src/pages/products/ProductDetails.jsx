import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import { toast } from "react-toastify";
import Modal from "../../components/Modal";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import useProduct from "../../hooks/products/useProduct";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { isProductError, isProductLoading, product } = useProduct(id);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    message: "",
  });
  const [productPageSettings, setProductPageSettings] = useState({});

  useEffect(() => {
    // Deep merge helper
    const deepMerge = (target, source) => {
      const output = { ...target };
      if (
        target &&
        source &&
        typeof target === "object" &&
        typeof source === "object" &&
        !Array.isArray(target) &&
        !Array.isArray(source)
      ) {
        Object.keys(source).forEach((key) => {
          if (
            source[key] &&
            typeof source[key] === "object" &&
            !Array.isArray(source[key])
          ) {
            if (!(key in target)) {
              output[key] = source[key];
            } else {
              output[key] = deepMerge(target[key], source[key]);
            }
          } else {
            output[key] = source[key];
          }
        });
      }
      return output;
    };

    // Load product page settings from localStorage
    const savedSettings = JSON.parse(
      localStorage.getItem("productPageSettings") || "{}"
    );
    const defaultSettings = {
      bookingSection: {
        title: "احجز الآن أو تواصل معنا",
        description: "يمكنك حجز هذا المنتج الآن أو التواصل معنا للاستفسار",
        showBookingButton: true,
        showWhatsAppButton: true,
        showPhoneButton: true,
        showAddToCartButton: true,
        whatsappNumber: "201234567890",
        phoneNumber: "+201234567890",
        bookingFormTitle: "احجز المنتج",
        bookingFormDescription: "املأ البيانات التالية وسنتواصل معك قريباً",
      },
      featuresSection: {
        title: "المميزات الرئيسية",
        showFeatures: true,
        customFeatures: [],
      },
      breadcrumb: {
        showBreadcrumb: true,
        homeText: "الرئيسية",
        productsText: "المنتجات",
      },
      gallery: {
        showThumbnails: true,
        showNavigation: true,
        showPagination: true,
        allowZoom: true,
      },
    };
    setProductPageSettings(deepMerge(defaultSettings, savedSettings));

    // Listen for changes in localStorage
    const handleStorageChange = (e) => {
      if (e.key === "productPageSettings") {
        const newSettings = JSON.parse(e.newValue || "{}");
        setProductPageSettings(deepMerge(defaultSettings, newSettings));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    // Update form with user data when user changes
    if (user) {
      setBookingForm((prev) => ({
        ...prev,
        name: user.name || prev.name,
        phone: user.phone || prev.phone,
      }));
    }
  }, [user]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    // Check if user is logged in
    if (!user) {
      toast.error("يجب تسجيل الدخول أولاً للحجز");
      navigate("/login");
      return;
    }

    // Validate form data
    if (!bookingForm.name.trim()) {
      toast.error("يرجى إدخال الاسم");
      return;
    }

    if (!bookingForm.phone.trim()) {
      toast.error("يرجى إدخال رقم الهاتف");
      return;
    }

    // Validate Egyptian phone number
    const phoneRegex = /^(01)[0-9]{9}$/;
    if (!phoneRegex.test(bookingForm.phone.replace(/\s+/g, ""))) {
      toast.error("يرجى إدخال رقم هاتف مصري صحيح (مثال: 01234567890)");
      return;
    }

    try {
      const reservationData = {
        productId: product.id,
        productName: product.name,
        customerName: bookingForm.name,
        customerEmail: user.email,
        phone: bookingForm.phone,
        message: bookingForm.message,
        userId: user.id,
      };

      const response = await fetch(API.newReservation, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "حدث خطأ أثناء إرسال الحجز");
        return;
      }

      // Save to localStorage as backup
      const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      const newBooking = {
        id: data.reservationId || Date.now(),
        productId: product.id,
        productName: product.name,
        customerName: bookingForm.name,
        customerEmail: user.email,
        phone: bookingForm.phone,
        message: bookingForm.message,
        status: "pending",
        createdAt: new Date().toISOString(),
        userId: user.id,
      };
      bookings.push(newBooking);
      localStorage.setItem("bookings", JSON.stringify(bookings));

      toast.success("تم إرسال طلب الحجز بنجاح! سنتواصل معك قريباً");
      setIsBookingModalOpen(false);
      setBookingForm({
        name: user.name || "",
        phone: user.phone || "",
        message: "",
      });
    } catch (error) {
      toast.error("حدث خطأ أثناء إرسال الحجز");
      console.error("Error submitting reservation:", error);
    }
  };

  const handleWhatsAppContact = () => {
    const message = `مرحباً، أريد الاستفسار عن ${product.name}`;
    const whatsappNumber =
      productPageSettings.bookingSection?.whatsappNumber || "201234567890";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handlePhoneCall = () => {
    const phoneNumber =
      productPageSettings.bookingSection?.phoneNumber || "+201234567890";
    window.location.href = `tel:${phoneNumber}`;
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-b-2 rounded-full animate-spin border-primary"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        {productPageSettings.breadcrumb?.showBreadcrumb && (
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <ol className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500">
              <li>
                <button
                  onClick={() => navigate("/")}
                  className="hover:text-primary"
                >
                  {productPageSettings.breadcrumb?.homeText || "الرئيسية"}
                </button>
              </li>
              <li>/</li>
              <li>
                <button
                  onClick={() => navigate("/products")}
                  className="hover:text-primary"
                >
                  {productPageSettings.breadcrumb?.productsText || "المنتجات"}
                </button>
              </li>
              <li>/</li>
              <li className="text-gray-900">{product.name}</li>
            </ol>
          </motion.nav>
        )}

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Main Image Slider */}
            <div className="overflow-hidden bg-white rounded-lg shadow-lg">
              <Swiper
                modules={[Navigation, Pagination, Thumbs]}
                navigation={productPageSettings.gallery?.showNavigation}
                pagination={
                  productPageSettings.gallery?.showPagination
                    ? { clickable: true }
                    : false
                }
                thumbs={
                  productPageSettings.gallery?.showThumbnails
                    ? { swiper: thumbsSwiper }
                    : false
                }
                className="h-96"
              >
                {product.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Thumbnail Slider */}
            {product.images.length > 1 &&
              productPageSettings.gallery?.showThumbnails && (
                <Swiper
                  modules={[Thumbs]}
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={4}
                  watchSlidesProgress
                  className="h-20"
                >
                  {product.images.map((image, index) => (
                    <SwiperSlide key={index} className="cursor-pointer">
                      <img
                        src={image}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="object-cover w-full h-full rounded-lg"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 text-sm font-medium text-white rounded-full bg-primary">
                  {product.category.name}
                </span>
                {product.featured && (
                  <span className="px-3 py-1 text-sm font-medium text-white bg-yellow-500 rounded-full">
                    مميز
                  </span>
                )}
              </div>

              <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                {product.name}
              </h1>

              <div className="mb-6 text-3xl font-bold text-primary">
                {product.price} جنيه
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="leading-relaxed text-gray-600">
                {product.description}
              </p>
            </div>

            {/* Features */}
            {productPageSettings.featuresSection?.showFeatures && (
              <div>
                <h3 className="mb-4 text-xl font-semibold text-gray-900">
                  {productPageSettings.featuresSection?.title ||
                    "المميزات الرئيسية"}
                </h3>
                <ul className="space-y-3">
                  {product.itemFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg
                        className="flex-shrink-0 w-5 h-5 ml-3 text-primary"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                  {/* Custom Features */}
                  {productPageSettings.featuresSection?.customFeatures?.map(
                    (feature, index) => (
                      <li key={`custom-${index}`} className="flex items-center">
                        <svg
                          className="flex-shrink-0 w-5 h-5 ml-3 text-primary"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            {/* Booking Actions */}
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                {productPageSettings.bookingSection?.title ||
                  "احجز الآن أو تواصل معنا"}
              </h3>

              {productPageSettings.bookingSection?.description && (
                <p className="mb-4 text-gray-600">
                  {productPageSettings.bookingSection.description}
                </p>
              )}

              <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2">
                {productPageSettings.bookingSection?.showAddToCartButton && (
                  <button
                    onClick={() => addToCart(product)}
                    className="flex items-center justify-center w-full gap-2 btn-primary"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"
                      />
                    </svg>
                    أضف للعربة
                  </button>
                )}

                {productPageSettings.bookingSection?.showBookingButton && (
                  <button
                    onClick={() => {
                      if (!user) {
                        toast.error("يجب تسجيل الدخول أولاً للحجز");
                        navigate("/login");
                        return;
                      }
                      setIsBookingModalOpen(true);
                    }}
                    className="w-full btn-secondary"
                  >
                    {user ? "احجز الآن" : "سجل دخول للحجز"}
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {productPageSettings.bookingSection?.showWhatsAppButton && (
                  <button
                    onClick={handleWhatsAppContact}
                    className="flex items-center justify-center w-full btn-secondary"
                  >
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.905 3.488" />
                    </svg>
                    واتساب
                  </button>
                )}

                {productPageSettings.bookingSection?.showPhoneButton && (
                  <button
                    onClick={handlePhoneCall}
                    className="flex items-center justify-center w-full btn-secondary"
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
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    اتصال
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Booking Modal */}
      <Modal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        title={
          productPageSettings.bookingSection?.bookingFormTitle || "احجز المنتج"
        }
      >
        <form onSubmit={handleBookingSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              الاسم *
            </label>
            <input
              type="text"
              value={bookingForm.name}
              onChange={(e) =>
                setBookingForm({ ...bookingForm, name: e.target.value })
              }
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              رقم الهاتف *
            </label>
            <input
              type="tel"
              value={bookingForm.phone}
              onChange={(e) =>
                setBookingForm({ ...bookingForm, phone: e.target.value })
              }
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              رسالة إضافية
            </label>
            <textarea
              value={bookingForm.message}
              onChange={(e) =>
                setBookingForm({ ...bookingForm, message: e.target.value })
              }
              className="h-24 resize-none input-field"
              placeholder="أي تفاصيل إضافية أو استفسارات..."
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button type="submit" className="flex-1 btn-primary">
              إرسال طلب الحجز
            </button>
            <button
              type="button"
              onClick={() => setIsBookingModalOpen(false)}
              className="flex-1 btn-secondary"
            >
              إلغاء
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProductDetails;
