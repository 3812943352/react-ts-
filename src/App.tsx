/*
 * @Author: wb
 * @Date: 2024-10-28 14:23:24
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-21 09:26:58
 * @FilePath: src/App.tsx
 * @Description: 请填写简介
 */
// import { useState } from 'react'
import "@/input.css";
// import Comp1 from "@/commponents/Comp1/index";
// import Comp2 from "@/commponents/Comp2/index";
// import { Button } from "antd";
// import { UpOutlined } from "@ant-design/icons";
import { useNavigate, useRoutes } from "react-router-dom";
import router from "./router";
import { ToastContainer } from "react-toastify";
import React, { useEffect } from "react";
import eventBus from "@/utils/events.ts";
import CustomLoading from "@/commponents/loading";

const App: React.FC = () => {
  const outlet = useRoutes(router);
  const navigate = useNavigate();
  useEffect(() => {
    const handleNavigateToLogin = () => {
      navigate("/login");
    };

    eventBus.on("toLogin", handleNavigateToLogin);

    return () => {
      eventBus.off("toLogin", handleNavigateToLogin);
    };
  }, [navigate]);

  return (
    <div className="App select-none truncate bg-white">
      {outlet}
      <CustomLoading spinning={false} />
      <ToastContainer />
    </div>
  );
};

export default App;
