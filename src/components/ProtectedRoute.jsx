import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isAdmin } = useAuth();

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (!adminOnly && !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;