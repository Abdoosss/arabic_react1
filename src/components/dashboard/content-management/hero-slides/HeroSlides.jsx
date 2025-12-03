const HeroSlides = () => {
  return (
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
                onClick={() => handleEditContent(`hero-slide-${slide.id}`)}
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
  );
};

export default HeroSlides;
