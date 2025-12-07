import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("يرجى تسجيل الدخول لإضافة منتجات إلى العربة");
      return;
    }
    addToCart(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="overflow-hidden card group"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="object-cover w-full h-64 transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 transition-all duration-300 bg-black bg-opacity-0 group-hover:bg-opacity-20"></div>

        {product.featured && (
          <div className="absolute px-3 py-1 text-sm font-medium text-white rounded-full top-4 right-4 bg-primary">
            مميز
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="px-2 py-1 text-sm text-gray-500 bg-gray-100 rounded">
            {product.category.name}
          </span>
          <span className="text-lg font-bold text-primary">
            {product.price} جنيه
          </span>
        </div>

        <h3 className="mb-3 text-xl font-semibold text-gray-800 transition-colors group-hover:text-primary">
          {product.name}
        </h3>

        <p className="mb-4 text-gray-600 line-clamp-2">{product.description}</p>

        <div className="flex items-center gap-2">
          <Link
            to={`/product/${product._id}`}
            className="flex-1 text-sm text-center btn-secondary"
          >
            عرض التفاصيل
          </Link>
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center px-4 py-2 text-sm btn-primary"
            title="أضف للعربة"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
