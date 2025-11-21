import React from 'react';
import { motion } from 'framer-motion';

const DashboardHeader = ({ logout }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم</h1>
                <button
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                    تسجيل خروج
                </button>
            </div>
        </motion.div>
    );
};

export default DashboardHeader;
