/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-25 14:03:20
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-15 11:26:27
 * @FilePath: src/router/PrivateRoute.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import React, { ReactElement, useEffect, useState } from "react";
import { matchPath, Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { store } from "@/store/user/selector.tsx";
import CustomLoading from "@/commponents/loading";

interface IRoute {
  path: string;
  element: React.ReactNode;
  children?: IRoute[];
}

interface PrivateRouteProps {
  element?: ReactElement;
  routes?: IRoute[];
}
const withLoadingComponent = (comP: JSX.Element) => (
  <React.Suspense fallback={<CustomLoading spinning={false} />}>
    {comP}
  </React.Suspense>
);
const filterRoutes = (
  menuRoute: IRoute[],
  authList: string[],
): IRoute[] => {
  const filteredItems: IRoute[] = [];
  menuRoute.forEach((item) => {
    if (item.children && item.children.length > 0) {
      const filteredChildren = item.children.filter((child) =>
        authList.includes(child.path as string),
      );
      if (filteredChildren.length > 0) {
        filteredItems.push({
          ...item,
          children: filteredChildren,
        });
      }
    } else if (authList.includes(item.path)) {
      filteredItems.push(item);
    }
  });
  return filteredItems;
};
const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element,
  routes,
}) => {
  const [appRoutes, setAppRoutes] = useState<IRoute[]>([]);
  const location = useLocation();
  const token = store.getState().token?.token;
  const authList = store.getState().outhList?.outhList || [];
  console.log(store.getState().outh?.outh);

  useEffect(() => {
    // Filter routes based on the current authList and update state
    const filteredRoutes = filterRoutes(routes || [], authList);
    setAppRoutes(filteredRoutes);
  }, [authList, routes]);

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

  const isAuthorized = appRoutes.some((route) => {
    if (route.children) {
      return route.children.some((child) =>
        matchPath({ path: child.path }, location.pathname),
      );
    }
    return matchPath({ path: route.path }, location.pathname);
  });

  if (!isAuthorized) {
    return <div>404</div>;
  }

  return element ? withLoadingComponent(element) : <div>404</div>;
};

export default PrivateRoute;
