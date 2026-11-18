import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Lưu lại trang đang truy cập để quay lại sau khi đăng nhập
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
