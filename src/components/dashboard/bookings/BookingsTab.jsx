import React from "react";
import { motion } from "framer-motion";
import useBookings from "./useBookings";
import useUpdateBooking from "./useUpdateBooking";
import Loading from "../../Loading";
import { toast } from "react-toastify";

const BookingsTab = () => {
  const { bookings, isLoading, isError, refetch } = useBookings();
  const { updateBooking, isUpdating } = useUpdateBooking();

  const handleUpdateBookingStatus = (bookingId, newStatus) => {
    try {
      updateBooking(
        { bookingId, updatedData: { status: newStatus } },
        {
          onSuccess: () => {
            toast.success("تم تحديث حالة الحجز بنجاح");
            // refetch local list to reflect changes immediately (query invalidation also happens in the hook)
            refetch();
          },
          onError: (error) => {
            toast.error("فشل في تحديث حالة الحجز");
            console.error("Failed to update booking status:", error);
          },
        }
      );
    } catch (error) {
      console.error("Failed to update booking status:", error);
    }
  };

  // Safe stub for delete action to avoid runtime errors until a delete service exists.
  const handleDeleteBooking = (bookingId) => {
    // TODO: implement delete with a bookingServices.deleteBooking if/when available
    // For now just log and refetch to keep UI stable
    console.log("Delete booking not implemented yet:", bookingId);
    // Optionally refetch to ensure UI is up-to-date
    // refetch();
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <p className="py-8 text-center text-red-500">
        حدث خطأ أثناء جلب الحجوزات.
      </p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-xl font-semibold text-gray-900">الحجوزات</h2>

      {bookings.length === 0 ? (
        <p className="py-8 text-center text-gray-500">لا توجد حجوزات</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                  المنتج
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                  العميل
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                  رقم الهاتف
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                  الرسالة
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                  الحالة
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                  تاريخ الحجز
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {booking.items ? (
                      <div className="space-y-1">
                        {booking.items.map((item, index) => (
                          <div key={index} className="text-xs">
                            {item.product?.name || "Unknown Product"}×{" "}
                            {item.quantity}
                          </div>
                        ))}
                        <div className="text-xs font-semibold text-primary">
                          المجموع: {booking.itemsCount} قطعة
                        </div>
                      </div>
                    ) : (
                      booking.productName
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    <div>
                      <div className="font-medium">{booking.name}</div>
                      {booking.user.email && (
                        <div className="text-xs text-gray-400">
                          {booking.user.email}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {booking.phone}
                  </td>
                  <td className="max-w-xs px-6 py-4 text-sm text-gray-500">
                    <div className="space-y-1">
                      {booking.address && (
                        <div className="text-xs">
                          <span className="font-medium">العنوان:</span>{" "}
                          {booking.address}
                        </div>
                      )}
                      {booking.message && (
                        <div className="text-xs">
                          <span className="font-medium">ملاحظات:</span>{" "}
                          {booking.message}
                        </div>
                      )}
                      {!booking.address &&
                        !booking.message &&
                        "لا توجد ملاحظات"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={booking.status}
                      onChange={(e) =>
                        handleUpdateBookingStatus(booking._id, e.target.value)
                      }
                      disabled={isUpdating}
                      className="px-2 py-1 text-sm border border-gray-300 rounded"
                    >
                      <option value="waiting">في الانتظار</option>
                      <option value="confirmed">مؤكد</option>
                      <option value="completed">مكتمل</option>
                      <option value="cancelled">ملغي</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    <div>
                      <div>
                        {new Date(booking.createdAt).toLocaleDateString(
                          "ar-EG"
                        )}
                      </div>
                      {booking.totalPrice && (
                        <div className="text-xs font-semibold text-primary">
                          {new Intl.NumberFormat("ar-EG").format(
                            booking.totalPrice
                          )}{" "}
                          جنيه
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap">
                    <button
                      onClick={() => handleDeleteBooking(booking._id)}
                      className="text-red-600 transition-colors hover:text-red-900"
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
