import { motion } from "framer-motion";

import HeroSlides from "./hero-slides/HeroSlides";

const ContentTab = ({ siteContent, handleEditContent, setShowHeroModal }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">إدارة محتوى الموقع</h2>
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
      <HeroSlides />

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
          <h3 className="text-xl font-bold text-gray-900">صفحة من نحن</h3>
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
                <strong>العنوان:</strong> {siteContent.about?.header?.title}
              </p>
              <p>
                <strong>العنوان الفرعي:</strong>{" "}
                {siteContent.about?.header?.subtitle
                  ? siteContent.about.header.subtitle.substring(0, 30) + "..."
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
                <strong>العنوان:</strong> {siteContent.about?.story?.title}
              </p>
              <p>
                <strong>المحتوى:</strong>{" "}
                {siteContent.about?.story?.content
                  ? siteContent.about.story.content.substring(0, 40) + "..."
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
                <strong>العنوان:</strong> {siteContent.about?.values?.title}
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
                <strong>العنوان:</strong> {siteContent.about?.cta?.title}
              </p>
              <p>
                <strong>نص الزر:</strong> {siteContent.about?.cta?.buttonText}
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
                <strong>العنوان الفرعي:</strong> {siteContent.myBreak?.subtitle}
              </p>
              <p>
                <strong>الوصف:</strong>{" "}
                {siteContent.myBreak?.description
                  ? siteContent.myBreak.description.substring(0, 50) + "..."
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
                <strong>العنوان:</strong> {siteContent.ghassanko?.title}
              </p>
              <p>
                <strong>العنوان الفرعي:</strong>{" "}
                {siteContent.ghassanko?.subtitle}
              </p>
              <p>
                <strong>الوصف:</strong>{" "}
                {siteContent.ghassanko?.description
                  ? siteContent.ghassanko.description.substring(0, 50) + "..."
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
                <strong>العنوان:</strong> {siteContent.contact?.address}
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
                  ? siteContent.footer.description.substring(0, 40) + "..."
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
              <span className="text-xs text-gray-500">السوشال ميديا:</span>
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
              <strong>نص اللوجو:</strong> {siteContent.header?.logoText}
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
  );
};

export default ContentTab;
