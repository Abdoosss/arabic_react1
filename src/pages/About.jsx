import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const [siteContent, setSiteContent] = useState({});

  useEffect(() => {
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
      about: {
        header: {
          title: 'من نحن',
          subtitle: 'نحن شركة رائدة في مجال الأثاث المنزلي الفاخر',
          description: 'نجمع بين الحرفية التقليدية والتصاميم العصرية لنقدم لك أجود قطع الأثاث التي تناسب ذوقك وتلبي احتياجاتك'
        },
        story: {
          title: 'قصتنا',
          content: 'بدأت رحلتنا منذ أكثر من 20 عاماً بحلم بسيط: تقديم أثاث عالي الجودة يجمع بين الراحة والأناقة والمتانة. من ورشة صغيرة إلى شركة رائدة في السوق المصري.',
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop'
        }
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {siteContent.about?.header?.title || 'من نحن'}
          </h1>
          {siteContent.about?.header?.subtitle && (
            <h2 className="text-2xl text-primary font-semibold mb-4">
              {siteContent.about.header.subtitle}
            </h2>
          )}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {siteContent.about?.header?.description || 'نجمع بين الحرفية التقليدية والتصاميم العصرية لنقدم لك أجود قطع الأثاث التي تناسب ذوقك وتلبي احتياجاتك'}
          </p>
        </motion.div>

        {/* Our Story */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {siteContent.about?.story?.title || 'قصتنا'}
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  {siteContent.about?.story?.content || 'بدأت رحلتنا منذ أكثر من 20 عاماً بحلم بسيط: تقديم أثاث عالي الجودة يجمع بين الراحة والأناقة والمتانة. من ورشة صغيرة إلى شركة رائدة في السوق المصري.'}
                </p>
                <p>
                  نؤمن بأن الأثاث ليس مجرد قطع توضع في المنزل، بل هو جزء من حياتك اليومية 
                  يؤثر على راحتك وسعادتك. لذلك نحرص على اختيار أجود المواد والعمل مع أمهر الحرفيين.
                </p>
                <p>
                  اليوم، نفخر بتقديم مجموعتين متميزتين: "ماي بريك" للأثاث العصري المريح، 
                  و"غسانكو" للأثاث الكلاسيكي الأنيق.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop"
                alt="قصتنا"
                className="rounded-lg shadow-lg w-full"
              />
              <div className="absolute inset-0 bg-primary bg-opacity-10 rounded-lg"></div>
            </div>
          </div>
        </motion.section>

        {/* My Break Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop"
                  alt="مجموعة ماي بريك"
                  className="rounded-lg shadow-md w-full"
                />
              </div>
              <div className="order-1 lg:order-2">
                <div className="text-primary text-lg font-semibold mb-2">مجموعة ماي بريك</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  الراحة والاسترخاء
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    مجموعة "ماي بريك" هي تجسيد لمفهوم الراحة الحقيقية. كنبنا وكراسي اللايزي بوي 
                    مصممة بأحدث التقنيات لتوفر لك تجربة استرخاء لا مثيل لها.
                  </p>
                  <p>
                    نستخدم أجود أنواع الجلد الطبيعي والأقمشة المقاومة للبقع، مع تقنيات المساج المتطورة 
                    والتحكم الكهربائي لضمان أقصى درجات الراحة.
                  </p>
                </div>
                <ul className="mt-6 space-y-3">
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
              </div>
            </div>
          </div>
        </motion.section>

        {/* Ghassanko Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=400&fit=crop"
                  alt="مجموعة غسانكو"
                  className="rounded-lg shadow-md w-full"
                />
              </div>
              <div>
                <div className="text-primary text-lg font-semibold mb-2">مجموعة غسانكو</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  الأناقة الكلاسيكية
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    مجموعة "غسانكو" تجسد الأناقة الكلاسيكية والحرفية التقليدية. قطع أثاث مصنوعة 
                    من أجود أنواع الخشب الطبيعي بتصاميم خالدة تضفي لمسة من الفخامة على منزلك.
                  </p>
                  <p>
                    كل قطعة في مجموعة غسانكو مصنوعة يدوياً بعناية فائقة، مع الاهتمام بأدق التفاصيل 
                    لضمان الجودة والمتانة التي تدوم لأجيال.
                  </p>
                </div>
                <ul className="mt-6 space-y-3">
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
                    حرفية يدوية متقنة
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-primary ml-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    تصاميم كلاسيكية خالدة
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Values */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              قيمنا ومبادئنا
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              نؤمن بمجموعة من القيم التي توجه عملنا وتضمن رضا عملائنا
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">الجودة</h3>
              <p className="text-gray-600">
                نحرص على استخدام أجود المواد والعمل مع أمهر الحرفيين لضمان أعلى معايير الجودة
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">الراحة</h3>
              <p className="text-gray-600">
                راحة عملائنا هي أولويتنا، نصمم كل قطعة لتوفر أقصى درجات الراحة والاسترخاء
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">الابتكار</h3>
              <p className="text-gray-600">
                نواكب أحدث التقنيات والتصاميم لنقدم منتجات مبتكرة تلبي احتياجات العصر
              </p>
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-primary rounded-lg p-8 md:p-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">
            جاهز لتجربة الفرق؟
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            زر معرضنا اليوم واكتشف مجموعتنا الكاملة من الأثاث الفاخر
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              تواصل معنا
            </a>
            <a
              href="/products"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
            >
              تصفح المنتجات
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;