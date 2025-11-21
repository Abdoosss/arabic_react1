import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Hero = () => {
  const defaultSlides = [
    {
      id: 1,
      backgroundImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop',
      title: 'مرحباً بكم في عالم ماي بريك',
      subtitle: 'اكتشف أجمل مجموعة من الكنب والكراسي الفاخرة',
      buttonText: 'تسوق الآن'
    },
    {
      id: 2,
      backgroundImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=600&fit=crop',
      title: 'راحة لا مثيل لها',
      subtitle: 'كراسي لايزي بوي بأحدث التقنيات والتصاميم العصرية',
      buttonText: 'اكتشف المزيد'
    },
    {
      id: 3,
      backgroundImage: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&h=600&fit=crop',
      title: 'غسانكو للأثاث الكلاسيكي',
      subtitle: 'قطع أثاث أنيقة تضفي لمسة من الفخامة على منزلك',
      buttonText: 'استكشف المجموعة'
    }
  ];

  const [heroSlides, setHeroSlides] = useState(defaultSlides);

  useEffect(() => {
    // Load hero slides from localStorage
    const savedContent = JSON.parse(localStorage.getItem('siteContent') || '{}');
    if (savedContent.hero && savedContent.hero.slides) {
      setHeroSlides(savedContent.hero.slides);
    }

    // Listen for changes in localStorage
    const handleStorageChange = (e) => {
      if (e.key === 'siteContent') {
        const newContent = JSON.parse(e.newValue || '{}');
        if (newContent.hero && newContent.hero.slides) {
          setHeroSlides(newContent.hero.slides);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="relative h-screen">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        className="h-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.backgroundImage})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              </div>
              
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="text-center text-white max-w-4xl mx-auto px-4">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-bold mb-6"
                  >
                    {slide.title}
                  </motion.h1>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl mb-8 leading-relaxed"
                  >
                    {slide.subtitle}
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <Link
                      to="/products"
                      className="inline-block bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                      {slide.buttonText}
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white z-20"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">اكتشف المزيد</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;