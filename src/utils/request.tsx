/*
 * @Author: wb
 * @Date: 2024-11-20 19:58:34
 * @LastEditors: wb
 * @LastEditTime: 2024-11-21 11:30:41
 * @FilePath: src/utils/request.tsx
 * @Description: 请填写简介
 */
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { store } from "@/store/user/selector";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const service = axios.create({
  timeout: 10000,
});

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = store.getState().token;

    // useSelector(
    //   (state: { token: string | null }) => state.token,
    // );
    if (token) {
      config.headers["token"] = token;
    }
    toast.info("获取配置...", {
      position: "top-right",
      autoClose: false,
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
    return Promise.reject(error);
  },
);

service.interceptors.response.use((response: AxiosResponse) => {
  const { status, data } = response;
  if (status === 200 && data.code === 200) {
    toast.dismiss();
    toast.success(data.message, {
      position: "top-right",
      autoClose: 3000,
      closeOnClick: false,
    });
    return data;
  } else {
    if (data.messages === null) {
      toast.dismiss();
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
});
export default service;
