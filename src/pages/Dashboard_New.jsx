import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import HeroSlidesModal from "../components/HeroSlidesModal";
import ContentModal from "../components/ContentModal";
import ProductPreviewModal from "../components/ProductPreviewModal";
import productsData from "../data/products.json";
import { API } from "../utils/api";

// Import Dashboard Components
import {
  DashboardHeader,
  DashboardTabs,
  CategoriesTab,
  UsersTab,
  BookingsTab,
  MessagesTab,
  ProductManagementTab,
  ProductPageTab,
  ContentTab,
} from "../components/dashboard";

const Dashboard = () => {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("product-management");
  const [products, setProducts] = useState(productsData);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState(["My Break", "Ghassanko"]);
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [siteContent, setSiteContent] = useState({});
  const [productPageSettings, setProductPageSettings] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showContentModal, setShowContentModal] = useState(false);
  const [showHeroModal, setShowHeroModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingContent, setEditingContent] = useState(null);
  const [selectedProductForEdit, setSelectedProductForEdit] = useState(null);
  const [showProductEditModal, setShowProductEditModal] = useState(false);
  const [selectedProductForPreview, setSelectedProductForPreview] =
    useState(null);
  const [showProductPreviewModal, setShowProductPreviewModal] = useState(false);

  // ... (نفس الـ useEffect والـ handlers من الملف الأصلي)
  // هنا يتم نسخ كل الـ useEffect والـ handlers من الملف الأصلي
  // لكن بدون تغيير أي لوجيك

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="mb-4 text-6xl text-red-500">🚫</div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            غير مصرح لك بالوصول
          </h1>
          <p className="mb-4 text-gray-600">هذه الصفحة مخصصة للمديرين فقط</p>
          <button onClick={() => navigate("/")} className="btn-primary">
            العودة للصفحة الرئيسية
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header Component */}
        <DashboardHeader logout={logout} />

        {/* Tabs Component */}
        <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="p-6">
          {/* Categories Tab */}
          {activeTab === "categories" && <CategoriesTab />}

          {/* Users Tab */}
          {activeTab === "users" && <UsersTab />}

          {/* Bookings Tab */}
          {activeTab === "bookings" && <BookingsTab />}

          {/* Messages Tab */}
          {activeTab === "messages" && (
            <MessagesTab
              messages={messages}
              handleMarkMessageAsRead={() => {
                /* handler */
              }}
              handleDeleteMessage={() => {
                /* handler */
              }}
            />
          )}

          {/* Product Management Tab */}
          {activeTab === "product-management" && (
            <ProductManagementTab
              products={products}
              categories={categories}
              handleAddProduct={() => {
                /* handler */
              }}
              handleDeleteProduct={() => {
                /* handler */
              }}
              setSelectedProductForEdit={setSelectedProductForEdit}
              setShowProductEditModal={setShowProductEditModal}
              setSelectedProductForPreview={setSelectedProductForPreview}
              setShowProductPreviewModal={setShowProductPreviewModal}
            />
          )}

          {/* Product Page Tab */}
          {activeTab === "product-page" && (
            <ProductPageTab
              products={products}
              productPageSettings={productPageSettings}
              setProductPageSettings={setProductPageSettings}
              handleToggleProductPageSetting={() => {
                /* handler */
              }}
              setEditingContent={setEditingContent}
              setShowContentModal={setShowContentModal}
            />
          )}

          {/* Content Tab */}
          {activeTab === "content" && (
            <ContentTab
              siteContent={siteContent}
              handleEditContent={() => {
                /* handler */
              }}
              setShowHeroModal={setShowHeroModal}
            />
          )}
        </div>
      </div>

      {/* Modals - نفس الـ modals من الملف الأصلي */}
      {/* ... */}
    </div>
  );
};

export default Dashboard;
