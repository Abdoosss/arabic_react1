import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import ImageManager from './ImageManager';

const ContentModal = ({ isOpen, content, onSave, onClose }) => {
    const [formData, setFormData] = useState({});
    const [images, setImages] = useState([]);
    const [logoImages, setLogoImages] = useState([]);

    useEffect(() => {
        if (content && content.data) {
            setFormData(content.data || {});
            
            // Initialize images array from existing image/backgroundImage
            const existingImage = content.data?.image || content.data?.backgroundImage;
            if (existingImage) {
                setImages([{
                    id: Date.now(),
                    url: existingImage,
                    name: 'صورة موجودة',
                    type: 'url'
                }]);
            } else {
                setImages([]);
            }

            // Initialize logo images
            const existingLogo = content.data?.logoImage;
            if (existingLogo) {
                setLogoImages([{
                    id: Date.now(),
                    url: existingLogo,
                    name: 'لوجو موجود',
                    type: 'url'
                }]);
            } else {
                setLogoImages([]);
            }
        }
    }, [content]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (content) {
            const updatedFormData = { ...formData };
            
            // Update image/backgroundImage from images array
            if (images.length > 0) {
                if (formData.backgroundImage !== undefined) {
                    updatedFormData.backgroundImage = images[0].url;
                    updatedFormData.images = images.map(img => img.url); // Store all images
                } else if (formData.image !== undefined) {
                    updatedFormData.image = images[0].url;
                    updatedFormData.images = images.map(img => img.url); // Store all images
                }
            }
            
            // Update logoImage from logoImages array
            if (logoImages.length > 0) {
                updatedFormData.logoImage = logoImages[0].url;
                updatedFormData.logoImages = logoImages.map(img => img.url); // Store all logo images
            }
            
            onSave(content.key, updatedFormData);
        }
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleImageChange = (field, e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                handleChange(field, e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    if (!content) return null;

    const getSectionTitle = (key) => {
        const titles = {
            hero: 'القسم الرئيسي (Hero)',
            myBreak: 'قسم ماي بريك',
            ghassanko: 'قسم غسانكو',
            about: 'صفحة من نحن',
            aboutHeader: 'من نحن - الهيدر',
            aboutStory: 'من نحن - قصتنا',
            aboutMyBreak: 'من نحن - ماي بريك',
            aboutGhassanko: 'من نحن - غسانكو',
            aboutValues: 'من نحن - القيم',
            aboutCTA: 'من نحن - الدعوة للعمل',
            contact: 'صفحة التواصل',
            footer: 'الفوتر',
            header: 'الهيدر (شريط التنقل)',
            bookingSection: 'قسم الحجز والتواصل',
            featuresSection: 'قسم المميزات',
            gallery: 'معرض الصور',
            breadcrumb: 'شريط التنقل (Breadcrumb)'
        };
        
        // Handle hero slides
        if (key.startsWith('hero-slide-')) {
            const slideId = key.replace('hero-slide-', '');
            return `تعديل Hero Slide ${slideId}`;
        }
        
        return titles[key] || 'تعديل المحتوى';
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`تعديل ${getSectionTitle(content.key)}`}>
            <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
                {/* Common fields */}
                {formData.title !== undefined && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            العنوان الرئيسي
                        </label>
                        <input
                            type="text"
                            value={formData.title || ''}
                            onChange={(e) => handleChange('title', e.target.value)}
                            className="input-field"
                        />
                    </div>
                )}

                {/* Hero slide specific fields */}
                {content?.isHeroSlide && formData.backgroundImage !== undefined && (
                    <ImageManager
                        images={images}
                        onImagesChange={setImages}
                        label="صور الخلفية"
                        multiple={true}
                        maxImages={5}
                    />
                )}

                {formData.subtitle !== undefined && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            العنوان الفرعي
                        </label>
                        <input
                            type="text"
                            value={formData.subtitle || ''}
                            onChange={(e) => handleChange('subtitle', e.target.value)}
                            className="input-field"
                        />
                    </div>
                )}

                {formData.description !== undefined && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            الوصف
                        </label>
                        <textarea
                            value={formData.description || ''}
                            onChange={(e) => handleChange('description', e.target.value)}
                            rows="4"
                            className="input-field"
                        />
                    </div>
                )}

                {formData.buttonText !== undefined && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            نص الزر
                        </label>
                        <input
                            type="text"
                            value={formData.buttonText || ''}
                            onChange={(e) => handleChange('buttonText', e.target.value)}
                            className="input-field"
                        />
                    </div>
                )}

                {/* About Values specific fields */}
                {content?.key === 'aboutValues' && formData.items && (
                    <div className="space-y-4">
                        <h4 className="font-medium text-gray-900">القيم والمبادئ</h4>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                الجودة - العنوان
                            </label>
                            <input
                                type="text"
                                value={formData.items?.quality?.title || ''}
                                onChange={(e) => handleChange('items', { 
                                    ...formData.items, 
                                    quality: { ...formData.items?.quality, title: e.target.value }
                                })}
                                className="input-field"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                الجودة - الوصف
                            </label>
                            <textarea
                                value={formData.items?.quality?.description || ''}
                                onChange={(e) => handleChange('items', { 
                                    ...formData.items, 
                                    quality: { ...formData.items?.quality, description: e.target.value }
                                })}
                                rows="3"
                                className="input-field"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                الراحة - العنوان
                            </label>
                            <input
                                type="text"
                                value={formData.items?.comfort?.title || ''}
                                onChange={(e) => handleChange('items', { 
                                    ...formData.items, 
                                    comfort: { ...formData.items?.comfort, title: e.target.value }
                                })}
                                className="input-field"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                الراحة - الوصف
                            </label>
                            <textarea
                                value={formData.items?.comfort?.description || ''}
                                onChange={(e) => handleChange('items', { 
                                    ...formData.items, 
                                    comfort: { ...formData.items?.comfort, description: e.target.value }
                                })}
                                rows="3"
                                className="input-field"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                الابتكار - العنوان
                            </label>
                            <input
                                type="text"
                                value={formData.items?.innovation?.title || ''}
                                onChange={(e) => handleChange('items', { 
                                    ...formData.items, 
                                    innovation: { ...formData.items?.innovation, title: e.target.value }
                                })}
                                className="input-field"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                الابتكار - الوصف
                            </label>
                            <textarea
                                value={formData.items?.innovation?.description || ''}
                                onChange={(e) => handleChange('items', { 
                                    ...formData.items, 
                                    innovation: { ...formData.items?.innovation, description: e.target.value }
                                })}
                                rows="3"
                                className="input-field"
                            />
                        </div>
                    </div>
                )}

                {/* About sections with features */}
                {(content?.key === 'aboutMyBreak' || content?.key === 'aboutGhassanko') && formData.features && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            المميزات (كل ميزة في سطر منفصل)
                        </label>
                        <textarea
                            value={formData.features?.join('\n') || ''}
                            onChange={(e) => handleChange('features', e.target.value.split('\n').filter(f => f.trim()))}
                            rows="4"
                            className="input-field"
                            placeholder="ميزة 1&#10;ميزة 2&#10;ميزة 3"
                        />
                    </div>
                )}

                {/* About CTA specific fields */}
                {content?.key === 'aboutCTA' && (
                    <>
                        {formData.secondaryButtonText !== undefined && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    نص الزر الثانوي
                                </label>
                                <input
                                    type="text"
                                    value={formData.secondaryButtonText || ''}
                                    onChange={(e) => handleChange('secondaryButtonText', e.target.value)}
                                    className="input-field"
                                />
                            </div>
                        )}
                    </>
                )}

                {/* About Story specific fields */}
                {content?.key === 'aboutStory' && formData.content !== undefined && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            محتوى القصة
                        </label>
                        <textarea
                            value={formData.content || ''}
                            onChange={(e) => handleChange('content', e.target.value)}
                            rows="4"
                            className="input-field"
                        />
                    </div>
                )}

                {/* Contact specific fields */}
                {formData.phone !== undefined && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            رقم الهاتف
                        </label>
                        <input
                            type="text"
                            value={formData.phone || ''}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            className="input-field"
                        />
                    </div>
                )}

                {formData.email !== undefined && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            البريد الإلكتروني
                        </label>
                        <input
                            type="email"
                            value={formData.email || ''}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className="input-field"
                        />
                    </div>
                )}

                {formData.address !== undefined && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            العنوان
                        </label>
                        <input
                            type="text"
                            value={formData.address || ''}
                            onChange={(e) => handleChange('address', e.target.value)}
                            className="input-field"
                        />
                    </div>
                )}

                {/* Header specific fields */}
                {formData.logoText !== undefined && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            نص اللوجو
                        </label>
                        <input
                            type="text"
                            value={formData.logoText || ''}
                            onChange={(e) => handleChange('logoText', e.target.value)}
                            className="input-field"
                        />
                    </div>
                )}

                {formData.showLogoText !== undefined && (
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={formData.showLogoText || false}
                            onChange={(e) => handleChange('showLogoText', e.target.checked)}
                            className="ml-2"
                        />
                        <label className="text-sm font-medium text-gray-700">
                            عرض نص اللوجو
                        </label>
                    </div>
                )}

                {formData.showLogoImage !== undefined && (
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={formData.showLogoImage || false}
                            onChange={(e) => handleChange('showLogoImage', e.target.checked)}
                            className="ml-2"
                        />
                        <label className="text-sm font-medium text-gray-700">
                            عرض صورة اللوجو
                        </label>
                    </div>
                )}

                {formData.logoImage !== undefined && (
                    <ImageManager
                        images={logoImages}
                        onImagesChange={setLogoImages}
                        label="صور اللوجو"
                        multiple={true}
                        maxImages={3}
                    />
                )}

                {/* Footer specific fields */}
                {formData.facebookUrl !== undefined && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            رابط الفيسبوك
                        </label>
                        <input
                            type="url"
                            value={formData.facebookUrl || ''}
                            onChange={(e) => handleChange('facebookUrl', e.target.value)}
                            className="input-field"
                        />
                    </div>
                )}

                {formData.instagramUrl !== undefined && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            رابط الانستجرام
                        </label>
                        <input
                            type="url"
                            value={formData.instagramUrl || ''}
                            onChange={(e) => handleChange('instagramUrl', e.target.value)}
                            className="input-field"
                        />
                    </div>
                )}

                {formData.whatsappUrl !== undefined && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            رابط الواتساب
                        </label>
                        <input
                            type="url"
                            value={formData.whatsappUrl || ''}
                            onChange={(e) => handleChange('whatsappUrl', e.target.value)}
                            className="input-field"
                        />
                    </div>
                )}

                {/* Contact page specific fields */}
                {formData.workingHours !== undefined && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            ساعات العمل
                        </label>
                        <input
                            type="text"
                            value={formData.workingHours || ''}
                            onChange={(e) => handleChange('workingHours', e.target.value)}
                            className="input-field"
                        />
                    </div>
                )}

                {formData.mapUrl !== undefined && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            رابط الخريطة (Google Maps Embed)
                        </label>
                        <textarea
                            value={formData.mapUrl || ''}
                            onChange={(e) => handleChange('mapUrl', e.target.value)}
                            rows="3"
                            className="input-field"
                            placeholder="https://www.google.com/maps/embed?pb=..."
                        />
                    </div>
                )}

                {formData.formTitle !== undefined && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            عنوان نموذج التواصل
                        </label>
                        <input
                            type="text"
                            value={formData.formTitle || ''}
                            onChange={(e) => handleChange('formTitle', e.target.value)}
                            className="input-field"
                        />
                    </div>
                )}

                {formData.formDescription !== undefined && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            وصف نموذج التواصل
                        </label>
                        <textarea
                            value={formData.formDescription || ''}
                            onChange={(e) => handleChange('formDescription', e.target.value)}
                            rows="3"
                            className="input-field"
                        />
                    </div>
                )}

                {/* Product Page Settings Fields */}
                {/* Booking Section Settings */}
                {content?.key === 'bookingSection' && (
                    <>
                        <div className="space-y-4">
                            <h4 className="font-medium text-gray-900 border-b pb-2">إعدادات قسم الحجز</h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.showBookingButton || false}
                                        onChange={(e) => handleChange('showBookingButton', e.target.checked)}
                                        className="ml-2"
                                    />
                                    <label className="text-sm font-medium text-gray-700">
                                        عرض زر الحجز
                                    </label>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.showWhatsAppButton || false}
                                        onChange={(e) => handleChange('showWhatsAppButton', e.target.checked)}
                                        className="ml-2"
                                    />
                                    <label className="text-sm font-medium text-gray-700">
                                        عرض زر الواتساب
                                    </label>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.showPhoneButton || false}
                                        onChange={(e) => handleChange('showPhoneButton', e.target.checked)}
                                        className="ml-2"
                                    />
                                    <label className="text-sm font-medium text-gray-700">
                                        عرض زر الاتصال
                                    </label>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.showAddToCartButton || false}
                                        onChange={(e) => handleChange('showAddToCartButton', e.target.checked)}
                                        className="ml-2"
                                    />
                                    <label className="text-sm font-medium text-gray-700">
                                        عرض زر إضافة للعربة
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    رقم الواتساب
                                </label>
                                <input
                                    type="text"
                                    value={formData.whatsappNumber || ''}
                                    onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                                    className="input-field"
                                    placeholder="201234567890"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    رقم الهاتف
                                </label>
                                <input
                                    type="text"
                                    value={formData.phoneNumber || ''}
                                    onChange={(e) => handleChange('phoneNumber', e.target.value)}
                                    className="input-field"
                                    placeholder="+201234567890"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    عنوان نموذج الحجز
                                </label>
                                <input
                                    type="text"
                                    value={formData.bookingFormTitle || ''}
                                    onChange={(e) => handleChange('bookingFormTitle', e.target.value)}
                                    className="input-field"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    وصف نموذج الحجز
                                </label>
                                <textarea
                                    value={formData.bookingFormDescription || ''}
                                    onChange={(e) => handleChange('bookingFormDescription', e.target.value)}
                                    rows="3"
                                    className="input-field"
                                />
                            </div>
                        </div>
                    </>
                )}

                {/* Features Section Settings */}
                {content?.key === 'featuresSection' && (
                    <>
                        <div className="space-y-4">
                            <h4 className="font-medium text-gray-900 border-b pb-2">إعدادات قسم المميزات</h4>
                            
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={formData.showFeatures || false}
                                    onChange={(e) => handleChange('showFeatures', e.target.checked)}
                                    className="ml-2"
                                />
                                <label className="text-sm font-medium text-gray-700">
                                    عرض قسم المميزات
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    مميزات إضافية (كل ميزة في سطر منفصل)
                                </label>
                                <textarea
                                    value={formData.customFeatures?.join('\n') || ''}
                                    onChange={(e) => handleChange('customFeatures', e.target.value.split('\n').filter(f => f.trim()))}
                                    rows="4"
                                    className="input-field"
                                    placeholder="ميزة إضافية 1&#10;ميزة إضافية 2&#10;ميزة إضافية 3"
                                />
                            </div>
                        </div>
                    </>
                )}

                {/* Gallery Settings */}
                {content?.key === 'gallery' && (
                    <>
                        <div className="space-y-4">
                            <h4 className="font-medium text-gray-900 border-b pb-2">إعدادات معرض الصور</h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.showThumbnails || false}
                                        onChange={(e) => handleChange('showThumbnails', e.target.checked)}
                                        className="ml-2"
                                    />
                                    <label className="text-sm font-medium text-gray-700">
                                        عرض الصور المصغرة
                                    </label>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.showNavigation || false}
                                        onChange={(e) => handleChange('showNavigation', e.target.checked)}
                                        className="ml-2"
                                    />
                                    <label className="text-sm font-medium text-gray-700">
                                        عرض أسهم التنقل
                                    </label>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.showPagination || false}
                                        onChange={(e) => handleChange('showPagination', e.target.checked)}
                                        className="ml-2"
                                    />
                                    <label className="text-sm font-medium text-gray-700">
                                        عرض نقاط التنقل
                                    </label>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.allowZoom || false}
                                        onChange={(e) => handleChange('allowZoom', e.target.checked)}
                                        className="ml-2"
                                    />
                                    <label className="text-sm font-medium text-gray-700">
                                        السماح بتكبير الصور
                                    </label>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Breadcrumb Settings */}
                {content?.key === 'breadcrumb' && (
                    <>
                        <div className="space-y-4">
                            <h4 className="font-medium text-gray-900 border-b pb-2">إعدادات شريط التنقل</h4>
                            
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={formData.showBreadcrumb || false}
                                    onChange={(e) => handleChange('showBreadcrumb', e.target.checked)}
                                    className="ml-2"
                                />
                                <label className="text-sm font-medium text-gray-700">
                                    عرض شريط التنقل
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    نص الرئيسية
                                </label>
                                <input
                                    type="text"
                                    value={formData.homeText || ''}
                                    onChange={(e) => handleChange('homeText', e.target.value)}
                                    className="input-field"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    نص المنتجات
                                </label>
                                <input
                                    type="text"
                                    value={formData.productsText || ''}
                                    onChange={(e) => handleChange('productsText', e.target.value)}
                                    className="input-field"
                                />
                            </div>
                        </div>
                    </>
                )}

                {/* Image fields */}
                {(formData.image !== undefined || formData.backgroundImage !== undefined) && !content?.isHeroSlide && (
                    <ImageManager
                        images={images}
                        onImagesChange={setImages}
                        label="الصور"
                        multiple={true}
                        maxImages={5}
                    />
                )}

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

export default ContentModal;