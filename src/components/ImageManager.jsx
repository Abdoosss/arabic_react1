import React, { useState, useRef } from 'react';

const ImageManager = ({ images = [], onImagesChange, label = "الصور", multiple = true, maxImages = 5 }) => {
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileSelect = (files) => {
        const fileArray = Array.from(files);
        const validFiles = fileArray.filter(file => file.type.startsWith('image/'));
        
        if (validFiles.length === 0) return;

        // Check if we exceed max images
        if (images.length + validFiles.length > maxImages) {
            alert(`يمكنك إضافة ${maxImages} صور كحد أقصى`);
            return;
        }

        validFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newImage = {
                    id: Date.now() + Math.random(),
                    url: e.target.result,
                    name: file.name,
                    type: 'file'
                };
                
                if (multiple) {
                    onImagesChange([...images, newImage]);
                } else {
                    onImagesChange([newImage]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const handleFileInputChange = (e) => {
        handleFileSelect(e.target.files);
        e.target.value = ''; // Reset input
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        handleFileSelect(e.dataTransfer.files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragOver(false);
    };

    const removeImage = (imageId) => {
        onImagesChange(images.filter(img => img.id !== imageId));
    };

    const [showUrlInput, setShowUrlInput] = useState(false);
    const [urlInput, setUrlInput] = useState('');

    const addUrlImage = () => {
        if (urlInput.trim()) {
            if (images.length >= maxImages) {
                alert(`يمكنك إضافة ${maxImages} صور كحد أقصى`);
                return;
            }

            const newImage = {
                id: Date.now() + Math.random(),
                url: urlInput.trim(),
                name: 'صورة من رابط',
                type: 'url'
            };
            
            if (multiple) {
                onImagesChange([...images, newImage]);
            } else {
                onImagesChange([newImage]);
            }
            
            setUrlInput('');
            setShowUrlInput(false);
        }
    };

    const moveImage = (fromIndex, toIndex) => {
        if (!multiple) return;
        
        const newImages = [...images];
        const [movedImage] = newImages.splice(fromIndex, 1);
        newImages.splice(toIndex, 0, movedImage);
        onImagesChange(newImages);
    };

    return (
        <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label} {multiple && `(${images.length}/${maxImages})`}
            </label>

            {/* Upload Area */}
            <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragOver 
                        ? 'border-blue-400 bg-blue-50' 
                        : 'border-gray-300 hover:border-gray-400'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                <div className="space-y-3">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div>
                        <p className="text-sm text-gray-600">
                            اسحب الصور هنا أو 
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="text-blue-600 hover:text-blue-500 font-medium mx-1"
                            >
                                اختر من الجهاز
                            </button>
                        </p>
                        <p className="text-xs text-gray-500">
                            PNG, JPG, GIF حتى 10MB
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowUrlInput(!showUrlInput)}
                        className="text-sm text-blue-600 hover:text-blue-800 underline"
                    >
                        أو أضف رابط صورة
                    </button>
                </div>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple={multiple}
                onChange={handleFileInputChange}
                className="hidden"
            />

            {/* URL Input */}
            {showUrlInput && (
                <div className="bg-gray-50 p-4 rounded-lg border">
                    <div className="flex space-x-2 space-x-reverse">
                        <input
                            type="url"
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onKeyPress={(e) => e.key === 'Enter' && addUrlImage()}
                        />
                        <button
                            type="button"
                            onClick={addUrlImage}
                            disabled={!urlInput.trim()}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            إضافة
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setShowUrlInput(false);
                                setUrlInput('');
                            }}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        >
                            إلغاء
                        </button>
                    </div>
                </div>
            )}

            {/* Images Grid */}
            {images.length > 0 && (
                <div className={`grid gap-4 ${multiple ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'}`}>
                    {images.map((image, index) => (
                        <div 
                            key={image.id} 
                            className="relative group cursor-move"
                            draggable={multiple}
                            onDragStart={(e) => {
                                e.dataTransfer.setData('text/plain', index.toString());
                            }}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                e.preventDefault();
                                const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
                                if (fromIndex !== index) {
                                    moveImage(fromIndex, index);
                                }
                            }}
                        >
                            <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden border-2 border-transparent group-hover:border-blue-300 transition-colors">
                                <img
                                    src={image.url}
                                    alt={image.name}
                                    className="w-full h-32 object-cover"
                                    onError={(e) => {
                                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPtiu2LfYoyDZgdmKINin2YTYtdmI2LHYqTwvdGV4dD48L3N2Zz4=';
                                    }}
                                />
                            </div>
                            
                            {/* Image Controls */}
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2 space-x-reverse">
                                    {/* Move Left */}
                                    {multiple && index > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => moveImage(index, index - 1)}
                                            className="bg-white text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
                                            title="تحريك لليسار"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                    )}
                                    
                                    {/* Move Right */}
                                    {multiple && index < images.length - 1 && (
                                        <button
                                            type="button"
                                            onClick={() => moveImage(index, index + 1)}
                                            className="bg-white text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
                                            title="تحريك لليمين"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    )}
                                    
                                    {/* Delete */}
                                    <button
                                        type="button"
                                        onClick={() => removeImage(image.id)}
                                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                        title="حذف الصورة"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            
                            {/* Image Info */}
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2 rounded-b-lg">
                                <p className="text-xs truncate">{image.name}</p>
                                <p className="text-xs text-gray-300">{image.type === 'url' ? 'رابط' : 'ملف'}</p>
                            </div>
                            
                            {/* Order Number */}
                            {multiple && (
                                <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                                    {index + 1}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Instructions */}
            {multiple && (
                <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium mb-1">تعليمات:</p>
                    <ul className="space-y-1">
                        <li>• يمكنك إضافة حتى {maxImages} صور</li>
                        <li>• اسحب الصور لإعادة ترتيبها أو استخدم الأسهم</li>
                        <li>• الصورة الأولى ستكون الصورة الرئيسية</li>
                        <li>• يمكنك حذف أي صورة بالضغط على أيقونة الحذف</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ImageManager;