import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import {
  validateEmail,
  validatePassword,
  validateEgyptianPhone,
  validateName,
  formatPhoneNumber,
} from "../utils/validation";
import { API } from "../utils/api";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate name
      if (!validateName(formData.name)) {
        toast.error("يرجى إدخال اسم صحيح (حرفين على الأقل)");
        return;
      }

      // Validate email
      if (!validateEmail(formData.email)) {
        toast.error("يرجى إدخال بريد إلكتروني صحيح");
        return;
      }

      // Validate password
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        const firstError = Object.values(passwordValidation.errors).find(
          (error) => error
        );
        toast.error(firstError);
        return;
      }

      // Check password confirmation
      if (formData.password !== formData.confirmPassword) {
        toast.error("كلمة المرور وتأكيد كلمة المرور غير متطابقتين");
        return;
      }

      // Validate phone
      if (!validateEgyptianPhone(formData.phone)) {
        toast.error("يرجى إدخال رقم هاتف مصري صحيح");
        return;
      }

      // Register user via API
      const formattedPhone = formatPhoneNumber(formData.phone);
      const userData = {
        username: formData.name, // Backend expects username field
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formattedPhone,
      };

      const response = await axios.post(API.register, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;

      if (response.status !== 201) {
        // Show detailed error message from API
        const errorMessage =
          data.message || data.error || "حدث خطأ أثناء إنشاء الحساب";
        toast.error(errorMessage);

        // Log all possible error fields
        console.error("=== Error Details ===");
        console.error("Status:", response.status);
        console.error("Message:", data.message);
        console.error("Error:", data.error);
        console.error("Details:", data.details);
        console.error("Full response:", JSON.stringify(data, null, 2));
        return;
      }

      if (data.token) {
        localStorage.setItem("authToken", data.token);
      } else {
        console.warn("No token received from API - user will need to login");
      }

      register(data.user);
      toast.success("تم إنشاء الحساب بنجاح!");

      // If no token, redirect to login instead
      if (!data.token) {
        toast.info("يرجى تسجيل الدخول للمتابعة");
        navigate("/login");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء إنشاء الحساب");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Real-time password validation
    if (name === "password") {
      const validation = validatePassword(value);
      setPasswordErrors(validation.errors);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md space-y-8"
      >
        <div>
          <h2 className="mt-6 text-3xl font-bold text-center text-gray-900">
            إنشاء حساب جديد
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            أو{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:text-primary-dark"
            >
              تسجيل الدخول إلى حسابك
            </Link>
          </p>
        </div>

        <div className="p-8 bg-white rounded-lg shadow-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                الاسم الكامل *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                placeholder="أدخل اسمك الكامل"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                البريد الإلكتروني *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="أدخل بريدك الإلكتروني"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                رقم الهاتف *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                className="input-field"
                placeholder="01xxxxxxxxx"
              />
              <p className="mt-1 text-xs text-gray-500">
                يرجى إدخال رقم هاتف مصري صحيح
              </p>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                كلمة المرور *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="input-field"
                placeholder="أدخل كلمة المرور"
              />

              {/* Password Requirements */}
              <div className="mt-2 space-y-1">
                <div
                  className={`text-xs flex items-center ${
                    !passwordErrors.minLength
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  <svg
                    className="w-3 h-3 ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  8 أحرف على الأقل
                </div>
                <div
                  className={`text-xs flex items-center ${
                    !passwordErrors.hasUppercase
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  <svg
                    className="w-3 h-3 ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  حرف كبير واحد على الأقل
                </div>
                <div
                  className={`text-xs flex items-center ${
                    !passwordErrors.hasNumber
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  <svg
                    className="w-3 h-3 ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  رقم واحد على الأقل
                </div>
                <div
                  className={`text-xs flex items-center ${
                    !passwordErrors.hasSymbol
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  <svg
                    className="w-3 h-3 ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  رمز خاص واحد على الأقل
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                تأكيد كلمة المرور *
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input-field"
                placeholder="أعد إدخال كلمة المرور"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center w-full btn-primary"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                ) : (
                  "إنشاء الحساب"
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="text-center">
          <Link to="/" className="text-sm text-gray-600 hover:text-primary">
            العودة إلى الصفحة الرئيسية
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
