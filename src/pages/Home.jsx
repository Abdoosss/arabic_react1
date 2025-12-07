import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";

import { API } from "../utils/api";
import useProducts from "../hooks/products/useProducts";

const Home = () => {
  const [siteContent, setSiteContent] = useState({});
  const { products } = useProducts();
  const [myBreakProducts, setMyBreakProducts] = useState([]);
  const [ghassankoProducts, setGhassankoProducts] = useState([]);

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

    // Load site content from localStorage
    const savedContent = JSON.parse(
      localStorage.getItem("siteContent") || "{}"
    );
    const defaultContent = {
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
    };
    setSiteContent(deepMerge(defaultContent, savedContent));

    // Listen for changes in localStorage
    const handleStorageChange = (e) => {
      if (e.key === "siteContent") {
        const newContent = JSON.parse(e.newValue || "{}");
        setSiteContent(deepMerge(defaultContent, newContent));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <Hero />

      {/* Featured Products */}
      <section className="relative py-16 overflow-hidden md:py-24 bg-gradient-to-b from-gray-50 to-white">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full w-72 h-72 bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 rounded-full w-96 h-96 bg-primary/5 blur-3xl"></div>

        <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="px-6 py-2 text-sm font-semibold rounded-full bg-primary/10 text-primary">
                ✨ منتجات مميزة
              </span>
            </motion.div>
            <h2 className="mb-6 text-4xl font-bold text-transparent text-gray-900 md:text-5xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
              منتجاتنا المميزة
            </h2>
            <p className="max-w-2xl mx-auto text-xl leading-relaxed text-gray-600">
              اكتشف مجموعتنا المختارة من أجود قطع الأثاث التي تجمع بين الراحة
              والأناقة
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {products.slice(0, 3).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} index={index} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 text-lg transition-all duration-300 transform shadow-lg btn-primary hover:shadow-xl hover:-translate-y-1"
            >
              عرض جميع المنتجات
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* My Break Section */}
      <section className="relative py-16 overflow-hidden md:py-24">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, #000 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          ></div>
        </div>

        <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2 md:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-primary to-primary/70"
                >
                  {siteContent.myBreak?.subtitle || "الراحة والاسترخاء"}
                </motion.span>
                <h2 className="mb-6 text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl">
                  {siteContent.myBreak?.title || "مجموعة ماي بريك"}
                </h2>
              </div>

              <p className="text-lg leading-relaxed text-gray-600 md:text-xl">
                {siteContent.myBreak?.description ||
                  "تجربة استثنائية في عالم الراحة والاسترخاء. كنبنا وكراسي اللايزي بوي مصممة بأحدث التقنيات لتوفر لك أقصى درجات الراحة والفخامة في منزلك."}
              </p>

              <div className="space-y-4">
                {[
                  "جلد طبيعي فاخر 100%",
                  "تقنيات مساج متطورة",
                  "ضمان 5 سنوات",
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 p-4 transition-shadow bg-white shadow-sm rounded-xl hover:shadow-md"
                  >
                    <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-primary/10">
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Link
                  to="/products?category=My Break"
                  className="inline-flex items-center gap-2 px-8 py-4 text-lg transition-all duration-300 transform shadow-lg btn-primary hover:shadow-xl hover:-translate-y-1"
                >
                  {siteContent.myBreak?.buttonText || "استكشف مجموعة ماي بريك"}
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {myBreakProducts.slice(0, 4).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden transition-all duration-300 shadow-lg group rounded-2xl hover:shadow-2xl"
                >
                  <div className="overflow-hidden aspect-square">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-end transition-all duration-300 opacity-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:opacity-100">
                    <div className="p-4 text-white transition-transform duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <h4 className="mb-1 text-lg font-bold">{product.name}</h4>
                      <p className="text-sm font-semibold text-primary-light">
                        {product.price} جنيه
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ghassanko Section */}
      <section className="relative py-16 overflow-hidden md:py-24 bg-gradient-to-b from-white to-gray-50">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, #000 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          ></div>
        </div>

        <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2 md:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="grid grid-cols-2 gap-4">
                {ghassankoProducts.slice(0, 4).map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden transition-all duration-300 shadow-lg group rounded-2xl hover:shadow-2xl"
                  >
                    <div className="overflow-hidden aspect-square">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-end transition-all duration-300 opacity-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:opacity-100">
                      <div className="p-4 text-white transition-transform duration-300 transform translate-y-4 group-hover:translate-y-0">
                        <h4 className="mb-1 text-lg font-bold">
                          {product.name}
                        </h4>
                        <p className="text-sm font-semibold text-primary-light">
                          {product.price} جنيه
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="order-1 space-y-6 lg:order-2"
            >
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-primary to-primary/70"
                >
                  {siteContent.ghassanko?.subtitle || "الأناقة الكلاسيكية"}
                </motion.span>
                <h2 className="mb-6 text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl">
                  {siteContent.ghassanko?.title || "مجموعة غسانكو"}
                </h2>
              </div>

              <p className="text-lg leading-relaxed text-gray-600 md:text-xl">
                {siteContent.ghassanko?.description ||
                  "الأناقة الكلاسيكية تلتقي بالحرفية العالية. مجموعة غسانكو تقدم قطع أثاث كلاسيكية مصنوعة من أجود أنواع الخشب الطبيعي لتضفي لمسة من الفخامة على منزلك."}
              </p>

              <div className="space-y-4">
                {[
                  "خشب طبيعي عالي الجودة",
                  "تصاميم كلاسيكية أنيقة",
                  "حرفية يدوية متقنة",
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 p-4 transition-shadow bg-white shadow-sm rounded-xl hover:shadow-md"
                  >
                    <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-primary/10">
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Link
                  to="/products?category=Ghassanko"
                  className="inline-flex items-center gap-2 px-8 py-4 text-lg transition-all duration-300 transform shadow-lg btn-secondary hover:shadow-xl hover:-translate-y-1"
                >
                  {siteContent.ghassanko?.buttonText || "استكشف مجموعة غسانكو"}
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden md:py-28 bg-gradient-to-br from-primary via-primary to-primary/90">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-64 h-64 bg-white rounded-full top-10 left-10 blur-3xl animate-pulse"></div>
          <div
            className="absolute bg-white rounded-full bottom-10 right-10 w-96 h-96 blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative z-10 max-w-5xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <div className="px-6 py-2 mb-6 text-sm font-semibold text-white rounded-full bg-white/20 backdrop-blur-sm">
                🎉 عروض خاصة متاحة الآن
              </div>
            </motion.div>

            <h2 className="mb-6 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              جاهز لتجديد منزلك؟
            </h2>

            <p className="max-w-3xl mx-auto text-xl leading-relaxed md:text-2xl text-white/90">
              تواصل معنا اليوم واحصل على استشارة مجانية لاختيار الأثاث المناسب
              لمنزلك
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center gap-4 pt-4 sm:flex-row"
            >
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 px-10 py-4 text-lg font-bold transition-all duration-300 transform bg-white shadow-xl group text-primary rounded-xl hover:bg-gray-50 hover:shadow-2xl hover:-translate-y-1"
              >
                تواصل معنا
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </Link>
              <Link
                to="/products"
                className="flex items-center justify-center gap-2 px-10 py-4 text-lg font-bold text-white transition-all duration-300 transform border-white shadow-xl group border-3 rounded-xl hover:bg-white hover:text-primary hover:shadow-2xl hover:-translate-y-1"
              >
                تصفح المنتجات
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
