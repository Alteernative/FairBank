import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AxiosInstance from "@/components/AxiosInstance";
import { Loader2 } from "lucide-react";

type AdminProtectedRouteProps = {
  children: React.ReactElement;
};

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({
  children,
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
    return (
      <span className="flex h-screen w-screen items-center justify-center">
        <Loader2 size={50} className="animate-spin" />
      </span>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/signin" />;
};

export default AdminProtectedRoute;
