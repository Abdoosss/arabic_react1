import React from "react";
import { motion } from "framer-motion";
import useMessages from "./useMessages";

const MessagesTab = () => {
  const { messages, isLoading, isError, refetch } = useMessages();

  // const handleMarkMessageAsRead = async (messageId) => {
  //   try {
  //     await fetch(`/api/messages/${messageId}/mark-as-read`, {
  //       method: "POST",
  //     });
  //     refetch();
  //   } catch (error) {
  //     console.error("Error marking message as read:", error);
  //   }
  // };

  // const handleDeleteMessage = async (messageId) => {
  //   if (!window.confirm("هل أنت متأكد من حذف هذه الرسالة؟")) return;
  //   try {
  //     await fetch(`/api/messages/${messageId}`, {
  //       method: "DELETE",
  //     });
  //     refetch();
  //   } catch (error) {
  //     console.error("Error deleting message:", error);
  //   }
  // };

  if (isLoading) {
    return (
      <p className="py-8 text-center text-gray-500">جاري تحميل الرسائل...</p>
    );
  }
  if (isError) {
    return (
      <p className="py-8 text-center text-red-500">
        حدث خطأ أثناء تحميل الرسائل. يرجى المحاولة مرة أخرى لاحقًا.
      </p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-xl font-semibold text-gray-900">رسائل العملاء</h2>

      {messages.length === 0 ? (
        <p className="py-8 text-center text-gray-500">لا توجد رسائل</p>
      ) : (
        <div className="space-y-4">
          {/* Statistics */}
          <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
            <div className="p-4 rounded-lg bg-blue-50">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="mr-4">
                  <p className="text-sm font-medium text-gray-600">
                    إجمالي الرسائل
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {messages.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-green-50">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="mr-4">
                  <p className="text-sm font-medium text-gray-600">
                    الرسائل المقروءة
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {messages.filter((m) => m.isRead).length}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-orange-50">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="mr-4">
                  <p className="text-sm font-medium text-gray-600">
                    رسائل جديدة
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {messages.filter((m) => !m.isRead).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Messages List */}
          <div className="space-y-4">
            {messages
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((message) => (
                <div
                  key={message._id}
                  className={`bg-white rounded-lg shadow-md p-6 border-r-4 ${
                    message.isRead ? "border-gray-300" : "border-blue-500"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          message.isRead ? "bg-gray-300" : "bg-blue-500"
                        }`}
                      ></div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {message.name}
                        </h3>
                        <p className="text-sm text-gray-500">{message.email}</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(message.createdAt).toLocaleDateString("ar-EG", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <svg
                        className="w-4 h-4 ml-2 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span className="text-sm text-gray-600">
                        {message.phone}
                      </span>
                    </div>
                    <div className="p-4 rounded-lg bg-gray-50">
                      <p className="leading-relaxed text-gray-700">
                        {message.message}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2 space-x-reverse">
                      {!message.isRead && (
                        <button
                          onClick={() => handleMarkMessageAsRead(message.id)}
                          className="flex items-center px-4 py-2 text-sm text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
                        >
                          <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          تحديد كمقروءة
                        </button>
                      )}
                      <a
                        href={`mailto:${message.email}?subject=رد على رسالتك&body=مرحباً ${message.name}،%0A%0Aشكراً لتواصلك معنا...`}
                        className="flex items-center px-4 py-2 text-sm text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600"
                      >
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        رد بالإيميل
                      </a>
                      <a
                        href={`https://wa.me/${message.phone.replace(
                          /[^0-9]/g,
                          ""
                        )}?text=مرحباً ${message.name}، شكراً لتواصلك معنا`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2 text-sm text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
                      >
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.905 3.488" />
                        </svg>
                        رد بالواتساب
                      </a>
                    </div>
                    <button
                      onClick={() => handleDeleteMessage(message.id)}
                      className="flex items-center text-red-600 transition-colors hover:text-red-800"
                    >
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      حذف
                    </button>
                  </div>

                  {message.isRead && message.readAt && (
                    <div className="pt-3 mt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-500">
                        تم قراءة الرسالة في:{" "}
                        {new Date(message.readAt).toLocaleDateString("ar-EG", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MessagesTab;
