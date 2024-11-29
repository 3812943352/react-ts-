import React, { ReactElement, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { store } from "@/store/user/selector.tsx";

interface PrivateRouteProps {
  element?: ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const token = store.getState().token?.token;

  useEffect(() => {
    if (!token) {
      toast.warn("请先登录", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: false,
      });
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return element ? element : <Outlet />;
};

export default PrivateRoute;
