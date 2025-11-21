import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useSiteContent } from "../hooks/useSiteContent";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useAuth();
  const { getTotalItems, setIsCartOpen } = useCart();
  const { siteContent } = useSiteContent();

  const navItems = [
    { name: "الرئيسية", path: "/" },
    { name: "المنتجات", path: "/products" },
    { name: "من نحن", path: "/about" },
    { name: "تواصل معنا", path: "/contact" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 space-x-reverse"
            >
              {siteContent.header?.showLogoImage &&
                siteContent.header?.logoImage && (
                  <>
                    <img
                      src={siteContent.header.logoImage}
                      alt="My Break Logo"
                      className="object-contain w-auto h-12 transition-transform duration-200 rounded-lg hover:scale-105"
                    />
                    {siteContent.header?.showLogoText && (
                      <div className="w-px h-8 bg-primary opacity-30"></div>
                    )}
                  </>
                )}
              {siteContent.header?.showLogoText && (
                <span className="text-2xl font-bold text-primary">
                  {siteContent.header?.logoText || "ماي بريك & غسانكو"}
                </span>
              )}
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="items-center hidden space-x-8 space-x-reverse md:flex">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? "text-primary bg-primary bg-opacity-10"
                    : "text-gray-700 hover:text-primary hover:bg-gray-100"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Cart & Auth Buttons */}
          <div className="items-center hidden space-x-4 space-x-reverse md:flex">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-700 transition-colors hover:text-primary"
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"
                />
              </svg>
              {getTotalItems() > 0 && (
                <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white rounded-full -top-1 -right-1 bg-primary">
                  {getTotalItems()}
                </span>
              )}
            </button>
            {user ? (
              <div className="flex items-center space-x-4 space-x-reverse">
                <span className="ml-4 text-gray-700">
                  مرحباً، {user.username}
                </span>
                {isAdmin && (
                  <Link to="/dashboard" className="ml-2 text-sm btn-secondary">
                    لوحة التحكم
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="ml-2 text-gray-500 transition-colors hover:text-red-500"
                >
                  تسجيل خروج
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <Link to="/register" className="text-sm btn-primary">
                  إنشاء حساب
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? "text-primary bg-primary bg-opacity-10"
                      : "text-gray-700 hover:text-primary hover:bg-gray-100"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {user ? (
                <div className="pt-4 border-t border-gray-200">
                  <div className="px-3 py-2 text-gray-700">
                    مرحباً، {user.username}
                  </div>
                  {isAdmin && (
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 rounded-md text-primary hover:bg-gray-100"
                    >
                      لوحة التحكم
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full px-3 py-2 text-right text-red-500 rounded-md hover:bg-gray-100"
                  >
                    تسجيل خروج
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200">
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-center btn-primary"
                  >
                    إنشاء حساب
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
