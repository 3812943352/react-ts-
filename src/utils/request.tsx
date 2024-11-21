/*
 * @Author: wb
 * @Date: 2024-11-20 19:58:34
 * @LastEditors: wb
 * @LastEditTime: 2024-11-21 10:36:18
 * @FilePath: \demo\src\utils\request.tsx
 * @Description: 请填写简介
 */
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { error } from "console";
import { selectToken } from "@/store/user";

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
});

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useSelector(selectToken);

    // useSelector(
    //   (state: { token: string | null }) => state.token,
    // );
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
    } else {
      toast.dismiss();
      for (let i = 0; i < data.messages.length; i++) {
        toast.error(data.messages[i], {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: false,
        });
      }
      return Promise.reject(error);
    }
  }
  (error: AxiosError) => {
    const { response } = error;
    if (JSON.stringify(error).includes("Network Error")) {
      toast.error("网络连接异常", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: false,
      });
    }
    if (response) {
      if (response.status !== 202) {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: false,
        });
      }
    }

    return Promise.reject(error);
  };
});
export default service;
