/*
 * @Author: wb
 * @Date: 2024-10-31 14:59:59
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-15 11:13:53
 * @FilePath: src/router/index.tsx
 * @Description: 请填写简介
 */
import Home from "../views/Home";
import Login from "../views/login";
import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import CustomLoading from "@/commponents/loading";
import PrivateRoute from "@/router/PrivateRoute.tsx";

const Page1 = lazy(() => import("../views/Page1/index"));
const Page2 = lazy(() => import("../views/Page2/index"));
const Page3 = lazy(() => import("../views/Page3/index"));
const Page4 = lazy(() => import("../views/Page4/index"));
const Page5 = lazy(() => import("../views/Page5/index"));
const Page6 = lazy(() => import("../views/Page6/index"));
const Page7 = lazy(() => import("../views/Page7/index"));
const Page8 = lazy(() => import("../views/Page8/index"));
const Page9 = lazy(() => import("../views/Page9/index"));
const Page10 = lazy(() => import("../views/Page10/index"));
const Page11 = lazy(() => import("../views/Page11/index"));
const Page12 = lazy(() => import("../views/Page12/index"));
const Page13 = lazy(() => import("../views/Page13/index"));
const Page14 = lazy(() => import("../views/Page14/index"));

const Ban = lazy(() => import("../views/ban/index"));

interface IRoute {
  path: string;
  element: React.ReactNode;
  children?: IRoute[];
}

function setRoute(
  path: string,
  element: React.ReactNode,
  children?: IRoute[],
): IRoute {
  return {
    path,
    element,
    children,
  } as IRoute;
}

const withLoadingComponent = (comP: JSX.Element) => (
  <React.Suspense fallback={<CustomLoading spinning={false} />}>
    {comP}
  </React.Suspense>
);
const menuRoutes: IRoute[] = [
  setRoute("/", <PrivateRoute element={<Home />} />, [
    setRoute("/ban", withLoadingComponent(<Ban />)),
    setRoute("/page1", withLoadingComponent(<Page1 />)),
    setRoute("/page2", withLoadingComponent(<Page2 />)),
    setRoute("/department/page3", withLoadingComponent(<Page3 />)),
    setRoute("/area/page4", withLoadingComponent(<Page4 />)),
    setRoute("/req/page5", withLoadingComponent(<Page5 />)),
    setRoute("/supervision/page6", withLoadingComponent(<Page6 />)),
    setRoute("/data/page7", withLoadingComponent(<Page7 />)),
    setRoute("/data/page8", withLoadingComponent(<Page8 />)),
    setRoute("/user/page9", withLoadingComponent(<Page9 />)),
    setRoute("/user/page10", withLoadingComponent(<Page10 />)),
    setRoute("/supervision/page11", withLoadingComponent(<Page11 />)),
    setRoute("/supervision/page12", withLoadingComponent(<Page12 />)),
    setRoute("/user/page13", withLoadingComponent(<Page13 />)),
    setRoute("/user/page14", withLoadingComponent(<Page14 />)),
  ]),
];
const routes: IRoute[] = [
  setRoute("/", <Navigate to={"/login"} />),
  setRoute("/login", withLoadingComponent(<Login />)),
  setRoute(
    "/",
    <PrivateRoute element={<Home />} routes={menuRoutes} />,
    [
      setRoute("/ban", withLoadingComponent(<Ban />)),
      // setRoute("/", <Home />, [
      setRoute("/page1", withLoadingComponent(<Page1 />)),
      setRoute("/page2", withLoadingComponent(<Page2 />)),
      setRoute("/department/page3", withLoadingComponent(<Page3 />)),
      setRoute("/area/page4", withLoadingComponent(<Page4 />)),
      setRoute("/req/page5", withLoadingComponent(<Page5 />)),
      setRoute("/supervision/page6", withLoadingComponent(<Page6 />)),
      setRoute("/data/page7", withLoadingComponent(<Page7 />)),
      setRoute("/data/page8", withLoadingComponent(<Page8 />)),
      setRoute("/user/page9", withLoadingComponent(<Page9 />)),
      setRoute("/user/page10", withLoadingComponent(<Page10 />)),
      setRoute(
        "/supervision/page11",
        withLoadingComponent(<Page11 />),
      ),
      setRoute(
        "/supervision/page12",
        withLoadingComponent(<Page12 />),
      ),
      setRoute("/user/page13", withLoadingComponent(<Page13 />)),
      setRoute("/user/page14", withLoadingComponent(<Page14 />)),
    ],
  ),
  setRoute("*", <div>404</div>),
];
export default routes;
