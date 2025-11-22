import { motion } from "framer-motion";
import useUsers from "./useUsers";
import { DotsLoader } from "react-loadly";

const UsersTab = () => {
  const { users, isLoading, isError, refetch } = useUsers();

  console.log(users);

  if (isLoading) {
    return (
      <DotsLoader
        size={20}
        color="#8e7ab5"
        speed={1.4}
        loaderCenter={true}
        count={3}
        borderwidth={4}
        secondaryColor="#8e7ab5"
      />
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">
          حدث خطأ أثناء جلب المستخدمين. الرجاء المحاولة مرة أخرى.
        </p>
      </div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-xl font-semibold text-gray-900">
        المستخدمين المسجلين
      </h2>

      {users.length === 0 ? (
        <p className="py-8 text-center text-gray-500">
          لا يوجد مستخدمين مسجلين
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                  الاسم
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                  البريد الإلكتروني
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                  رقم الهاتف
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                  تاريخ التسجيل
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {user.phone}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {new Date(user.createdAt).toLocaleDateString("ar-EG")}
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

export default UsersTab;
