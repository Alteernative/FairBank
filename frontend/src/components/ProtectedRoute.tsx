import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AxiosInstance from "@/components/AxiosInstance";
import { Loader2 } from "lucide-react";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("Token");

    if (token) {
      AxiosInstance.post("/login/user-verify-token/", { token })
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

  return isAuthenticated ? <>{children}</> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
