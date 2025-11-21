import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';
import { API } from '../utils/api';

const Home = () => {
  const [siteContent, setSiteContent] = useState({});
  const [allProducts, setAllProducts] = useState(productsData);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [myBreakProducts, setMyBreakProducts] = useState([]);
  const [ghassankoProducts, setGhassankoProducts] = useState([]);

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await fetch(API.allProducts);
        if (response.ok) {
          const data = await response.json();
          const products = data.products || productsData;
          setAllProducts(products);
          setFeaturedProducts(products.filter(product => product.featured));
          setMyBreakProducts(products.filter(product => product.category === 'My Break'));
          setGhassankoProducts(products.filter(product => product.category === 'Ghassanko'));
        } else {
          // Fallback to local data
          setAllProducts(productsData);
          setFeaturedProducts(productsData.filter(product => product.featured));
          setMyBreakProducts(productsData.filter(product => product.category === 'My Break'));
          setGhassankoProducts(productsData.filter(product => product.category === 'Ghassanko'));
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to local data
        setAllProducts(productsData);
        setFeaturedProducts(productsData.filter(product => product.featured));
        setMyBreakProducts(productsData.filter(product => product.category === 'My Break'));
        setGhassankoProducts(productsData.filter(product => product.category === 'Ghassanko'));
      }
    };

    fetchProducts();

    // Deep merge helper
    const deepMerge = (target, source) => {
      const output = { ...target };
      if (target && source && typeof target === 'object' && typeof source === 'object' && !Array.isArray(target) && !Array.isArray(source)) {
        Object.keys(source).forEach(key => {
          if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
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
    const savedContent = JSON.parse(localStorage.getItem('siteContent') || '{}');
    const defaultContent = {
      myBreak: {
        title: 'مجموعة ماي بريك',
        subtitle: 'الراحة والاسترخاء',
        description: 'تجربة استثنائية في عالم الراحة والاسترخاء. كنبنا وكراسي اللايزي بوي مصممة بأحدث التقنيات لتوفر لك أقصى درجات الراحة والفخامة في منزلك.',
        buttonText: 'استكشف مجموعة ماي بريك',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop'
      },
      ghassanko: {
        title: 'مجموعة غسانكو',
        subtitle: 'الأناقة الكلاسيكية',
        description: 'الأناقة الكلاسيكية تلتقي بالحرفية العالية. مجموعة غسانكو تقدم قطع أثاث كلاسيكية مصنوعة من أجود أنواع الخشب الطبيعي لتضفي لمسة من الفخامة على منزلك.',
        buttonText: 'استكشف مجموعة غسانكو',
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=400&fit=crop'
      }
    };
    setSiteContent(deepMerge(defaultContent, savedContent));

    // Listen for changes in localStorage
    const handleStorageChange = (e) => {
      if (e.key === 'siteContent') {
        const newContent = JSON.parse(e.newValue || '{}');
        setSiteContent(deepMerge(defaultContent, newContent));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Hero Section */}
      <Hero />

      {/* Featured Products */}
      <section className="py-8 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              منتجاتنا المميزة
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              اكتشف مجموعتنا المختارة من أجود قطع الأثاث التي تجمع بين الراحة والأناقة
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link to="/products" className="btn-primary text-lg">
              عرض جميع المنتجات
            </Link>
          </motion.div>
        </div>
      </section>

      {/* My Break Section */}
      <section className="py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                {siteContent.myBreak?.title || 'مجموعة ماي بريك'}
              </h2>
              {siteContent.myBreak?.subtitle && (
                <h3 className="text-xl text-primary font-semibold mb-4">
                  {siteContent.myBreak.subtitle}
                </h3>
              )}
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {siteContent.myBreak?.description || 'تجربة استثنائية في عالم الراحة والاسترخاء. كنبنا وكراسي اللايزي بوي مصممة بأحدث التقنيات لتوفر لك أقصى درجات الراحة والفخامة في منزلك.'}
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary ml-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  جلد طبيعي فاخر 100%
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary ml-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  تقنيات مساج متطورة
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary ml-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  ضمان 5 سنوات
                </li>
              </ul>
              <Link to="/products?category=My Break" className="btn-primary">
                {siteContent.myBreak?.buttonText || 'استكشف مجموعة ماي بريك'}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-2 md:gap-4"
            >
              {myBreakProducts.slice(0, 4).map((product, index) => (
                <div key={product.id} className="relative group overflow-hidden rounded-lg">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
                    <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h4 className="font-semibold">{product.name}</h4>
                      <p className="text-sm opacity-90">{product.price} جنيه</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ghassanko Section */}
      <section className="py-8 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="grid grid-cols-2 gap-4">
                {ghassankoProducts.slice(0, 2).map((product, index) => (
                  <div key={product.id} className="relative group overflow-hidden rounded-lg">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
                      <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h4 className="font-semibold">{product.name}</h4>
                        <p className="text-sm opacity-90">{product.price} جنيه</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                {siteContent.ghassanko?.title || 'مجموعة غسانكو'}
              </h2>
              {siteContent.ghassanko?.subtitle && (
                <h3 className="text-xl text-primary font-semibold mb-4">
                  {siteContent.ghassanko.subtitle}
                </h3>
              )}
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {siteContent.ghassanko?.description || 'الأناقة الكلاسيكية تلتقي بالحرفية العالية. مجموعة غسانكو تقدم قطع أثاث كلاسيكية مصنوعة من أجود أنواع الخشب الطبيعي لتضفي لمسة من الفخامة على منزلك.'}
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary ml-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  خشب طبيعي عالي الجودة
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary ml-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  تصاميم كلاسيكية أنيقة
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary ml-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  حرفية يدوية متقنة
                </li>
              </ul>
              <Link to="/products?category=Ghassanko" className="btn-secondary">
                {siteContent.ghassanko?.buttonText || 'استكشف مجموعة غسانكو'}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6">
              جاهز لتجديد منزلك؟
            </h2>
            <p className="text-xl text-white opacity-90 mb-8">
              تواصل معنا اليوم واحصل على استشارة مجانية لاختيار الأثاث المناسب لمنزلك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                تواصل معنا
              </Link>
              <Link
                to="/products"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
              >
                تصفح المنتجات
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;