/*
 * @Author: wb
 * @Date: 2024-10-28 14:23:24
 * @LastEditors: wb
 * @LastEditTime: 2024-10-31 16:41:35
 * @FilePath: \demo\src\main.tsx
 * @Description: 请填写简介
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/input.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import './polyfills';
// import Router from "@/router/index";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
