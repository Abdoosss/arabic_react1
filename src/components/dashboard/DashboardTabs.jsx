import React from 'react';

const DashboardTabs = ({ activeTab, setActiveTab }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg mb-8">
            <div className="border-b border-gray-200">
                <nav className="flex space-x-8 space-x-reverse px-6">
                    <button
                        onClick={() => setActiveTab('categories')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'categories'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        إدارة الفئات
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'users'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        المستخدمين
                    </button>
                    <button
                        onClick={() => setActiveTab('bookings')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'bookings'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        الحجوزات
                    </button>
                    <button
                        onClick={() => setActiveTab('messages')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'messages'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        الرسائل
                    </button>
                    <button
                        onClick={() => setActiveTab('product-management')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'product-management'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        إدارة المنتجات
                    </button>
                    <button
                        onClick={() => setActiveTab('product-page')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'product-page'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        صفحة المنتج
                    </button>
                    <button
                        onClick={() => setActiveTab('content')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'content'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        إدارة المحتوى
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default DashboardTabs;
