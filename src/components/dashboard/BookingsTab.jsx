import React from 'react';
import { motion } from 'framer-motion';

const BookingsTab = ({ bookings, handleUpdateBookingStatus, handleDeleteBooking }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <h2 className="text-xl font-semibold text-gray-900">الحجوزات</h2>

            {bookings.length === 0 ? (
                <p className="text-gray-500 text-center py-8">لا توجد حجوزات</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    المنتج
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    العميل
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    رقم الهاتف
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    الرسالة
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    الحالة
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    تاريخ الحجز
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    الإجراءات
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {bookings.map((booking) => (
                                <tr key={booking.id}>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        {booking.items ? (
                                            <div className="space-y-1">
                                                {booking.items.map((item, index) => (
                                                    <div key={index} className="text-xs">
                                                        {item.productName} × {item.quantity}
                                                    </div>
                                                ))}
                                                <div className="text-xs text-primary font-semibold">
                                                    المجموع: {booking.totalItems} قطعة
                                                </div>
                                            </div>
                                        ) : (
                                            booking.productName
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div>
                                            <div className="font-medium">{booking.customerName}</div>
                                            {booking.customerEmail && (
                                                <div className="text-xs text-gray-400">{booking.customerEmail}</div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {booking.phone}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                                        <div className="space-y-1">
                                            {booking.address && (
                                                <div className="text-xs">
                                                    <span className="font-medium">العنوان:</span> {booking.address}
                                                </div>
                                            )}
                                            {booking.message && (
                                                <div className="text-xs">
                                                    <span className="font-medium">ملاحظات:</span> {booking.message}
                                                </div>
                                            )}
                                            {!booking.address && !booking.message && 'لا توجد ملاحظات'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <select
                                            value={booking.status || 'pending'}
                                            onChange={(e) => handleUpdateBookingStatus(booking.id, e.target.value)}
                                            className="text-sm border border-gray-300 rounded px-2 py-1"
                                        >
                                            <option value="pending">في الانتظار</option>
                                            <option value="confirmed">مؤكد</option>
                                            <option value="completed">مكتمل</option>
                                            <option value="cancelled">ملغي</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div>
                                            <div>{new Date(booking.createdAt).toLocaleDateString('ar-EG')}</div>
                                            {booking.totalPrice && (
                                                <div className="text-xs text-primary font-semibold">
                                                    {new Intl.NumberFormat('ar-EG').format(booking.totalPrice)} جنيه
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button
                                            onClick={() => handleDeleteBooking(booking.id)}
                                            className="text-red-600 hover:text-red-900 transition-colors"
                                        >
                                            حذف
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </motion.div>
    );
};

export default BookingsTab;
