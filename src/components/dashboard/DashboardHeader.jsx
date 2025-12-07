import React from "react";
import { motion } from "framer-motion";

const DashboardHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 mb-8 bg-white rounded-lg shadow-lg"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم</h1>
      </div>
    </motion.div>
  );
};

export default DashboardHeader;
