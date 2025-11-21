import React from 'react';
import { motion } from 'framer-motion';

const ContentTab = ({ siteContent, handleEditContent, setShowHeroModal }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
        >
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">إدارة محتوى الموقع</h2>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => window.open('/', '_blank')}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                    >
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        معاينة الموقع
                    </button>
                    <div className="text-sm text-gray-500">
                        تحكم في جميع محتويات الموقع من مكان واحد
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center">
                        <span className="bg-blue-100 p-2 rounded-lg mr-3">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </span>
                        الصفحة الرئيسية - Hero Slides
                    </h3>
                    <button
                        onClick={() => setShowHeroModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        إدارة الـ Slides
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {siteContent.hero?.slides?.map((slide, index) => (
                        <div key={slide.id} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-medium text-blue-600">Slide {index + 1}</span>
                                <button
                                    onClick={() => handleEditContent(`hero-slide-${slide.id}`)}
                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                >
                                    تعديل
                                </button>
                            </div>
                            <div className="space-y-2 text-sm text-gray-600">
                                <p><strong>العنوان:</strong> {slide.title}</p>
                                <p><strong>العنوان الفرعي:</strong> {slide.subtitle ? slide.subtitle.substring(0, 30) + '...' : 'لا يوجد'}</p>
                                <p><strong>نص الزر:</strong> {slide.buttonText}</p>
                            </div>
                            {slide.backgroundImage && (
                                <img
                                    src={slide.backgroundImage}
                                    alt={`Hero Slide ${index + 1}`}
                                    className="w-full h-16 object-cover rounded mt-3"
                                />
                            )}
                        </div>
                    )) || (
                        <div className="col-span-full bg-gray-50 rounded-lg p-6 text-center">
                            <p className="text-gray-500">لا توجد slides</p>
                        </div>
                    )}
                </div>
            </div>

            {/* About Page Sections */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center mb-6">
                    <span className="bg-green-100 p-2 rounded-lg mr-3">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </span>
                    <h3 className="text-xl font-bold text-gray-900">صفحة من نحن</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-green-600 flex items-center">
                                <span className="mr-2">📋</span>
                                الهيدر
                            </span>
                            <button
                                onClick={() => handleEditContent('aboutHeader')}
                                className="text-green-600 hover:text-green-800 text-sm font-medium"
                            >
                                تعديل
                            </button>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p><strong>العنوان:</strong> {siteContent.about?.header?.title}</p>
                            <p><strong>العنوان الفرعي:</strong> {siteContent.about?.header?.subtitle ? siteContent.about.header.subtitle.substring(0, 30) + '...' : 'لا يوجد'}</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-4 border border-purple-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-purple-600 flex items-center">
                                <span className="mr-2">📖</span>
                                قصتنا
                            </span>
                            <button
                                onClick={() => handleEditContent('aboutStory')}
                                className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                            >
                                تعديل
                            </button>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p><strong>العنوان:</strong> {siteContent.about?.story?.title}</p>
                            <p><strong>المحتوى:</strong> {siteContent.about?.story?.content ? siteContent.about.story.content.substring(0, 40) + '...' : 'لا يوجد'}</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-4 border border-orange-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-orange-600 flex items-center">
                                <span className="mr-2">🛋️</span>
                                ماي بريك
                            </span>
                            <button
                                onClick={() => handleEditContent('aboutMyBreak')}
                                className="text-orange-600 hover:text-orange-800 text-sm font-medium"
                            >
                                تعديل
                            </button>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p><strong>العنوان:</strong> {siteContent.about?.myBreakSection?.title}</p>
                            <p><strong>العنوان الفرعي:</strong> {siteContent.about?.myBreakSection?.subtitle}</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-lg p-4 border border-red-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-red-600 flex items-center">
                                <span className="mr-2">🪑</span>
                                غسانكو
                            </span>
                            <button
                                onClick={() => handleEditContent('aboutGhassanko')}
                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                                تعديل
                            </button>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p><strong>العنوان:</strong> {siteContent.about?.ghassankoSection?.title}</p>
                            <p><strong>العنوان الفرعي:</strong> {siteContent.about?.ghassankoSection?.subtitle}</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-4 border border-teal-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-teal-600 flex items-center">
                                <span className="mr-2">⭐</span>
                                القيم
                            </span>
                            <button
                                onClick={() => handleEditContent('aboutValues')}
                                className="text-teal-600 hover:text-teal-800 text-sm font-medium"
                            >
                                تعديل
                            </button>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p><strong>العنوان:</strong> {siteContent.about?.values?.title}</p>
                            <div className="text-xs">
                                <p>• الجودة • الراحة • الابتكار</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg p-4 border border-pink-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-pink-600 flex items-center">
                                <span className="mr-2">🎯</span>
                                الدعوة للعمل
                            </span>
                            <button
                                onClick={() => handleEditContent('aboutCTA')}
                                className="text-pink-600 hover:text-pink-800 text-sm font-medium"
                            >
                                تعديل
                            </button>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p><strong>العنوان:</strong> {siteContent.about?.cta?.title}</p>
                            <p><strong>نص الزر:</strong> {siteContent.about?.cta?.buttonText}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Home Page Sections */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center mb-6">
                    <span className="bg-indigo-100 p-2 rounded-lg mr-3">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                        </svg>
                    </span>
                    <h3 className="text-xl font-bold text-gray-900">أقسام الصفحة الرئيسية</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-blue-600 flex items-center">
                                <span className="mr-2">🛋️</span>
                                قسم ماي بريك
                            </span>
                            <button
                                onClick={() => handleEditContent('myBreak')}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                                تعديل
                            </button>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p><strong>العنوان:</strong> {siteContent.myBreak?.title}</p>
                            <p><strong>العنوان الفرعي:</strong> {siteContent.myBreak?.subtitle}</p>
                            <p><strong>الوصف:</strong> {siteContent.myBreak?.description ? siteContent.myBreak.description.substring(0, 50) + '...' : 'لا يوجد'}</p>
                        </div>
                        {siteContent.myBreak?.image && (
                            <img
                                src={siteContent.myBreak.image}
                                alt="My Break"
                                className="w-full h-16 object-cover rounded mt-3"
                            />
                        )}
                    </div>

                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-amber-600 flex items-center">
                                <span className="mr-2">🪑</span>
                                قسم غسانكو
                            </span>
                            <button
                                onClick={() => handleEditContent('ghassanko')}
                                className="text-amber-600 hover:text-amber-800 text-sm font-medium"
                            >
                                تعديل
                            </button>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p><strong>العنوان:</strong> {siteContent.ghassanko?.title}</p>
                            <p><strong>العنوان الفرعي:</strong> {siteContent.ghassanko?.subtitle}</p>
                            <p><strong>الوصف:</strong> {siteContent.ghassanko?.description ? siteContent.ghassanko.description.substring(0, 50) + '...' : 'لا يوجد'}</p>
                        </div>
                        {siteContent.ghassanko?.image && (
                            <img
                                src={siteContent.ghassanko.image}
                                alt="Ghassanko"
                                className="w-full h-16 object-cover rounded mt-3"
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Contact & Footer Sections */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center mb-6">
                    <span className="bg-gray-100 p-2 rounded-lg mr-3">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </span>
                    <h3 className="text-xl font-bold text-gray-900">صفحة التواصل والفوتر</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-blue-600 flex items-center">
                                <span className="mr-2">📞</span>
                                صفحة التواصل
                            </span>
                            <button
                                onClick={() => handleEditContent('contact')}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                                تعديل
                            </button>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p><strong>العنوان:</strong> {siteContent.contact?.title}</p>
                            <p><strong>الهاتف:</strong> {siteContent.contact?.phone}</p>
                            <p><strong>البريد:</strong> {siteContent.contact?.email}</p>
                            <p><strong>العنوان:</strong> {siteContent.contact?.address}</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-gray-600 flex items-center">
                                <span className="mr-2">🦶</span>
                                الفوتر
                            </span>
                            <button
                                onClick={() => handleEditContent('footer')}
                                className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                            >
                                تعديل
                            </button>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p><strong>الوصف:</strong> {siteContent.footer?.description ? siteContent.footer.description.substring(0, 40) + '...' : 'لا يوجد'}</p>
                            <p><strong>الهاتف:</strong> {siteContent.footer?.phone}</p>
                            <p><strong>البريد:</strong> {siteContent.footer?.email}</p>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse mt-3">
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
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center mb-6">
                    <span className="bg-purple-100 p-2 rounded-lg mr-3">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </span>
                    <h3 className="text-xl font-bold text-gray-900">الهيدر وشريط التنقل</h3>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-purple-600 flex items-center">
                            <span className="mr-2">🏷️</span>
                            إعدادات اللوجو والهيدر
                        </span>
                        <button
                            onClick={() => handleEditContent('header')}
                            className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                        >
                            تعديل
                        </button>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                        <p><strong>نص اللوجو:</strong> {siteContent.header?.logoText}</p>
                        <p><strong>عرض النص:</strong> {siteContent.header?.showLogoText ? 'نعم' : 'لا'}</p>
                        <p><strong>عرض الصورة:</strong> {siteContent.header?.showLogoImage ? 'نعم' : 'لا'}</p>
                    </div>
                    {siteContent.header?.logoImage && (
                        <img
                            src={siteContent.header.logoImage}
                            alt="Logo"
                            className="w-full h-16 object-contain rounded mt-3 bg-white p-2"
                        />
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ContentTab;
