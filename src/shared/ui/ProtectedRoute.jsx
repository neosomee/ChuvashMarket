import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROUTES } from "../constants";

export const ProtectedRoute = ({
  children,
  requireAuth = true,
  requireRole = null,
  roleDeniedElement = null,
}) => {
  const { isAuthenticated, user } = useAuth();

  // Проверка аутентификации
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // Проверка роли
  if (requireRole && user?.role !== requireRole) {
    if (roleDeniedElement) return roleDeniedElement;
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children;
};
