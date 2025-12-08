import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const Hero = () => {
  // Use direct paths for images
  const myBreakSlides = [
    {
      id: 1,
      image: new URL("../assets/my break/1230113.jpg", import.meta.url).href,
      title: "ماي بريك",
      subtitle: "الراحة والفخامة"
    },
    {
      id: 2,
      image: new URL("../assets/my break/1e0eafa9-2d93-4f7b-8d71-893fdeae8d52.jpg", import.meta.url).href,
      title: "ماي بريك",
      subtitle: "تصاميم عصرية"
    },
    {
      id: 3,
      image: new URL("../assets/my break/ChatGPT Image Jun 22, 2025, 07_53_27 PM.jpg", import.meta.url).href,
      title: "ماي بريك",
      subtitle: "جودة استثنائية"
    },
  ];

  const ghassankoSlides = [
    {
      id: 1,
      image: new URL("../assets/ghassanko/ChatGPT Image Oct 13, 2025, 08_33_08 PM.png", import.meta.url).href,
      title: "غسانكو",
      subtitle: "الأناقة الكلاسيكية"
    },
    {
      id: 2,
      image: new URL("../assets/ghassanko/gemini-2.5-flash-image-preview (nano-banana)_a_ضع_هذا_الاثاث_في_منز (1).png", import.meta.url).href,
      title: "غسانكو",
      subtitle: "حرفية متقنة"
    },
    {
      id: 3,
      image: new URL("../assets/ghassanko/gemini-2.5-flash-image-preview (nano-banana)_a_ضع_هذا_الاثاث_في_منز (7).png", import.meta.url).href,
      title: "غسانكو",
      subtitle: "تصاميم خالدة"
    },
    {
      id: 4,
      image: new URL("../assets/ghassanko/gemini-2.5-flash-image-preview (nano-banana)_a_ضع_هذا_الاثاث_في_منز.png", import.meta.url).href,
      title: "غسانكو",
      subtitle: "فخامة كلاسيكية"
    },
    {
      id: 5,
      image: new URL("../assets/ghassanko/gemini-2.5-flash-image-preview (nano-banana)_a_ضع_هذه_الكراسي_في_من.png", import.meta.url).href,
      title: "غسانكو",
      subtitle: "تصاميم راقية"
    },
    {
      id: 6,
      image: new URL("../assets/ghassanko/gemini-2.5-flash-image-preview (nano-banana)_a_ضع_هذه_الكنبة_في_منز (1).png", import.meta.url).href,
      title: "غسانكو",
      subtitle: "أثاث فاخر"
    },
    {
      id: 7,
      image: new URL("../assets/ghassanko/gemini-2.5-flash-image-preview (nano-banana)_a_ضع_هذه_الكنبة_في_منز.png", import.meta.url).href,
      title: "غسانكو",
      subtitle: "جودة عالية"
    },
    {
      id: 8,
      image: new URL("../assets/ghassanko/gemini-2.5-flash-image-preview (nano-banana)_a_ضعها_في_منزل_به_ديكو (1).png", import.meta.url).href,
      title: "غسانكو",
      subtitle: "إبداع وتميز"
    },
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        {/* My Break Section - Left Side */}
        <div className="relative h-full group">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: false
            }}
            loop={true}
            speed={800}
            className="h-full"
          >
            {myBreakSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="relative h-full">
                  <div
                    className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/60 to-black/50"></div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Content Overlay */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white p-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-8"
            >
              <div className="space-y-4">
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-semibold"
                >
                  الراحة والاسترخاء
                </motion.span>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold">
                  ماي بريك
                </h2>
                <p className="text-xl md:text-2xl text-white/90 mt-4">
                  تجربة استثنائية في عالم الراحة
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <Link
                  to="/products?category=My Break"
                  className="group/btn bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary hover:text-white transition-all duration-300 shadow-2xl transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  استكشف المجموعة
                  <svg
                    className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform"
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
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-white/50 to-transparent hidden md:block"></div>
        </div>

        {/* Ghassanko Section - Right Side */}
        <div className="relative h-full group">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: false
            }}
            loop={true}
            speed={800}
            className="h-full"
          >
            {ghassankoSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="relative h-full">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-bl from-amber-900/60 to-black/50"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Content Overlay */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white p-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center space-y-6"
            >
              <div className="space-y-2">
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-semibold"
                >
                  الأناقة الكلاسيكية
                </motion.span>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold">
                  غسانكو
                </h2>
                <p className="text-xl md:text-2xl text-white/90">
                  حرفية عالية وتصاميم خالدة
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <Link
                  to="/products?category=Ghassanko"
                  className="group/btn bg-white text-amber-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-900 hover:text-white transition-all duration-300 shadow-2xl transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  استكشف المجموعة
                  <svg
                    className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform"
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
