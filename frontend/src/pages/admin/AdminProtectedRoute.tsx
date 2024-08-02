import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AxiosInstance from "@/components/AxiosInstance";

interface AdminProtectedRouteProps {
  element: React.ReactElement;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({
  element,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("Token");

    if (token) {
      AxiosInstance.post("dashboard_admin/verify-token/", { token })
        .then(() => {
          setIsAuthenticated(true);
        })
        .catch(() => {
          setIsAuthenticated(false);
          localStorage.removeItem("Token");
        });
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? element : <Navigate to="/admin/signin" />;
};

export default AdminProtectedRoute;
