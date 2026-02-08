import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-white text-center p-10">Loading...</div>;

  // 1. If not logged in, go to Login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // 2. If page is Admin Only, but user is NOT admin, go Home
  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/" />;
  }

  // 3. Otherwise, allow access
  return children;
};

export default ProtectedRoute;