import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { validateEmail } from "../utils/validation";
import { API } from "../utils/api";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login, adminLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate email
      if (!validateEmail(formData.email)) {
        toast.error("يرجى إدخال بريد إلكتروني صحيح");
        setIsLoading(false);
        return;
      }

      // Login via API
      const response = await axios.post(API.login, {
        email: formData.email,
        password: formData.password,
      });

      const data = response.data;
      console.log(data);

      if (response.status !== 200) {
        toast.error(
          data.message || "البريد الإلكتروني أو كلمة المرور غير صحيحة"
        );
        return;
      }

      // Save token to localStorage
      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }

      // Check if user is admin based on backend response
      if (data.user && data.user.role === "admin") {
        login(data.user);
        adminLogin();
        toast.success("مرحباً بك في لوحة التحكم");
        navigate("/dashboard");
      } else {
        login(data.user);
        toast.success(`مرحباً بك، ${data.user.usename}`);
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error.status === 401
          ? "البريد الالكتروني او كلمة المرور غير صحيحة"
          : "حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
            تسجيل الدخول
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            أو{" "}
            <Link
              to="/register"
              className="font-medium text-primary hover:text-primary-dark"
            >
              إنشاء حساب جديد
            </Link>
          </p>
        </div>

        <div className="p-8 bg-white rounded-lg shadow-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                البريد الإلكتروني
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
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                كلمة المرور
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="input-field"
                placeholder="أدخل كلمة المرور"
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
                  "تسجيل الدخول"
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

export default Login;
