import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import HeroSlidesModal from "../components/HeroSlidesModal";
import ContentModal from "../components/ContentModal";
import DraggableImageList from "../components/DraggableImageList";
import DraggableFeatureList from "../components/DraggableFeatureList";
import ProductPreviewModal from "../components/ProductPreviewModal";
import productsData from "../data/products.json";
import { API } from "../utils/api";

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

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
      return;
    }

    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await fetch(API.allProducts);
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products || productsData);
        } else {
          // Fallback to local data
          setProducts(productsData);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        // Fallback to local data
        setProducts(productsData);
      }
    };

    fetchProducts();

    // Load users from localStorage
    const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(savedUsers);

    // Fetch categories from API
    const fetchCategories = async () => {
      try {
        const response = await fetch(API.allCategories);
        if (response.ok) {
          const data = await response.json();
          setCategories(data.categories || ["My Break", "Ghassanko"]);
        } else {
          // Fallback to localStorage
          const savedCategories = JSON.parse(
            localStorage.getItem("categories") || '["My Break", "Ghassanko"]'
          );
          setCategories(savedCategories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Fallback to localStorage
        const savedCategories = JSON.parse(
          localStorage.getItem("categories") || '["My Break", "Ghassanko"]'
        );
        setCategories(savedCategories);
      }
    };

    fetchCategories();

    // Fetch reservations from API
    const fetchReservations = async () => {
      try {
        const response = await fetch(API.allReservations);
        if (response.ok) {
          const data = await response.json();
          setBookings(data.reservations || []);
        } else {
          // Fallback to localStorage
          const savedBookings = JSON.parse(
            localStorage.getItem("bookings") || "[]"
          );
          setBookings(savedBookings);
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
        // Fallback to localStorage
        const savedBookings = JSON.parse(
          localStorage.getItem("bookings") || "[]"
        );
        setBookings(savedBookings);
      }
    };

    fetchReservations();

    // Fetch messages from API
    const fetchMessages = async () => {
      try {
        const response = await fetch(API.allMessages);
        if (response.ok) {
          const data = await response.json();
          setMessages(data.messages || []);
        } else {
          // Fallback to localStorage
          const savedMessages = JSON.parse(
            localStorage.getItem("contactMessages") || "[]"
          );
          setMessages(savedMessages);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        // Fallback to localStorage
        const savedMessages = JSON.parse(
          localStorage.getItem("contactMessages") || "[]"
        );
        setMessages(savedMessages);
      }
    };

    fetchMessages();

    // Load site content from localStorage
    const savedContent = JSON.parse(
      localStorage.getItem("siteContent") || "{}"
    );

    const defaultContent = {
      hero: {
        slides: [
          {
            id: 1,
            title: "مرحباً بكم في عالم ماي بريك",
            subtitle: "اكتشف أجمل مجموعة من الكنب والكراسي الفاخرة",
            buttonText: "تسوق الآن",
            backgroundImage:
              "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop",
          },
          {
            id: 2,
            title: "راحة لا مثيل لها",
            subtitle: "كراسي لايزي بوي بأحدث التقنيات والتصاميم العصرية",
            buttonText: "اكتشف المزيد",
            backgroundImage:
              "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=600&fit=crop",
          },
          {
            id: 3,
            title: "غسانكو للأثاث الكلاسيكي",
            subtitle: "قطع أثاث أنيقة تضفي لمسة من الفخامة على منزلك",
            buttonText: "استكشف المجموعة",
            backgroundImage:
              "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&h=600&fit=crop",
          },
        ],
      },
      myBreak: {
        title: "مجموعة ماي بريك",
        subtitle: "الراحة والاسترخاء",
        description:
          "تجربة استثنائية في عالم الراحة والاسترخاء. كنبنا وكراسي اللايزي بوي مصممة بأحدث التقنيات لتوفر لك أقصى درجات الراحة والفخامة في منزلك.",
        buttonText: "استكشف مجموعة ماي بريك",
        image:
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop",
      },
      ghassanko: {
        title: "مجموعة غسانكو",
        subtitle: "الأناقة الكلاسيكية",
        description:
          "الأناقة الكلاسيكية تلتقي بالحرفية العالية. مجموعة غسانكو تقدم قطع أثاث كلاسيكية مصنوعة من أجود أنواع الخشب الطبيعي لتضفي لمسة من الفخامة على منزلك.",
        buttonText: "استكشف مجموعة غسانكو",
        image:
          "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=400&fit=crop",
      },
      about: {
        header: {
          title: "من نحن",
          subtitle: "نحن شركة رائدة في مجال الأثاث المنزلي الفاخر",
          description:
            "نجمع بين الحرفية التقليدية والتصاميم العصرية لنقدم لك أجود قطع الأثاث التي تناسب ذوقك وتلبي احتياجاتك",
        },
        story: {
          title: "قصتنا",
          content:
            "بدأت رحلتنا منذ أكثر من 20 عاماً بحلم بسيط: تقديم أثاث عالي الجودة يجمع بين الراحة والأناقة والمتانة. من ورشة صغيرة إلى شركة رائدة في السوق المصري.",
          image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
        },
        myBreakSection: {
          title: "مجموعة ماي بريك",
          subtitle: "الراحة والاسترخاء",
          description:
            'مجموعة "ماي بريك" هي تجسيد لمفهوم الراحة الحقيقية. كنبنا وكراسي اللايزي بوي مصممة بأحدث التقنيات لتوفر لك تجربة استرخاء لا مثيل لها.',
          features: [
            "جلد طبيعي فاخر 100%",
            "تقنيات مساج متطورة",
            "ضمان 5 سنوات",
          ],
          image:
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop",
        },
        ghassankoSection: {
          title: "مجموعة غسانكو",
          subtitle: "الأناقة الكلاسيكية",
          description:
            'مجموعة "غسانكو" تجسد الأناقة الكلاسيكية والحرفية التقليدية. قطع أثاث مصنوعة من أجود أنواع الخشب الطبيعي بتصاميم خالدة تضفي لمسة من الفخامة على منزلك.',
          features: [
            "خشب طبيعي عالي الجودة",
            "حرفية يدوية متقنة",
            "تصاميم كلاسيكية خالدة",
          ],
          image:
            "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=400&fit=crop",
        },
        values: {
          title: "قيمنا ومبادئنا",
          subtitle: "نؤمن بمجموعة من القيم التي توجه عملنا وتضمن رضا عملائنا",
          items: {
            quality: {
              title: "الجودة",
              description:
                "نحرص على استخدام أجود المواد والعمل مع أمهر الحرفيين لضمان أعلى معايير الجودة",
            },
            comfort: {
              title: "الراحة",
              description:
                "راحة عملائنا هي أولويتنا، نصمم كل قطعة لتوفر أقصى درجات الراحة والاسترخاء",
            },
            innovation: {
              title: "الابتكار",
              description:
                "نواكب أحدث التقنيات والتصاميم لنقدم منتجات مبتكرة تلبي احتياجات العصر",
            },
          },
        },
        cta: {
          title: "جاهز لتجربة الفرق؟",
          description:
            "زر معرضنا اليوم واكتشف مجموعتنا الكاملة من الأثاث الفاخر",
          buttonText: "تواصل معنا",
          secondaryButtonText: "تصفح المنتجات",
        },
      },
      contact: {
        title: "تواصل معنا",
        subtitle: "نحن هنا لمساعدتك",
        description:
          "تواصل معنا للحصول على استشارة مجانية أو لأي استفسارات حول منتجاتنا",
        phone: "+20 123 456 7890",
        email: "info@mybreak-ghassanko.com",
        address: "القاهرة، مصر",
        workingHours: "السبت - الخميس: 9:00 ص - 9:00 م",
        mapUrl:
          "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4189.440832738498!2d31.796640284851843!3d31.420960581402568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzHCsDI1JzE1LjUiTiAzMcKwNDcnNDAuMCJF!5e1!3m2!1sar!2seg!4v1761516415312!5m2!1sar!2seg",
        formTitle: "أرسل لنا رسالة",
        formDescription: "املأ النموذج أدناه وسنتواصل معك في أقرب وقت ممكن",
      },
      footer: {
        description:
          "نحن نقدم أجود أنواع الأثاث المنزلي بتصاميم عصرية وكلاسيكية تناسب جميع الأذواق. من كنب ماي بريك الفاخرة إلى مجموعة غسانكو الكلاسيكية، نضمن لك الجودة والراحة.",
        phone: "+20 123 456 7890",
        email: "info@mybreak-ghassanko.com",
        address: "القاهرة، مصر",
        facebookUrl: "https://facebook.com",
        instagramUrl: "https://instagram.com",
        whatsappUrl: "https://whatsapp.com",
      },
      header: {
        logoText: "ماي بريك & غسانكو",
        logoImage: "",
        showLogoText: true,
        showLogoImage: false,
      },
    };

    // Deep merge function to properly merge nested objects
    const deepMerge = (target, source) => {
      const output = { ...target };
      if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach((key) => {
          if (isObject(source[key])) {
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

    const isObject = (item) => {
      return item && typeof item === "object" && !Array.isArray(item);
    };

    setSiteContent(deepMerge(defaultContent, savedContent));

    // Load product page settings from localStorage
    const savedProductPageSettings = JSON.parse(
      localStorage.getItem("productPageSettings") || "{}"
    );
    const defaultProductPageSettings = {
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
    setProductPageSettings({
      ...defaultProductPageSettings,
      ...savedProductPageSettings,
    });
  }, [isAdmin, navigate]);

  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter((p) => p.id !== productId);
    setProducts(updatedProducts);
    toast.success("تم حذف المنتج بنجاح");
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleSaveProduct = async (productData) => {
    if (editingProduct) {
      // Edit existing product
      const updatedProducts = products.map((p) =>
        p.id === editingProduct.id
          ? { ...productData, id: editingProduct.id }
          : p
      );
      setProducts(updatedProducts);
      toast.success("تم تحديث المنتج بنجاح");
    } else {
      // Add new product via API
      try {
        const token = localStorage.getItem("authToken");
        const headers = {
          "Content-Type": "application/json",
        };

        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(API.newProduct, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(productData),
        });

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.message || "حدث خطأ أثناء إضافة المنتج");
          console.error("API Error:", data);
          return;
        }

        const newProduct = {
          ...productData,
          id: data.productId || Date.now(),
          images: productData.images || [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
          ],
        };
        setProducts([...products, newProduct]);
        toast.success("تم إضافة المنتج بنجاح");
      } catch (error) {
        toast.error("حدث خطأ أثناء إضافة المنتج");
        console.error("Error adding product:", error);
        return;
      }
    }
    setShowModal(false);
    setEditingProduct(null);
  };

  // Category management functions
  const handleAddCategory = () => {
    setEditingCategory(null);
    setShowCategoryModal(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowCategoryModal(true);
  };

  const handleDeleteCategory = (categoryToDelete) => {
    if (categories.length <= 1) {
      toast.error("يجب أن تحتوي على فئة واحدة على الأقل");
      return;
    }

    // Check if any products use this category
    const productsUsingCategory = products.filter(
      (p) => p.category === categoryToDelete
    );
    if (productsUsingCategory.length > 0) {
      toast.error(
        `لا يمكن حذف هذه الفئة لأنها تحتوي على ${productsUsingCategory.length} منتج`
      );
      return;
    }

    const updatedCategories = categories.filter((c) => c !== categoryToDelete);
    setCategories(updatedCategories);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
    toast.success("تم حذف الفئة بنجاح");
  };

  const handleSaveCategory = async (categoryName) => {
    if (!categoryName.trim()) {
      toast.error("يرجى إدخال اسم الفئة");
      return;
    }

    if (editingCategory) {
      // Edit existing category
      if (
        categories.includes(categoryName) &&
        categoryName !== editingCategory
      ) {
        toast.error("هذه الفئة موجودة بالفعل");
        return;
      }

      const updatedCategories = categories.map((c) =>
        c === editingCategory ? categoryName : c
      );
      setCategories(updatedCategories);

      // Update products that use this category
      const updatedProducts = products.map((p) =>
        p.category === editingCategory ? { ...p, category: categoryName } : p
      );
      setProducts(updatedProducts);

      localStorage.setItem("categories", JSON.stringify(updatedCategories));
      toast.success("تم تحديث الفئة بنجاح");
    } else {
      // Add new category via API
      if (categories.includes(categoryName)) {
        toast.error("هذه الفئة موجودة بالفعل");
        return;
      }

      try {
        const token = localStorage.getItem("authToken");
        const headers = {
          "Content-Type": "application/json",
        };

        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(API.newCategory, {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            name: categoryName,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.message || "حدث خطأ أثناء إضافة الفئة");
          console.error("API Error:", data);
          return;
        }

        const updatedCategories = [...categories, categoryName];
        setCategories(updatedCategories);
        localStorage.setItem("categories", JSON.stringify(updatedCategories));
        toast.success("تم إضافة الفئة بنجاح");
      } catch (error) {
        toast.error("حدث خطأ أثناء إضافة الفئة");
        console.error("Error adding category:", error);
        return;
      }
    }

    setShowCategoryModal(false);
    setEditingCategory(null);
  };

  // Booking management functions
  const handleDeleteBooking = (bookingId) => {
    const updatedBookings = bookings.filter((b) => b.id !== bookingId);
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    toast.success("تم حذف الحجز بنجاح");
  };

  const handleUpdateBookingStatus = async (bookingId, newStatus) => {
    try {
      const token = localStorage.getItem("authToken");
      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(API.updateReservationStatus(bookingId), {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "حدث خطأ أثناء تحديث حالة الحجز");
        console.error("API Error:", data);
        return;
      }

      const updatedBookings = bookings.map((b) =>
        b.id === bookingId
          ? { ...b, status: newStatus, updatedAt: new Date().toISOString() }
          : b
      );
      setBookings(updatedBookings);
      localStorage.setItem("bookings", JSON.stringify(updatedBookings));
      toast.success("تم تحديث حالة الحجز بنجاح");
    } catch (error) {
      toast.error("حدث خطأ أثناء تحديث حالة الحجز");
      console.error("Error updating reservation status:", error);
    }
  };

  // Messages management functions
  const handleDeleteMessage = (messageId) => {
    const updatedMessages = messages.filter((m) => m.id !== messageId);
    setMessages(updatedMessages);
    localStorage.setItem("contactMessages", JSON.stringify(updatedMessages));
    toast.success("تم حذف الرسالة بنجاح");
  };

  const handleMarkMessageAsRead = (messageId) => {
    const updatedMessages = messages.map((m) =>
      m.id === messageId
        ? { ...m, isRead: true, readAt: new Date().toISOString() }
        : m
    );
    setMessages(updatedMessages);
    localStorage.setItem("contactMessages", JSON.stringify(updatedMessages));
    toast.success("تم تحديد الرسالة كمقروءة");
  };

  // Product page settings management
  const handleSaveProductPageSettings = (sectionKey, settingsData) => {
    const updatedSettings = {
      ...productPageSettings,
      [sectionKey]: settingsData,
    };
    setProductPageSettings(updatedSettings);
    localStorage.setItem(
      "productPageSettings",
      JSON.stringify(updatedSettings)
    );
    toast.success("تم تحديث إعدادات صفحة المنتج بنجاح");
  };

  // Toggle product page setting
  const handleToggleProductPageSetting = (sectionKey, settingKey) => {
    const currentValue = productPageSettings[sectionKey]?.[settingKey];
    const updatedSettings = {
      ...productPageSettings,
      [sectionKey]: {
        ...productPageSettings[sectionKey],
        [settingKey]: !currentValue,
      },
    };
    setProductPageSettings(updatedSettings);
    localStorage.setItem(
      "productPageSettings",
      JSON.stringify(updatedSettings)
    );
    toast.success("تم تحديث الإعداد بنجاح - سيظهر التغيير في صفحة المنتج");

    // Trigger a storage event to notify other tabs/windows
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "productPageSettings",
        newValue: JSON.stringify(updatedSettings),
      })
    );
  };

  // Content management functions
  const handleEditContent = (sectionKey) => {
    if (sectionKey === "hero") {
      setShowHeroModal(true);
      return;
    }

    // Handle individual hero slides
    if (sectionKey.startsWith("hero-slide-")) {
      const slideId = parseInt(sectionKey.replace("hero-slide-", ""));
      const slide = siteContent.hero?.slides?.find((s) => s.id === slideId);
      if (slide) {
        setEditingContent({ key: sectionKey, data: slide, isHeroSlide: true });
        setShowContentModal(true);
      }
      return;
    }

    // Handle nested sections for About page
    if (sectionKey.startsWith("about")) {
      const aboutSections = {
        aboutHeader: siteContent.about?.header,
        aboutStory: siteContent.about?.story,
        aboutMyBreak: siteContent.about?.myBreakSection,
        aboutGhassanko: siteContent.about?.ghassankoSection,
        aboutValues: siteContent.about?.values,
        aboutCTA: siteContent.about?.cta,
      };
      setEditingContent({ key: sectionKey, data: aboutSections[sectionKey] });
    } else {
      setEditingContent({ key: sectionKey, data: siteContent[sectionKey] });
    }
    setShowContentModal(true);
  };

  const handleSaveContent = (sectionKey, contentData) => {
    let updatedContent;

    // Handle individual hero slides
    if (sectionKey.startsWith("hero-slide-")) {
      const slideId = parseInt(sectionKey.replace("hero-slide-", ""));
      const updatedSlides =
        siteContent.hero?.slides?.map((slide) =>
          slide.id === slideId ? { ...slide, ...contentData } : slide
        ) || [];

      updatedContent = {
        ...siteContent,
        hero: {
          ...siteContent.hero,
          slides: updatedSlides,
        },
      };
    }
    // Handle product page settings
    else if (
      ["bookingSection", "featuresSection", "gallery", "breadcrumb"].includes(
        sectionKey
      )
    ) {
      handleSaveProductPageSettings(sectionKey, contentData);
      setShowContentModal(false);
      setEditingContent(null);
      return;
    }
    // Handle nested sections for About page
    else if (sectionKey.startsWith("about") && sectionKey !== "about") {
      const aboutSectionMap = {
        aboutHeader: "header",
        aboutStory: "story",
        aboutMyBreak: "myBreakSection",
        aboutGhassanko: "ghassankoSection",
        aboutValues: "values",
        aboutCTA: "cta",
      };

      const aboutSubSection = aboutSectionMap[sectionKey];
      updatedContent = {
        ...siteContent,
        about: {
          ...siteContent.about,
          [aboutSubSection]: contentData,
        },
      };
    } else {
      updatedContent = {
        ...siteContent,
        [sectionKey]: contentData,
      };
    }

    setSiteContent(updatedContent);
    localStorage.setItem("siteContent", JSON.stringify(updatedContent));
    toast.success("تم تحديث المحتوى بنجاح - سيظهر التغيير في الموقع");
    setShowContentModal(false);
    setEditingContent(null);

    // Trigger a storage event to notify other tabs/windows
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "siteContent",
        newValue: JSON.stringify(updatedContent),
      })
    );
  };

  const handleSaveHeroSlides = (slides) => {
    const updatedContent = {
      ...siteContent,
      hero: { slides },
    };
    setSiteContent(updatedContent);
    localStorage.setItem("siteContent", JSON.stringify(updatedContent));
    toast.success("تم تحديث Hero slides بنجاح - سيظهر التغيير في الموقع");
    setShowHeroModal(false);

    // Trigger a storage event to notify other tabs/windows
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "siteContent",
        newValue: JSON.stringify(updatedContent),
      })
    );
  };

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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 mb-8 bg-white rounded-lg shadow-lg"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم</h1>
            <button
              onClick={logout}
              className="px-4 py-2 text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600"
            >
              تسجيل خروج
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8 bg-white rounded-lg shadow-lg">
          <div className="border-b border-gray-200">
            <nav className="flex px-6 space-x-8 space-x-reverse">
              <button
                onClick={() => setActiveTab("categories")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "categories"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                إدارة الفئات
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "users"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                المستخدمين
              </button>
              <button
                onClick={() => setActiveTab("bookings")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "bookings"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                الحجوزات
              </button>
              <button
                onClick={() => setActiveTab("messages")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "messages"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                الرسائل
              </button>

              <button
                onClick={() => setActiveTab("product-management")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "product-management"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                إدارة المنتجات
              </button>
              <button
                onClick={() => setActiveTab("product-page")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "product-page"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                صفحة المنتج
              </button>
              <button
                onClick={() => setActiveTab("content")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "content"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                إدارة المحتوى
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "categories" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    الفئات
                  </h2>
                  <button onClick={handleAddCategory} className="btn-primary">
                    إضافة فئة جديدة
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {categories.map((category) => {
                    const categoryProductsCount = products.filter(
                      (p) => p.category === category
                    ).length;
                    return (
                      <div key={category} className="p-6 rounded-lg bg-gray-50">
                        <h3 className="mb-2 text-lg font-semibold text-gray-900">
                          {category}
                        </h3>
                        <p className="mb-4 text-sm text-gray-600">
                          {categoryProductsCount} منتج في هذه الفئة
                        </p>
                        <div className="flex space-x-2 space-x-reverse">
                          <button
                            onClick={() => handleEditCategory(category)}
                            className="flex-1 px-3 py-2 text-sm text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
                          >
                            تعديل
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(category)}
                            className="flex-1 px-3 py-2 text-sm text-white transition-colors bg-red-500 rounded hover:bg-red-600"
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
            )}

            {activeTab === "users" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-gray-900">
                  المستخدمين المسجلين
                </h2>

                {users.length === 0 ? (
                  <p className="py-8 text-center text-gray-500">
                    لا يوجد مستخدمين مسجلين
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                            الاسم
                          </th>
                          <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                            البريد الإلكتروني
                          </th>
                          <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                            رقم الهاتف
                          </th>
                          <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                            تاريخ التسجيل
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {users.map((user) => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                              {user.name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                              {user.email}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                              {user.phone}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                              {new Date(user.createdAt).toLocaleDateString(
                                "ar-EG"
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "bookings" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-gray-900">
                  الحجوزات
                </h2>

                {bookings.length === 0 ? (
                  <p className="py-8 text-center text-gray-500">
                    لا توجد حجوزات
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                            المنتج
                          </th>
                          <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                            العميل
                          </th>
                          <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                            رقم الهاتف
                          </th>
                          <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                            الرسالة
                          </th>
                          <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                            الحالة
                          </th>
                          <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                            تاريخ الحجز
                          </th>
                          <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                            الإجراءات
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {bookings.map((booking) => (
                          <tr key={booking.id}>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                              {booking.items ? (
                                <div className="space-y-1">
                                  {booking.items.map((item, index) => (
                                    <div key={index} className="text-xs">
                                      {item.productName} × {item.quantity}
                                    </div>
                                  ))}
                                  <div className="text-xs font-semibold text-primary">
                                    المجموع: {booking.totalItems} قطعة
                                  </div>
                                </div>
                              ) : (
                                booking.productName
                              )}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                              <div>
                                <div className="font-medium">
                                  {booking.customerName}
                                </div>
                                {booking.customerEmail && (
                                  <div className="text-xs text-gray-400">
                                    {booking.customerEmail}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                              {booking.phone}
                            </td>
                            <td className="max-w-xs px-6 py-4 text-sm text-gray-500">
                              <div className="space-y-1">
                                {booking.address && (
                                  <div className="text-xs">
                                    <span className="font-medium">
                                      العنوان:
                                    </span>{" "}
                                    {booking.address}
                                  </div>
                                )}
                                {booking.message && (
                                  <div className="text-xs">
                                    <span className="font-medium">
                                      ملاحظات:
                                    </span>{" "}
                                    {booking.message}
                                  </div>
                                )}
                                {!booking.address &&
                                  !booking.message &&
                                  "لا توجد ملاحظات"}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <select
                                value={booking.status || "pending"}
                                onChange={(e) =>
                                  handleUpdateBookingStatus(
                                    booking.id,
                                    e.target.value
                                  )
                                }
                                className="px-2 py-1 text-sm border border-gray-300 rounded"
                              >
                                <option value="pending">في الانتظار</option>
                                <option value="confirmed">مؤكد</option>
                                <option value="completed">مكتمل</option>
                                <option value="cancelled">ملغي</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                              <div>
                                <div>
                                  {new Date(
                                    booking.createdAt
                                  ).toLocaleDateString("ar-EG")}
                                </div>
                                {booking.totalPrice && (
                                  <div className="text-xs font-semibold text-primary">
                                    {new Intl.NumberFormat("ar-EG").format(
                                      booking.totalPrice
                                    )}{" "}
                                    جنيه
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm whitespace-nowrap">
                              <button
                                onClick={() => handleDeleteBooking(booking.id)}
                                className="text-red-600 transition-colors hover:text-red-900"
                              >
                                حذف
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "messages" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-gray-900">
                  رسائل العملاء
                </h2>

                {messages.length === 0 ? (
                  <p className="py-8 text-center text-gray-500">
                    لا توجد رسائل
                  </p>
                ) : (
                  <div className="space-y-4">
                    {/* Statistics */}
                    <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
                      <div className="p-4 rounded-lg bg-blue-50">
                        <div className="flex items-center">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <svg
                              className="w-6 h-6 text-blue-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <div className="mr-4">
                            <p className="text-sm font-medium text-gray-600">
                              إجمالي الرسائل
                            </p>
                            <p className="text-2xl font-bold text-gray-900">
                              {messages.length}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 rounded-lg bg-green-50">
                        <div className="flex items-center">
                          <div className="p-2 bg-green-100 rounded-lg">
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
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <div className="mr-4">
                            <p className="text-sm font-medium text-gray-600">
                              الرسائل المقروءة
                            </p>
                            <p className="text-2xl font-bold text-gray-900">
                              {messages.filter((m) => m.isRead).length}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 rounded-lg bg-orange-50">
                        <div className="flex items-center">
                          <div className="p-2 bg-orange-100 rounded-lg">
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
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                          <div className="mr-4">
                            <p className="text-sm font-medium text-gray-600">
                              رسائل جديدة
                            </p>
                            <p className="text-2xl font-bold text-gray-900">
                              {messages.filter((m) => !m.isRead).length}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Messages List */}
                    <div className="space-y-4">
                      {messages
                        .sort(
                          (a, b) =>
                            new Date(b.createdAt) - new Date(a.createdAt)
                        )
                        .map((message) => (
                          <div
                            key={message.id}
                            className={`bg-white rounded-lg shadow-md p-6 border-r-4 ${
                              message.isRead
                                ? "border-gray-300"
                                : "border-blue-500"
                            }`}
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center space-x-3 space-x-reverse">
                                <div
                                  className={`w-3 h-3 rounded-full ${
                                    message.isRead
                                      ? "bg-gray-300"
                                      : "bg-blue-500"
                                  }`}
                                ></div>
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-900">
                                    {message.name}
                                  </h3>
                                  <p className="text-sm text-gray-500">
                                    {message.email}
                                  </p>
                                </div>
                              </div>
                              <div className="text-sm text-gray-500">
                                {new Date(message.createdAt).toLocaleDateString(
                                  "ar-EG",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </div>
                            </div>

                            <div className="mb-4">
                              <div className="flex items-center mb-2">
                                <svg
                                  className="w-4 h-4 ml-2 text-gray-400"
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
                                <span className="text-sm text-gray-600">
                                  {message.phone}
                                </span>
                              </div>
                              <div className="p-4 rounded-lg bg-gray-50">
                                <p className="leading-relaxed text-gray-700">
                                  {message.message}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex space-x-2 space-x-reverse">
                                {!message.isRead && (
                                  <button
                                    onClick={() =>
                                      handleMarkMessageAsRead(message.id)
                                    }
                                    className="flex items-center px-4 py-2 text-sm text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
                                  >
                                    <svg
                                      className="w-4 h-4 ml-1"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                    تحديد كمقروءة
                                  </button>
                                )}
                                <a
                                  href={`mailto:${message.email}?subject=رد على رسالتك&body=مرحباً ${message.name}،%0A%0Aشكراً لتواصلك معنا...`}
                                  className="flex items-center px-4 py-2 text-sm text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600"
                                >
                                  <svg
                                    className="w-4 h-4 ml-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                  </svg>
                                  رد بالإيميل
                                </a>
                                <a
                                  href={`https://wa.me/${message.phone.replace(
                                    /[^0-9]/g,
                                    ""
                                  )}?text=مرحباً ${
                                    message.name
                                  }، شكراً لتواصلك معنا`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center px-4 py-2 text-sm text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
                                >
                                  <svg
                                    className="w-4 h-4 ml-1"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.905 3.488" />
                                  </svg>
                                  رد بالواتساب
                                </a>
                              </div>
                              <button
                                onClick={() => handleDeleteMessage(message.id)}
                                className="flex items-center text-red-600 transition-colors hover:text-red-800"
                              >
                                <svg
                                  className="w-4 h-4 ml-1"
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
                                حذف
                              </button>
                            </div>

                            {message.isRead && message.readAt && (
                              <div className="pt-3 mt-3 border-t border-gray-200">
                                <p className="text-xs text-gray-500">
                                  تم قراءة الرسالة في:{" "}
                                  {new Date(message.readAt).toLocaleDateString(
                                    "ar-EG",
                                    {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "product-management" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    إدارة المنتجات
                  </h2>
                  <button
                    onClick={handleAddProduct}
                    className="flex items-center px-6 py-3 text-white transition-colors rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
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
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    إضافة منتج جديد
                  </button>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-4">
                  <div className="p-4 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-100">إجمالي المنتجات</p>
                        <p className="text-2xl font-bold">{products.length}</p>
                      </div>
                      <div className="p-3 bg-blue-400 rounded-lg bg-opacity-30">
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
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 text-white bg-gradient-to-r from-green-500 to-green-600 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-green-100">
                          المنتجات المميزة
                        </p>
                        <p className="text-2xl font-bold">
                          {products.filter((p) => p.featured).length}
                        </p>
                      </div>
                      <div className="p-3 bg-green-400 rounded-lg bg-opacity-30">
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
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 text-white bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-purple-100">الفئات</p>
                        <p className="text-2xl font-bold">
                          {categories.length}
                        </p>
                      </div>
                      <div className="p-3 bg-purple-400 rounded-lg bg-opacity-30">
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
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-orange-100">إجمالي الصور</p>
                        <p className="text-2xl font-bold">
                          {products.reduce(
                            (total, product) =>
                              total + (product.images?.length || 0),
                            0
                          )}
                        </p>
                      </div>
                      <div className="p-3 bg-orange-400 rounded-lg bg-opacity-30">
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
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="overflow-hidden bg-white border border-gray-200 shadow-lg rounded-xl product-card-hover"
                    >
                      {/* Product Image */}
                      <div className="relative h-48 bg-gray-100">
                        <img
                          src={
                            product.images?.[0] ||
                            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800"
                          }
                          alt={product.name}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute top-3 right-3">
                          <span className="px-2 py-1 text-xs font-medium text-white rounded-full bg-primary">
                            {product.category}
                          </span>
                        </div>
                        {product.featured && (
                          <div className="absolute top-3 left-3">
                            <span className="px-2 py-1 text-xs font-medium text-white bg-yellow-500 rounded-full">
                              مميز
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <h3 className="mb-2 text-lg font-bold text-gray-900">
                          {product.name}
                        </h3>
                        <p className="mb-3 text-sm text-gray-600 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-2xl font-bold text-primary">
                            {product.price} جنيه
                          </span>
                          <div className="flex items-center text-sm text-gray-500">
                            <svg
                              className="w-4 h-4 ml-1"
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
                            {product.images?.length || 1} صورة
                          </div>
                        </div>

                        {/* Features Preview */}
                        {product.features && product.features.length > 0 && (
                          <div className="mb-4">
                            <p className="mb-2 text-xs font-medium text-gray-700">
                              المميزات:
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {product.features
                                .slice(0, 2)
                                .map((feature, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded"
                                  >
                                    {feature.length > 15
                                      ? feature.substring(0, 15) + "..."
                                      : feature}
                                  </span>
                                ))}
                              {product.features.length > 2 && (
                                <span className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded">
                                  +{product.features.length - 2} أخرى
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="space-y-2">
                          <button
                            onClick={() => {
                              setSelectedProductForEdit(product);
                              setShowProductEditModal(true);
                            }}
                            className="flex items-center justify-center w-full px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                          >
                            <svg
                              className="w-4 h-4 ml-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                            تعديل تفاصيل المنتج
                          </button>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => {
                                setSelectedProductForPreview(product);
                                setShowProductPreviewModal(true);
                              }}
                              className="flex items-center justify-center px-3 py-2 text-sm text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
                            >
                              <svg
                                className="w-4 h-4 ml-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                              معاينة
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="flex items-center justify-center px-3 py-2 text-sm text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
                            >
                              <svg
                                className="w-4 h-4 ml-1"
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
                              حذف
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Empty State */}
                {products.length === 0 && (
                  <div className="py-12 text-center">
                    <div className="mb-4 text-6xl">📦</div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">
                      لا توجد منتجات
                    </h3>
                    <p className="mb-6 text-gray-600">
                      ابدأ بإضافة منتجات جديدة لإدارتها من هنا
                    </p>
                    <button onClick={handleAddProduct} className="btn-primary">
                      إضافة منتج جديد
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "product-page" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    إعدادات صفحة عرض المنتج
                  </h2>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => {
                        // Open first product in new tab for preview
                        if (products.length > 0) {
                          window.open(`/products/${products[0].id}`, "_blank");
                        } else {
                          toast.info("لا توجد منتجات للمعاينة");
                        }
                      }}
                      className="flex items-center px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      معاينة التغييرات
                    </button>
                    <div className="text-sm text-gray-500">
                      تحكم في شكل ومحتوى صفحة عرض المنتج
                    </div>
                  </div>
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
                    <button
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
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <span className="text-sm font-medium">
                          عرض زر الحجز
                        </span>
                        <button
                          onClick={() =>
                            handleToggleProductPageSetting(
                              "bookingSection",
                              "showBookingButton"
                            )
                          }
                          className={`w-12 h-6 rounded-full ${
                            productPageSettings.bookingSection
                              ?.showBookingButton
                              ? "bg-green-500"
                              : "bg-gray-300"
                          } relative transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
                        >
                          <div
                            className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                              productPageSettings.bookingSection
                                ?.showBookingButton
                                ? "translate-x-6"
                                : "translate-x-0.5"
                            }`}
                          ></div>
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <span className="text-sm font-medium">
                          عرض زر الواتساب
                        </span>
                        <button
                          onClick={() =>
                            handleToggleProductPageSetting(
                              "bookingSection",
                              "showWhatsAppButton"
                            )
                          }
                          className={`w-12 h-6 rounded-full ${
                            productPageSettings.bookingSection
                              ?.showWhatsAppButton
                              ? "bg-green-500"
                              : "bg-gray-300"
                          } relative transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
                        >
                          <div
                            className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                              productPageSettings.bookingSection
                                ?.showWhatsAppButton
                                ? "translate-x-6"
                                : "translate-x-0.5"
                            }`}
                          ></div>
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <span className="text-sm font-medium">
                          عرض زر الاتصال
                        </span>
                        <button
                          onClick={() =>
                            handleToggleProductPageSetting(
                              "bookingSection",
                              "showPhoneButton"
                            )
                          }
                          className={`w-12 h-6 rounded-full ${
                            productPageSettings.bookingSection?.showPhoneButton
                              ? "bg-green-500"
                              : "bg-gray-300"
                          } relative transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
                        >
                          <div
                            className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                              productPageSettings.bookingSection
                                ?.showPhoneButton
                                ? "translate-x-6"
                                : "translate-x-0.5"
                            }`}
                          ></div>
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <span className="text-sm font-medium">
                          عرض زر إضافة للعربة
                        </span>
                        <button
                          onClick={() =>
                            handleToggleProductPageSetting(
                              "bookingSection",
                              "showAddToCartButton"
                            )
                          }
                          className={`w-12 h-6 rounded-full ${
                            productPageSettings.bookingSection
                              ?.showAddToCartButton
                              ? "bg-green-500"
                              : "bg-gray-300"
                          } relative transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
                        >
                          <div
                            className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                              productPageSettings.bookingSection
                                ?.showAddToCartButton
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
                          value={
                            productPageSettings.bookingSection?.title || ""
                          }
                          onChange={(e) => {
                            const updatedSettings = {
                              ...productPageSettings,
                              bookingSection: {
                                ...productPageSettings.bookingSection,
                                title: e.target.value,
                              },
                            };
                            setProductPageSettings(updatedSettings);
                            localStorage.setItem(
                              "productPageSettings",
                              JSON.stringify(updatedSettings)
                            );
                          }}
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
                          value={
                            productPageSettings.bookingSection
                              ?.whatsappNumber || ""
                          }
                          onChange={(e) => {
                            const updatedSettings = {
                              ...productPageSettings,
                              bookingSection: {
                                ...productPageSettings.bookingSection,
                                whatsappNumber: e.target.value,
                              },
                            };
                            setProductPageSettings(updatedSettings);
                            localStorage.setItem(
                              "productPageSettings",
                              JSON.stringify(updatedSettings)
                            );
                          }}
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
                          value={
                            productPageSettings.bookingSection?.phoneNumber ||
                            ""
                          }
                          onChange={(e) => {
                            const updatedSettings = {
                              ...productPageSettings,
                              bookingSection: {
                                ...productPageSettings.bookingSection,
                                phoneNumber: e.target.value,
                              },
                            };
                            setProductPageSettings(updatedSettings);
                            localStorage.setItem(
                              "productPageSettings",
                              JSON.stringify(updatedSettings)
                            );
                          }}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="+201234567890"
                        />
                      </div>
                      <div className="p-3 rounded-lg bg-blue-50">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          وصف القسم:
                        </label>
                        <textarea
                          value={
                            productPageSettings.bookingSection?.description ||
                            ""
                          }
                          onChange={(e) => {
                            const updatedSettings = {
                              ...productPageSettings,
                              bookingSection: {
                                ...productPageSettings.bookingSection,
                                description: e.target.value,
                              },
                            };
                            setProductPageSettings(updatedSettings);
                            localStorage.setItem(
                              "productPageSettings",
                              JSON.stringify(updatedSettings)
                            );
                          }}
                          rows="3"
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="يمكنك حجز هذا المنتج الآن أو التواصل معنا للاستفسار"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features Section Settings */}
                <div className="p-6 bg-white border border-gray-200 shadow-lg rounded-xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="flex items-center text-xl font-bold text-gray-900">
                      <span className="p-2 mr-3 bg-blue-100 rounded-lg">
                        <svg
                          className="w-6 h-6 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                          />
                        </svg>
                      </span>
                      قسم المميزات
                    </h3>
                    <button
                      onClick={() => {
                        setEditingContent({
                          key: "featuresSection",
                          data: productPageSettings.featuresSection,
                        });
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
                        <span className="text-sm font-medium">
                          عرض قسم المميزات
                        </span>
                        <button
                          onClick={() =>
                            handleToggleProductPageSetting(
                              "featuresSection",
                              "showFeatures"
                            )
                          }
                          className={`w-12 h-6 rounded-full ${
                            productPageSettings.featuresSection?.showFeatures
                              ? "bg-blue-500"
                              : "bg-gray-300"
                          } relative transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                        >
                          <div
                            className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                              productPageSettings.featuresSection?.showFeatures
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
                          عنوان القسم:
                        </label>
                        <input
                          type="text"
                          value={
                            productPageSettings.featuresSection?.title || ""
                          }
                          onChange={(e) => {
                            const updatedSettings = {
                              ...productPageSettings,
                              featuresSection: {
                                ...productPageSettings.featuresSection,
                                title: e.target.value,
                              },
                            };
                            setProductPageSettings(updatedSettings);
                            localStorage.setItem(
                              "productPageSettings",
                              JSON.stringify(updatedSettings)
                            );
                          }}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="المميزات الرئيسية"
                        />
                      </div>
                      <div className="p-3 rounded-lg bg-blue-50">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          مميزات إضافية (كل ميزة في سطر منفصل):
                        </label>
                        <textarea
                          value={
                            productPageSettings.featuresSection?.customFeatures?.join(
                              "\n"
                            ) || ""
                          }
                          onChange={(e) => {
                            const updatedSettings = {
                              ...productPageSettings,
                              featuresSection: {
                                ...productPageSettings.featuresSection,
                                customFeatures: e.target.value
                                  .split("\n")
                                  .filter((f) => f.trim()),
                              },
                            };
                            setProductPageSettings(updatedSettings);
                            localStorage.setItem(
                              "productPageSettings",
                              JSON.stringify(updatedSettings)
                            );
                          }}
                          rows="4"
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="ميزة إضافية 1&#10;ميزة إضافية 2&#10;ميزة إضافية 3"
                        />
                        <p className="mt-1 text-xs text-gray-500">
                          {productPageSettings.featuresSection?.customFeatures
                            ?.length || 0}{" "}
                          ميزة مخصصة
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gallery Settings */}
                <div className="p-6 bg-white border border-gray-200 shadow-lg rounded-xl">
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
                          handleToggleProductPageSetting(
                            "gallery",
                            "showThumbnails"
                          )
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
                          handleToggleProductPageSetting(
                            "gallery",
                            "showNavigation"
                          )
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
                          handleToggleProductPageSetting(
                            "gallery",
                            "showPagination"
                          )
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
                </div>

                {/* Breadcrumb Settings */}
                <div className="p-6 bg-white border border-gray-200 shadow-lg rounded-xl">
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
                      <span className="text-sm font-medium">
                        عرض شريط التنقل
                      </span>
                      <button
                        onClick={() =>
                          handleToggleProductPageSetting(
                            "breadcrumb",
                            "showBreadcrumb"
                          )
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
                        value={
                          productPageSettings.breadcrumb?.productsText || ""
                        }
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
                </div>
              </motion.div>
            )}

            {activeTab === "content" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    إدارة محتوى الموقع
                  </h2>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => window.open("/", "_blank")}
                      className="flex items-center px-4 py-2 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
                    >
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      معاينة الموقع
                    </button>
                    <div className="text-sm text-gray-500">
                      تحكم في جميع محتويات الموقع من مكان واحد
                    </div>
                  </div>
                </div>

                {/* Hero Section */}
                <div className="p-6 bg-white border border-gray-200 shadow-lg rounded-xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="flex items-center text-xl font-bold text-gray-900">
                      <span className="p-2 mr-3 bg-blue-100 rounded-lg">
                        <svg
                          className="w-6 h-6 text-blue-600"
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
                      الصفحة الرئيسية - Hero Slides
                    </h3>
                    <button
                      onClick={() => setShowHeroModal(true)}
                      className="flex items-center px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      إدارة الـ Slides
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {siteContent.hero?.slides?.map((slide, index) => (
                      <div
                        key={slide.id}
                        className="p-4 transition-shadow border border-blue-200 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-md"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-blue-600">
                            Slide {index + 1}
                          </span>
                          <button
                            onClick={() =>
                              handleEditContent(`hero-slide-${slide.id}`)
                            }
                            className="text-sm font-medium text-blue-600 hover:text-blue-800"
                          >
                            تعديل
                          </button>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>
                            <strong>العنوان:</strong> {slide.title}
                          </p>
                          <p>
                            <strong>العنوان الفرعي:</strong>{" "}
                            {slide.subtitle
                              ? slide.subtitle.substring(0, 30) + "..."
                              : "لا يوجد"}
                          </p>
                          <p>
                            <strong>نص الزر:</strong> {slide.buttonText}
                          </p>
                        </div>
                        {slide.backgroundImage && (
                          <img
                            src={slide.backgroundImage}
                            alt={`Hero Slide ${index + 1}`}
                            className="object-cover w-full h-16 mt-3 rounded"
                          />
                        )}
                      </div>
                    )) || (
                      <div className="p-6 text-center rounded-lg col-span-full bg-gray-50">
                        <p className="text-gray-500">لا توجد slides</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* About Page Sections */}
                <div className="p-6 bg-white border border-gray-200 shadow-lg rounded-xl">
                  <div className="flex items-center mb-6">
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
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                    <h3 className="text-xl font-bold text-gray-900">
                      صفحة من نحن
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="p-4 transition-shadow border border-green-200 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-md">
                      <div className="flex items-center justify-between mb-3">
                        <span className="flex items-center text-sm font-medium text-green-600">
                          <span className="mr-2">📋</span>
                          الهيدر
                        </span>
                        <button
                          onClick={() => handleEditContent("aboutHeader")}
                          className="text-sm font-medium text-green-600 hover:text-green-800"
                        >
                          تعديل
                        </button>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>
                          <strong>العنوان:</strong>{" "}
                          {siteContent.about?.header?.title}
                        </p>
                        <p>
                          <strong>العنوان الفرعي:</strong>{" "}
                          {siteContent.about?.header?.subtitle
                            ? siteContent.about.header.subtitle.substring(
                                0,
                                30
                              ) + "..."
                            : "لا يوجد"}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 transition-shadow border border-purple-200 rounded-lg bg-gradient-to-br from-purple-50 to-violet-50 hover:shadow-md">
                      <div className="flex items-center justify-between mb-3">
                        <span className="flex items-center text-sm font-medium text-purple-600">
                          <span className="mr-2">📖</span>
                          قصتنا
                        </span>
                        <button
                          onClick={() => handleEditContent("aboutStory")}
                          className="text-sm font-medium text-purple-600 hover:text-purple-800"
                        >
                          تعديل
                        </button>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>
                          <strong>العنوان:</strong>{" "}
                          {siteContent.about?.story?.title}
                        </p>
                        <p>
                          <strong>المحتوى:</strong>{" "}
                          {siteContent.about?.story?.content
                            ? siteContent.about.story.content.substring(0, 40) +
                              "..."
                            : "لا يوجد"}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 transition-shadow border border-orange-200 rounded-lg bg-gradient-to-br from-orange-50 to-amber-50 hover:shadow-md">
                      <div className="flex items-center justify-between mb-3">
                        <span className="flex items-center text-sm font-medium text-orange-600">
                          <span className="mr-2">🛋️</span>
                          ماي بريك
                        </span>
                        <button
                          onClick={() => handleEditContent("aboutMyBreak")}
                          className="text-sm font-medium text-orange-600 hover:text-orange-800"
                        >
                          تعديل
                        </button>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>
                          <strong>العنوان:</strong>{" "}
                          {siteContent.about?.myBreakSection?.title}
                        </p>
                        <p>
                          <strong>العنوان الفرعي:</strong>{" "}
                          {siteContent.about?.myBreakSection?.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 transition-shadow border border-red-200 rounded-lg bg-gradient-to-br from-red-50 to-rose-50 hover:shadow-md">
                      <div className="flex items-center justify-between mb-3">
                        <span className="flex items-center text-sm font-medium text-red-600">
                          <span className="mr-2">🪑</span>
                          غسانكو
                        </span>
                        <button
                          onClick={() => handleEditContent("aboutGhassanko")}
                          className="text-sm font-medium text-red-600 hover:text-red-800"
                        >
                          تعديل
                        </button>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>
                          <strong>العنوان:</strong>{" "}
                          {siteContent.about?.ghassankoSection?.title}
                        </p>
                        <p>
                          <strong>العنوان الفرعي:</strong>{" "}
                          {siteContent.about?.ghassankoSection?.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 transition-shadow border border-teal-200 rounded-lg bg-gradient-to-br from-teal-50 to-cyan-50 hover:shadow-md">
                      <div className="flex items-center justify-between mb-3">
                        <span className="flex items-center text-sm font-medium text-teal-600">
                          <span className="mr-2">⭐</span>
                          القيم
                        </span>
                        <button
                          onClick={() => handleEditContent("aboutValues")}
                          className="text-sm font-medium text-teal-600 hover:text-teal-800"
                        >
                          تعديل
                        </button>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>
                          <strong>العنوان:</strong>{" "}
                          {siteContent.about?.values?.title}
                        </p>
                        <div className="text-xs">
                          <p>• الجودة • الراحة • الابتكار</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 transition-shadow border border-pink-200 rounded-lg bg-gradient-to-br from-pink-50 to-rose-50 hover:shadow-md">
                      <div className="flex items-center justify-between mb-3">
                        <span className="flex items-center text-sm font-medium text-pink-600">
                          <span className="mr-2">🎯</span>
                          الدعوة للعمل
                        </span>
                        <button
                          onClick={() => handleEditContent("aboutCTA")}
                          className="text-sm font-medium text-pink-600 hover:text-pink-800"
                        >
                          تعديل
                        </button>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>
                          <strong>العنوان:</strong>{" "}
                          {siteContent.about?.cta?.title}
                        </p>
                        <p>
                          <strong>نص الزر:</strong>{" "}
                          {siteContent.about?.cta?.buttonText}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Home Page Sections */}
                <div className="p-6 bg-white border border-gray-200 shadow-lg rounded-xl">
                  <div className="flex items-center mb-6">
                    <span className="p-2 mr-3 bg-indigo-100 rounded-lg">
                      <svg
                        className="w-6 h-6 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"
                        />
                      </svg>
                    </span>
                    <h3 className="text-xl font-bold text-gray-900">
                      أقسام الصفحة الرئيسية
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="p-4 transition-shadow border border-blue-200 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-md">
                      <div className="flex items-center justify-between mb-3">
                        <span className="flex items-center text-sm font-medium text-blue-600">
                          <span className="mr-2">🛋️</span>
                          قسم ماي بريك
                        </span>
                        <button
                          onClick={() => handleEditContent("myBreak")}
                          className="text-sm font-medium text-blue-600 hover:text-blue-800"
                        >
                          تعديل
                        </button>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>
                          <strong>العنوان:</strong> {siteContent.myBreak?.title}
                        </p>
                        <p>
                          <strong>العنوان الفرعي:</strong>{" "}
                          {siteContent.myBreak?.subtitle}
                        </p>
                        <p>
                          <strong>الوصف:</strong>{" "}
                          {siteContent.myBreak?.description
                            ? siteContent.myBreak.description.substring(0, 50) +
                              "..."
                            : "لا يوجد"}
                        </p>
                      </div>
                      {siteContent.myBreak?.image && (
                        <img
                          src={siteContent.myBreak.image}
                          alt="My Break"
                          className="object-cover w-full h-16 mt-3 rounded"
                        />
                      )}
                    </div>

                    <div className="p-4 transition-shadow border rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 hover:shadow-md">
                      <div className="flex items-center justify-between mb-3">
                        <span className="flex items-center text-sm font-medium text-amber-600">
                          <span className="mr-2">🪑</span>
                          قسم غسانكو
                        </span>
                        <button
                          onClick={() => handleEditContent("ghassanko")}
                          className="text-sm font-medium text-amber-600 hover:text-amber-800"
                        >
                          تعديل
                        </button>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>
                          <strong>العنوان:</strong>{" "}
                          {siteContent.ghassanko?.title}
                        </p>
                        <p>
                          <strong>العنوان الفرعي:</strong>{" "}
                          {siteContent.ghassanko?.subtitle}
                        </p>
                        <p>
                          <strong>الوصف:</strong>{" "}
                          {siteContent.ghassanko?.description
                            ? siteContent.ghassanko.description.substring(
                                0,
                                50
                              ) + "..."
                            : "لا يوجد"}
                        </p>
                      </div>
                      {siteContent.ghassanko?.image && (
                        <img
                          src={siteContent.ghassanko.image}
                          alt="Ghassanko"
                          className="object-cover w-full h-16 mt-3 rounded"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact & Footer Sections */}
                <div className="p-6 bg-white border border-gray-200 shadow-lg rounded-xl">
                  <div className="flex items-center mb-6">
                    <span className="p-2 mr-3 bg-gray-100 rounded-lg">
                      <svg
                        className="w-6 h-6 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </span>
                    <h3 className="text-xl font-bold text-gray-900">
                      صفحة التواصل والفوتر
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="p-4 transition-shadow border border-blue-200 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-md">
                      <div className="flex items-center justify-between mb-3">
                        <span className="flex items-center text-sm font-medium text-blue-600">
                          <span className="mr-2">📞</span>
                          صفحة التواصل
                        </span>
                        <button
                          onClick={() => handleEditContent("contact")}
                          className="text-sm font-medium text-blue-600 hover:text-blue-800"
                        >
                          تعديل
                        </button>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>
                          <strong>العنوان:</strong> {siteContent.contact?.title}
                        </p>
                        <p>
                          <strong>الهاتف:</strong> {siteContent.contact?.phone}
                        </p>
                        <p>
                          <strong>البريد:</strong> {siteContent.contact?.email}
                        </p>
                        <p>
                          <strong>العنوان:</strong>{" "}
                          {siteContent.contact?.address}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 transition-shadow border border-gray-200 rounded-lg bg-gradient-to-br from-gray-50 to-slate-50 hover:shadow-md">
                      <div className="flex items-center justify-between mb-3">
                        <span className="flex items-center text-sm font-medium text-gray-600">
                          <span className="mr-2">🦶</span>
                          الفوتر
                        </span>
                        <button
                          onClick={() => handleEditContent("footer")}
                          className="text-sm font-medium text-gray-600 hover:text-gray-800"
                        >
                          تعديل
                        </button>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>
                          <strong>الوصف:</strong>{" "}
                          {siteContent.footer?.description
                            ? siteContent.footer.description.substring(0, 40) +
                              "..."
                            : "لا يوجد"}
                        </p>
                        <p>
                          <strong>الهاتف:</strong> {siteContent.footer?.phone}
                        </p>
                        <p>
                          <strong>البريد:</strong> {siteContent.footer?.email}
                        </p>
                      </div>
                      <div className="flex items-center mt-3 space-x-2 space-x-reverse">
                        <span className="text-xs text-gray-500">
                          السوشال ميديا:
                        </span>
                        <div className="flex space-x-1 space-x-reverse">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Header Section */}
                <div className="p-6 bg-white border border-gray-200 shadow-lg rounded-xl">
                  <div className="flex items-center mb-6">
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
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </span>
                    <h3 className="text-xl font-bold text-gray-900">
                      الهيدر وشريط التنقل
                    </h3>
                  </div>
                  <div className="p-4 border border-purple-200 rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50">
                    <div className="flex items-center justify-between mb-3">
                      <span className="flex items-center text-sm font-medium text-purple-600">
                        <span className="mr-2">🏷️</span>
                        إعدادات اللوجو والهيدر
                      </span>
                      <button
                        onClick={() => handleEditContent("header")}
                        className="text-sm font-medium text-purple-600 hover:text-purple-800"
                      >
                        تعديل
                      </button>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>
                        <strong>نص اللوجو:</strong>{" "}
                        {siteContent.header?.logoText}
                      </p>
                      <p>
                        <strong>عرض النص:</strong>{" "}
                        {siteContent.header?.showLogoText ? "نعم" : "لا"}
                      </p>
                      <p>
                        <strong>عرض الصورة:</strong>{" "}
                        {siteContent.header?.showLogoImage ? "نعم" : "لا"}
                      </p>
                    </div>
                    {siteContent.header?.logoImage && (
                      <img
                        src={siteContent.header.logoImage}
                        alt="Logo"
                        className="object-contain w-full h-16 p-2 mt-3 bg-white rounded"
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        isOpen={showModal}
        product={editingProduct}
        categories={categories}
        onSave={handleSaveProduct}
        onClose={() => {
          setShowModal(false);
          setEditingProduct(null);
        }}
      />

      {/* Category Modal */}
      <CategoryModal
        isOpen={showCategoryModal}
        category={editingCategory}
        onSave={handleSaveCategory}
        onClose={() => {
          setShowCategoryModal(false);
          setEditingCategory(null);
        }}
      />

      {/* Content Modal */}
      <ContentModal
        isOpen={showContentModal}
        content={editingContent}
        onSave={handleSaveContent}
        onClose={() => {
          setShowContentModal(false);
          setEditingContent(null);
        }}
      />

      {/* Hero Slides Modal */}
      <HeroSlidesModal
        isOpen={showHeroModal}
        slides={siteContent.hero?.slides || []}
        onSave={handleSaveHeroSlides}
        onClose={() => setShowHeroModal(false)}
      />

      {/* Advanced Product Edit Modal */}
      <AdvancedProductEditModal
        isOpen={showProductEditModal}
        product={selectedProductForEdit}
        categories={categories}
        onSave={(updatedProduct) => {
          const updatedProducts = products.map((p) =>
            p.id === updatedProduct.id ? updatedProduct : p
          );
          setProducts(updatedProducts);
          toast.success("تم تحديث المنتج بنجاح");
          setShowProductEditModal(false);
          setSelectedProductForEdit(null);
        }}
        onClose={() => {
          setShowProductEditModal(false);
          setSelectedProductForEdit(null);
        }}
      />

      {/* Product Preview Modal */}
      <ProductPreviewModal
        isOpen={showProductPreviewModal}
        product={selectedProductForPreview}
        onClose={() => {
          setShowProductPreviewModal(false);
          setSelectedProductForPreview(null);
        }}
      />
    </div>
  );
};

// Product Modal Component with File Upload
const ProductModal = ({ isOpen, product, categories, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    category: product?.category || categories[0] || "My Break",
    type: product?.type || "sofa",
    price: product?.price || "",
    description: product?.description || "",
    featured: product?.featured || false,
  });

  const [imagePreview, setImagePreview] = useState(product?.images || []);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        category: product.category || categories[0] || "My Break",
        type: product.type || "sofa",
        price: product.price || "",
        description: product.description || "",
        featured: product.featured || false,
      });
      setImagePreview(product.images || []);
    } else {
      setFormData({
        name: "",
        category: categories[0] || "My Break",
        type: "sofa",
        price: "",
        description: "",
        featured: false,
      });
      setImagePreview([]);
    }
  }, [product, categories]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Create preview URLs
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreview(previewUrls);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.description) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    // In a real app, you would upload images to a server here
    // For now, we'll use the preview URLs or existing images
    const images =
      imagePreview.length > 0
        ? imagePreview
        : [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
          ];

    onSave({
      ...formData,
      images: images,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product ? "تعديل المنتج" : "إضافة منتج جديد"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            اسم المنتج *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            الفئة *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input-field"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            السعر *
          </label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            الوصف *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            صور المنتج
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="input-field"
          />
          {imagePreview.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {imagePreview.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="object-cover w-full h-20 border rounded"
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="ml-2"
          />
          <label className="text-sm font-medium text-gray-700">منتج مميز</label>
        </div>

        <div className="flex pt-4 space-x-3 space-x-reverse">
          <button type="submit" className="flex-1 btn-primary">
            {product ? "تحديث" : "إضافة"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 btn-secondary"
          >
            إلغاء
          </button>
        </div>
      </form>
    </Modal>
  );
};

// Category Modal Component
const CategoryModal = ({ isOpen, category, onSave, onClose }) => {
  const [categoryName, setCategoryName] = useState(category || "");

  useEffect(() => {
    setCategoryName(category || "");
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(categoryName);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={category ? "تعديل الفئة" : "إضافة فئة جديدة"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            اسم الفئة *
          </label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="input-field"
            placeholder="مثال: أثاث المكتب"
            required
          />
        </div>

        <div className="flex pt-4 space-x-3 space-x-reverse">
          <button type="submit" className="flex-1 btn-primary">
            {category ? "تحديث" : "إضافة"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 btn-secondary"
          >
            إلغاء
          </button>
        </div>
      </form>
    </Modal>
  );
};

// Advanced Product Edit Modal Component
const AdvancedProductEditModal = ({
  isOpen,
  product,
  categories,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    featured: false,
    features: [],
    images: [],
  });
  const [newFeature, setNewFeature] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        category: product.category || categories[0] || "My Break",
        price: product.price || "",
        description: product.description || "",
        featured: product.featured || false,
        features: product.features || [],
        images: product.images || [],
      });
      setImagePreview(product.images || []);
    }
  }, [product, categories]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);

    // Create preview URLs
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreview([...formData.images, ...previewUrls]);
  };

  const handleRemoveImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = imagePreview.filter((_, i) => i !== index);

    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }));
    setImagePreview(newPreviews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.description) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    // In a real app, you would upload new images to a server here
    const finalImages =
      imagePreview.length > 0
        ? imagePreview
        : [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
          ];

    onSave({
      ...product,
      ...formData,
      images: finalImages,
    });
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto modal-enter">
        {/* Header */}
        <div className="p-6 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-xl">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center text-2xl font-bold">
              <svg
                className="w-8 h-8 ml-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              تعديل تفاصيل المنتج
            </h2>
            <button
              onClick={onClose}
              className="text-white transition-colors hover:text-gray-200"
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
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Left Column - Basic Info */}
            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900">
                  <span className="p-2 ml-2 bg-blue-100 rounded-lg">
                    <svg
                      className="w-5 h-5 text-blue-600"
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
                  المعلومات الأساسية
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      اسم المنتج *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        الفئة *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        السعر *
                      </label>
                      <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="مثال: 5000"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      وصف المنتج *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="اكتب وصفاً مفصلاً للمنتج..."
                      required
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                      className="w-4 h-4 ml-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="text-sm font-medium text-gray-700">
                      منتج مميز (سيظهر في الصفحة الرئيسية)
                    </label>
                  </div>
                </div>
              </div>

              {/* Features Section */}
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900">
                  <span className="p-2 ml-2 bg-green-100 rounded-lg">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </span>
                  مميزات المنتج
                </h3>

                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="أضف ميزة جديدة..."
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), handleAddFeature())
                      }
                    />
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="px-4 py-2 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
                    >
                      إضافة
                    </button>
                  </div>

                  <DraggableFeatureList
                    features={formData.features}
                    onReorder={(newFeatures) => {
                      setFormData((prev) => ({
                        ...prev,
                        features: newFeatures,
                      }));
                    }}
                    onRemove={handleRemoveFeature}
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Images */}
            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900">
                  <span className="p-2 ml-2 bg-purple-100 rounded-lg">
                    <svg
                      className="w-5 h-5 text-purple-600"
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
                  صور المنتج
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      إضافة صور جديدة
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      يمكنك اختيار عدة صور في نفس الوقت
                    </p>
                  </div>

                  {/* Current Images */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      الصور الحالية ({imagePreview.length})
                    </label>
                    <p className="mb-3 text-xs text-gray-500">
                      اسحب وأفلت الصور لإعادة ترتيبها. الصورة الأولى ستكون
                      الصورة الرئيسية.
                    </p>
                    <DraggableImageList
                      images={imagePreview}
                      onReorder={(newImages) => {
                        setImagePreview(newImages);
                        setFormData((prev) => ({
                          ...prev,
                          images: newImages,
                        }));
                      }}
                      onRemove={handleRemoveImage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end pt-6 mt-8 space-x-4 space-x-reverse border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="flex items-center px-6 py-3 text-white transition-colors rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              حفظ التغييرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
