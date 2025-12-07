import React, { useState } from 'react';

const DraggableImageList = ({ images, onReorder, onRemove }) => {
    const [draggedIndex, setDraggedIndex] = useState(null);

    const handleDragStart = (e, index) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e, dropIndex) => {
        e.preventDefault();
        
        if (draggedIndex === null || draggedIndex === dropIndex) {
            setDraggedIndex(null);
            return;
        }

        const newImages = [...images];
        const draggedImage = newImages[draggedIndex];
        
        // Remove the dragged item
        newImages.splice(draggedIndex, 1);
        
        // Insert at new position
        newImages.splice(dropIndex, 0, draggedImage);
        
        onReorder(newImages);
        setDraggedIndex(null);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    return (
        <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto custom-scrollbar">
            {images.map((url, index) => (
                <div
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`relative group cursor-move transition-all duration-200 ${
                        draggedIndex === index ? 'opacity-50 scale-95' : 'hover:scale-105'
                    }`}
                >
                    <img
                        src={url}
                        alt={`صورة ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border"
                        draggable={false}
                    />
                    
                    {/* Drag Handle */}
                    <div className="absolute top-1 left-1 bg-gray-800 bg-opacity-70 text-white rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                        </svg>
                    </div>
                    
                    {/* Remove Button */}
                    <button
                        type="button"
                        onClick={() => onRemove(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    
                    {/* Main Image Badge */}
                    {index === 0 && (
                        <div className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                            الصورة الرئيسية
                        </div>
                    )}
                    
                    {/* Order Number */}
                    <div className="absolute bottom-1 right-1 bg-gray-800 bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {index + 1}
                    </div>
                </div>
            ))}
            
            {images.length === 0 && (
                <div className="col-span-2 text-center py-8 text-gray-500">
                    <svg className="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm">لا توجد صور</p>
                    <p className="text-xs text-gray-400 mt-1">اسحب وأفلت الصور لإعادة ترتيبها</p>
                </div>
            )}
        </div>
    );
};

export default DraggableImageList;