/*
 * @Author: wb
 * @Date: 2024-10-28 14:23:24
 * @LastEditors: wb
 * @LastEditTime: 2024-11-21 11:26:28
 * @FilePath: src/App.tsx
 * @Description: 请填写简介
 */
// import { useState } from 'react'
import "@/input.css";
// import Comp1 from "@/commponents/Comp1/index";
// import Comp2 from "@/commponents/Comp2/index";
// import { Button } from "antd";
// import { UpOutlined } from "@ant-design/icons";
import { useRoutes } from "react-router-dom";
import router from "./router";
import { ToastContainer } from "react-toastify";
import React from "react";

const App: React.FC = () => {
  const outlet = useRoutes(router);

  return (
    <div className="App select-none bg-white">
      {outlet}
      <ToastContainer />
    </div>
  );
};

export default App;
