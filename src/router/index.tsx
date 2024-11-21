/*
 * @Author: wb
 * @Date: 2024-10-31 14:59:59
 * @LastEditors: wb
 * @LastEditTime: 2024-11-20 10:24:10
 * @FilePath: \demo\src\router\index.tsx
 * @Description: 请填写简介
 */
// import App from "../App";
import Home from "../views/Home";
import Login from "../views/login";
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
// const About = lazy(() => import("../views/About/index"));
// const User = lazy(() => import("../views/User/index"));
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
  <React.Suspense fallback={<div>loading...</div>}>
    {comP}
  </React.Suspense>
);
const routes: IRoute[] = [
  setRoute("/", <Navigate to={"/login"} />),
  setRoute("/login", withLoadingComponent(<Login />)),
  setRoute("/", <Home />, [
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

    setRoute("*", <div>404</div>),
  ]),
];
export default routes;
