import React, { useState } from 'react';

const DraggableFeatureList = ({ features, onReorder, onRemove }) => {
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

        const newFeatures = [...features];
        const draggedFeature = newFeatures[draggedIndex];
        
        // Remove the dragged item
        newFeatures.splice(draggedIndex, 1);
        
        // Insert at new position
        newFeatures.splice(dropIndex, 0, draggedFeature);
        
        onReorder(newFeatures);
        setDraggedIndex(null);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    return (
        <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
            {features.map((feature, index) => (
                <div
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`flex items-center justify-between bg-white p-3 rounded-lg border cursor-move transition-all duration-200 ${
                        draggedIndex === index ? 'opacity-50 scale-95 bg-gray-50' : 'hover:shadow-md hover:border-blue-300'
                    }`}
                >
                    <span className="text-sm text-gray-700 flex items-center flex-1">
                        {/* Drag Handle */}
                        <div className="text-gray-400 hover:text-gray-600 ml-2 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                            </svg>
                        </div>
                        
                        {/* Check Icon */}
                        <svg className="w-4 h-4 text-green-500 ml-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        
                        {/* Feature Text */}
                        <span className="flex-1">{feature}</span>
                        
                        {/* Order Number */}
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full ml-2">
                            {index + 1}
                        </span>
                    </span>
                    
                    {/* Remove Button */}
                    <button
                        type="button"
                        onClick={() => onRemove(index)}
                        className="text-red-500 hover:text-red-700 transition-colors p-1 hover:bg-red-50 rounded"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            ))}
            
            {features.length === 0 && (
                <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <p className="text-sm font-medium">لا توجد مميزات مضافة</p>
                    <p className="text-xs text-gray-400 mt-1">أضف مميزات واسحبها لإعادة ترتيبها</p>
                </div>
            )}
        </div>
    );
};

export default DraggableFeatureList;