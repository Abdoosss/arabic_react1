import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../Modal";
import useBooking from "../cart/useBooking";

const Cart = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const { createReservation, isCreating } = useBooking();
  const [bookingForm, setBookingForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    notes: "",
    shippingAddress: "",
  });

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("يجب تسجيل الدخول أولاً للحجز");
      navigate("/login");
      return;
    }

    if (
      !bookingForm.name.trim() ||
      !bookingForm.phone.trim() ||
      !bookingForm.shippingAddress.trim()
    ) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    // Validate Egyptian phone number
    const phoneRegex = /^(01)[0-9]{9}$/;
    if (!phoneRegex.test(bookingForm.phone.replace(/\s+/g, ""))) {
      toast.error("يرجى إدخال رقم هاتف مصري صحيح (مثال: 01234567890)");
      return;
    }

    createReservation(bookingForm, {
      onSuccess: () => {
        toast.success("تم إرسال طلب الحجز بنجاح! سنتواصل معك قريباً");
        setShowBookingModal(false);
        clearCart();
        setIsCartOpen(false);
        setBookingForm({
          name: user.name || "",
          phone: user.phone || "",
          notes: "",
          shippingAddress: "",
        });
      },
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ar-EG").format(price);
  };

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setIsCartOpen(false)}
            />

            {/* Cart panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 flex flex-col w-full h-full max-w-md bg-white shadow-xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">
                  عربة التسوق ({getTotalItems()})
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-400 transition-colors hover:text-gray-600"
                >
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Cart items */}
              <div className="flex-1 p-4 overflow-y-auto">
                {cartItems.length === 0 ? (
                  <div className="py-8 text-center">
                    <div className="mb-4 text-4xl text-gray-300">🛒</div>
                    <p className="text-gray-500">عربة التسوق فارغة</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center gap-5 p-3 space-x-4 space-x-reverse rounded-lg bg-gray-50"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="object-cover w-16 h-16 rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-900">
                            {item.product.name}
                          </h3>
                          <p className="font-semibold text-primary">
                            {item.product.price} جنيه
                          </p>
                          <div className="flex items-center mt-2">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product._id,
                                  item.quantity - 1
                                )
                              }
                              className="flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300"
                            >
                              -
                            </button>
                            <span className="mx-3 font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product._id,
                                  item.quantity + 1
                                )
                              }
                              className="flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product._id)}
                          className="text-red-500 transition-colors hover:text-red-700"
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="p-4 space-y-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">
                      المجموع:
                    </span>
                    <span className="text-lg font-bold text-primary">
                      {formatPrice(getTotalPrice())} جنيه
                    </span>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        if (!user) {
                          toast.error("يجب تسجيل الدخول أولاً للحجز");
                          navigate("/login");
                          return;
                        }
                        setShowBookingModal(true);
                      }}
                      className="w-full btn-primary"
                    >
                      {user ? "إتمام الحجز" : "سجل دخول للحجز"}
                    </button>

                    <button
                      onClick={clearCart}
                      className="w-full btn-secondary"
                    >
                      إفراغ العربة
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <Modal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        title="إتمام الحجز"
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
              العنوان *
            </label>
            <textarea
              value={bookingForm.shippingAddress}
              onChange={(e) =>
                setBookingForm({
                  ...bookingForm,
                  shippingAddress: e.target.value,
                })
              }
              className="h-20 resize-none input-field"
              placeholder="العنوان الكامل للتوصيل..."
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              ملاحظات إضافية
            </label>
            <textarea
              value={bookingForm.notes}
              onChange={(e) =>
                setBookingForm({ ...bookingForm, notes: e.target.value })
              }
              className="h-20 resize-none input-field"
              placeholder="أي تفاصيل إضافية أو استفسارات..."
            />
          </div>

          {/* Order Summary */}
          <div className="p-4 rounded-lg bg-gray-50">
            <h3 className="mb-3 font-medium text-gray-900">ملخص الطلب:</h3>
            <div className="space-y-2 text-sm">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>
                    {formatPrice(parseFloat(item.price) * item.quantity)} جنيه
                  </span>
                </div>
              ))}
              <div className="flex justify-between pt-2 font-semibold border-t">
                <span>المجموع الكلي:</span>
                <span className="text-primary">
                  {formatPrice(getTotalPrice())} جنيه
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              disabled={isCreating}
              type="submit"
              className="flex-1 btn-primary"
            >
              {isCreating ? "جاري الإرسال..." : "تأكيد الحجز"}
            </button>
            <button
              type="button"
              onClick={() => setShowBookingModal(false)}
              className="flex-1 btn-secondary"
            >
              إلغاء
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Cart;
