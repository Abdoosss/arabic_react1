import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Modal from './Modal';

const HeroSlidesModal = ({ isOpen, slides, onSave, onClose }) => {
  const [slidesData, setSlidesData] = useState([]);

  useEffect(() => {
    if (slides) {
      setSlidesData(slides);
    }
  }, [slides]);

  const handleAddSlide = () => {
    const newSlide = {
      id: Date.now(),
      title: '',
      subtitle: '',
      buttonText: 'تسوق الآن',
      backgroundImage: ''
    };
    setSlidesData([...slidesData, newSlide]);
  };

  const handleDeleteSlide = (slideId) => {
    if (slidesData.length <= 1) {
      toast.error('يجب أن يحتوي Hero على slide واحد على الأقل');
      return;
    }
    setSlidesData(slidesData.filter(slide => slide.id !== slideId));
  };

  const handleSlideChange = (slideId, field, value) => {
    setSlidesData(slidesData.map(slide =>
      slide.id === slideId ? { ...slide, [field]: value } : slide
    ));
  };

  const handleImageChange = (slideId, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleSlideChange(slideId, 'backgroundImage', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate slides
    const invalidSlides = slidesData.filter(slide => !slide.title || !slide.subtitle);
    if (invalidSlides.length > 0) {
      toast.error('يرجى ملء العنوان والعنوان الفرعي لجميع الـ slides');
      return;
    }

    onSave(slidesData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="تعديل Hero Slides">
      <form onSubmit={handleSubmit} className="space-y-6 max-h-96 overflow-y-auto">
        {slidesData.map((slide, index) => (
          <div key={slide.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">Slide {index + 1}</h4>
              {slidesData.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleDeleteSlide(slide.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  حذف
                </button>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                العنوان *
              </label>
              <input
                type="text"
                value={slide.title}
                onChange={(e) => handleSlideChange(slide.id, 'title', e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                العنوان الفرعي *
              </label>
              <textarea
                value={slide.subtitle}
                onChange={(e) => handleSlideChange(slide.id, 'subtitle', e.target.value)}
                rows="2"
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                نص الزر
              </label>
              <input
                type="text"
                value={slide.buttonText}
                onChange={(e) => handleSlideChange(slide.id, 'buttonText', e.target.value)}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                صورة الخلفية
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(slide.id, e)}
                className="input-field"
              />
              <input
                type="url"
                value={slide.backgroundImage}
                onChange={(e) => handleSlideChange(slide.id, 'backgroundImage', e.target.value)}
                className="input-field mt-2"
                placeholder="أو أدخل رابط الصورة"
              />
              {slide.backgroundImage && (
                <img
                  src={slide.backgroundImage}
                  alt={`Slide ${index + 1} Preview`}
                  className="w-full h-32 object-cover rounded mt-2"
                />
              )}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddSlide}
          className="w-full btn-secondary"
        >
          إضافة Slide جديد
        </button>

        <div className="flex space-x-3 space-x-reverse pt-4">
          <button
            type="submit"
            className="flex-1 btn-primary"
          >
            حفظ التغييرات
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

export default HeroSlidesModal;