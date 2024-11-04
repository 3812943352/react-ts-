/*
 * @Author: wb
 * @Date: 2024-10-31 14:59:59
 * @LastEditors: wb
 * @LastEditTime: 2024-11-04 09:25:44
 * @FilePath: \demo\src\router\index.tsx
 * @Description: 请填写简介
 */
// import App from "../App";
import Home from "../views/Home";
// import About from "../views/About";
// import User from "../views/User";
import React, { lazy } from "react";
import {
  //   BrowserRouter,
  //   Route,
  //   Routes,
  Navigate,
} from "react-router-dom";

// import path from "path";
//旧写法
// const baseRouter: React.FC = () => (
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<App />}>
//         <Route path="/" element={<Navigate to="/home" />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/about" element={<About />} />
//       </Route>
//     </Routes>
//   </BrowserRouter>
// );
// export default baseRouter;
const About = lazy(() => import("../views/About/index"));
const User = lazy(() => import("../views/User/index"));
const Page1 = lazy(() => import("../views//Page1/index"));
const Page2 = lazy(() => import("../views//Page2/index"));

interface IRoute {
  path: string;
  element: React.ReactNode;
  children?: IRoute[];
}
const withLoadingComponent = (comP: JSX.Element) => (
  <React.Suspense fallback={<div>loading...</div>}>
    {comP}
  </React.Suspense>
);
const routes: IRoute[] = [
  {
    path: "/",
    element: <Navigate to={"/page1"} />,
  },
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/page1",
        element: withLoadingComponent(<Page1 />),
      },
      {
        path: "/page2",
        element: withLoadingComponent(<Page2 />),
      },
    ],
  },
  //   {
  //     path: "/home",
  //     element: <Home />,
  //   },
  //   {
  //     path: "/about",
  //     element: withLoadingComponent(<About />),
  //   },
  //   {
  //     path: "/user",
  //     element: withLoadingComponent(<User />),
  //   },
  {
    path: "*",
    element: <div>404</div>,
  },
];
export default routes;
