/*
 * @Author: wb
 * @Date: 2024-11-20 19:58:34
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-16 17:48:32
 * @FilePath: src/utils/request.tsx
 * @Description: 请填写简介
 */
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { store } from "@/store/user/selector";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import eventBus from "@/utils/events.ts";

const service = axios.create({
  timeout: 10000,
});

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    eventBus.emit("startLoading");
    const token = store.getState().token?.token;

    if (token !== null) {
      config.headers["token"] = token;
    }
    toast.info("获取配置...", {
      position: "top-right",
      autoClose: 3000,
      closeOnClick: false,
    });
    return config;
  },
  (error: AxiosError) => {
    toast.dismiss();
    toast.error(error.message, {
      position: "top-right",
      autoClose: 3000,
      closeOnClick: false,
    });
    eventBus.emit("stopLoading");
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response: AxiosResponse) => {
    eventBus.emit("stopLoading");
    const { status, data } = response;
    if (status === 200 && data.code === 440) {
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }
    if (status === 200 && data.code === 444) {
      window.location.href = "/ban";
    }
    if (status === 200 && data.code === 443) {
      console.log(data);
      // window.location.href = "/auth";
    }
    if (status === 401) {
      toast.warn("当前状态已过期，请重新登录", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: false,
      });
      setInterval(() => {
        eventBus.emit("toLogin");
      }, 3000);
    }
    if (status === 200 && data.code === 200) {
      toast.dismiss();
      toast.success(data.message, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: false,
      });
      return data;
    } else if (status === 200 && data.code !== 200) {
      if (data.messages === null) {
        // toast.dismiss();
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: false,
        });
        return data;
      } else {
        toast.dismiss();
        for (let i = 0; i < data.messages.length; i++) {
          toast.error(data.messages[i], {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: false,
          });
        }
        return data;
      }
    }
  },
  (error: AxiosError) => {
    toast.dismiss();
    toast.error(error.message, {
      position: "top-right",
      autoClose: 3000,
      closeOnClick: false,
    });
    eventBus.emit("stopLoading");
    return Promise.reject(error);
  },
);
export default service;
