import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const Hero = () => {
  const myBreakSlides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=1000&fit=crop",
      title: "ماي بريك",
      subtitle: "الراحة والفخامة",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=1000&fit=crop",
      title: "ماي بريك",
      subtitle: "تصاميم عصرية",
    },
  ];

  const ghassankoSlides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&h=1000&fit=crop",
      title: "غسانكو",
      subtitle: "الأناقة الكلاسيكية",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&h=1000&fit=crop",
      title: "غسانكو",
      subtitle: "حرفية متقنة",
    },
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="grid h-full grid-cols-1 md:grid-cols-2">
        {/* My Break Section - Left Side */}
        <div className="relative h-full group">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop
            className="h-full"
          >
            {myBreakSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="relative h-full">
                  <div
                    className="absolute inset-0 transition-transform duration-700 transform bg-center bg-cover group-hover:scale-105"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/60 to-black/50"></div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Content Overlay */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 text-center"
            >
              <div className="space-y-4">
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block px-4 py-1 text-sm font-semibold rounded-full bg-white/20 backdrop-blur-sm"
                >
                  الراحة والاسترخاء
                </motion.span>
                <h2 className="text-5xl font-bold md:text-6xl lg:text-7xl">
                  ماي بريك
                </h2>
                <p className="mt-4 text-xl md:text-2xl text-white/90">
                  تجربة استثنائية في عالم الراحة
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <Link
                  to="/products?category=My Break"
                  className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold transition-all duration-300 transform bg-white shadow-2xl group/btn text-primary rounded-xl hover:bg-primary hover:text-white hover:scale-105"
                >
                  استكشف المجموعة
                  <svg
                    className="w-5 h-5 transition-transform group-hover/btn:translate-x-1"
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
              </div>
            </motion.div>
          </div>

          {/* Decorative Border */}
          <div className="absolute top-0 bottom-0 left-0 hidden w-1 bg-gradient-to-b from-transparent via-white/50 to-transparent md:block"></div>
        </div>

        {/* Ghassanko Section - Right Side */}
        <div className="relative h-full group">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            loop
            className="h-full"
          >
            {ghassankoSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="relative h-full">
                  <div
                    className="absolute inset-0 transition-transform duration-700 transform bg-center bg-cover group-hover:scale-105"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-bl from-amber-900/60 to-black/50"></div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Content Overlay */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 text-center"
            >
              <div className="space-y-2">
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-block px-4 py-1 text-sm font-semibold rounded-full bg-white/20 backdrop-blur-sm"
                >
                  الأناقة الكلاسيكية
                </motion.span>
                <h2 className="text-5xl font-bold md:text-6xl lg:text-7xl">
                  غسانكو
                </h2>
                <p className="text-xl md:text-2xl text-white/90">
                  حرفية عالية وتصاميم خالدة
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <Link
                  to="/products?category=Ghassanko"
                  className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold transition-all duration-300 transform bg-white shadow-2xl group/btn text-amber-900 rounded-xl hover:bg-amber-900 hover:text-white hover:scale-105"
                >
                  استكشف المجموعة
                  <svg
                    className="w-5 h-5 transition-transform group-hover/btn:translate-x-1"
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
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
