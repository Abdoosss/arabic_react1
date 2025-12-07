# Dashboard Components

تم تقسيم صفحة الداش بورد إلى components منفصلة لتسهيل الصيانة والتطوير.

## الـ Components المتاحة:

### 1. DashboardHeader
- يعرض عنوان الداش بورد وزر تسجيل الخروج
- Props: `logout`

### 2. DashboardTabs
- يعرض التابات (الفئات، المستخدمين، الحجوزات، إلخ)
- Props: `activeTab`, `setActiveTab`

### 3. CategoriesTab
- إدارة الفئات (إضافة، تعديل، حذف)
- Props: `categories`, `products`, `handleAddCategory`, `handleEditCategory`, `handleDeleteCategory`

### 4. UsersTab
- عرض قائمة المستخدمين المسجلين
- Props: `users`

### 5. BookingsTab
- إدارة الحجوزات (عرض، تحديث الحالة، حذف)
- Props: `bookings`, `handleUpdateBookingStatus`, `handleDeleteBooking`

### 6. MessagesTab
- إدارة رسائل العملاء (عرض، تحديد كمقروءة، حذف، الرد)
- Props: `messages`, `handleMarkMessageAsRead`, `handleDeleteMessage`

### 7. ProductManagementTab
- إدارة المنتجات (عرض، إضافة، تعديل، حذف، معاينة)
- Props: `products`, `categories`, `handleAddProduct`, `handleDeleteProduct`, `setSelectedProductForEdit`, `setShowProductEditModal`, `setSelectedProductForPreview`, `setShowProductPreviewModal`

### 8. ProductPageTab
- إعدادات صفحة عرض المنتج (قسم الحجز، المميزات، معرض الصور، Breadcrumb)
- Props: `products`, `productPageSettings`, `setProductPageSettings`, `handleToggleProductPageSetting`, `setEditingContent`, `setShowContentModal`

### 9. ContentTab
- إدارة محتوى الموقع (Hero Slides، صفحة من نحن، الصفحة الرئيسية، التواصل، الفوتر، الهيدر)
- Props: `siteContent`, `handleEditContent`, `setShowHeroModal`

## الاستخدام:

```javascript
import {
    DashboardHeader,
    DashboardTabs,
    CategoriesTab,
    UsersTab,
    BookingsTab,
    MessagesTab,
    ProductManagementTab,
    ProductPageTab,
    ContentTab
} from '../components/dashboard';

// في الـ component الرئيسي:
<DashboardHeader logout={logout} />
<DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />

{activeTab === 'categories' && (
    <CategoriesTab
        categories={categories}
        products={products}
        handleAddCategory={handleAddCategory}
        handleEditCategory={handleEditCategory}
        handleDeleteCategory={handleDeleteCategory}
    />
)}
```

## ملاحظات:

- جميع الـ components تستخدم نفس الـ UI والـ styling من الملف الأصلي
- لم يتم تغيير أي لوجيك أو وظائف
- الـ handlers والـ modals لا تزال في الملف الرئيسي `Dashboard.jsx`
- يمكن استخدام هذه الـ components مباشرة بدون أي تعديلات

## الملف الأصلي:

الملف الأصلي `src/pages/Dashboard.jsx` لا يزال موجوداً ويعمل بشكل طبيعي.
الملف الجديد `src/pages/Dashboard_New.jsx` يوضح كيفية استخدام الـ components الجديدة.
