// src/components/ui/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const ProtectedRoute = () => {
  const { userRole } = useAppContext();

  if (!userRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;