// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import AxiosInstance from "@/components/AxiosInstance";

// interface ProtectedRouteProps {
//   element: React.ReactElement;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

//   useEffect(() => {
//     const token = localStorage.getItem("Token");

//     if (token) {
//       AxiosInstance.post("/login/user-verify-token/", { token })
//         .then(() => {
//           setIsAuthenticated(true);
//         })
//         .catch(() => {
//           setIsAuthenticated(false);
//           localStorage.removeItem("Token");
//         });
//     } else {
//       setIsAuthenticated(false);
//     }
//   }, []);

//   if (isAuthenticated === null) {
//     return <div>Loading...</div>;
//   }

//   return isAuthenticated ? element : <Navigate to="/signin" />;
// };

// export default ProtectedRoute;
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AxiosInstance from "@/components/AxiosInstance";

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
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
