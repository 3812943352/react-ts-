/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-23 16:07:26
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-14 11:01:20
 * @FilePath: src/views/login/commponents/registerForm.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import { Form, type FormProps, Input } from "antd";
import { registerDataType, UserEntity } from "@/types/user.ts";
import { userRules } from "@/rules/user.ts";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  PhoneOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { setCatch } from "@/store/user/actions.tsx";
import { useDispatch } from "react-redux";
import { postRegisterAPI } from "@/api/user.ts";
import { store } from "@/store/user/selector.tsx";
import { useNavigate } from "react-router-dom";
import eventBus from "@/utils/events.ts";

const registerForm: React.FC = () => {
  const [form] = Form.useForm();
  const [catchUrl, setCatchUrl] = useState<string>("");
  const [isFetching, setIsFetching] = useState(false);
  const [hasShownWarning, setHasShownWarning] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const register = () => {
    form
      .validateFields(["phone", "pwd", "captcha"])
      .then((values) => {
        const phoneValue = values.phone;
        const pwdValue = values.pwd;

        const captchaKey = store.getState().cacheKey;

        const data: registerDataType = {
          data: {
            captcha: values.captcha,
          },
          headers: { "captcha-key": captchaKey?.catchKey },
          UserEntity: {
            phone: phoneValue,
            smsCode: null,
            ID: null,
            pwd: pwdValue,
            role: 2,
            auth: 2,
            created: null,
            lastLogin: null,
            captcha: null,
          },
        };
        postRegisterAPI(data).then((r) => {
          if (r.code !== 200) {
            getCap();
          } else if (r.code === 200) {
            window.location.reload();
          }
        });
      })
      .catch((error) => {});
  };
  const onFinish: FormProps<UserEntity>["onFinish"] = (values) => {
    console.info("Success:", values);
  };

  const onFinishFailed: FormProps<UserEntity>["onFinishFailed"] = (
    errorInfo,
  ) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    eventBus.on("Lgetcap", getCap);
  }, []);
  const getCap = () => {
    if (isFetching) {
      if (!hasShownWarning) {
        toast.warn("请稍后再试", {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: false,
        });
        setHasShownWarning(true);
      }
      return;
    }

    setIsFetching(true);
    setHasShownWarning(false); // 重置提示标志

    axios
      .get("/api/user/captcha", {
        responseType: "blob", // 确保返回的是二进制数据
      })
      .then((res) => {
        const blob = new Blob([res.data], { type: "image/png" });
        setCatchUrl(URL.createObjectURL(blob));
        dispatch(setCatch(res.headers["captcha-key"]));
        // store.dispatch(SET_CATCH, res.headers["captcha-key"]);
        // 设置3秒冷却时间
        setTimeout(() => {
          setIsFetching(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("请求失败:", error);
        setIsFetching(false);
      });
  };
  useEffect(() => {
    getCap();
  }, []);
  return (
    <div className="absolute">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ minWidth: 400, maxWidth: 600 }}
        initialValues={{
          phone: "",
          pwd: "",
          captcha: "",
        }}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        // onFieldsChange={handleFieldsChange}
      >
        {/* 手机号 */}
        <Form.Item<UserEntity>
          label=""
          name="phone"
          rules={userRules.phone}
        >
          <Input
            showCount
            maxLength={11}
            size="large"
            placeholder="手机号"
            prefix={<PhoneOutlined />}
          />
        </Form.Item>

        {/* 密码 */}
        <Form.Item<UserEntity>
          label=""
          name="pwd"
          rules={userRules.pwd}
        >
          <Input.Password
            showCount
            maxLength={10}
            size="large"
            placeholder="密码"
            prefix={<LockOutlined />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        {/* 图形验证码 */}
        <Form.Item<UserEntity>
          label=""
          name="captcha"
          rules={userRules.captcha}
          wrapperCol={{ span: 16 }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Input
              style={{ width: "65%" }}
              size="large"
              placeholder="图形验证码"
              prefix={<SafetyOutlined />}
            />
            <img
              onClick={getCap}
              src={catchUrl}
              alt=""
              style={{
                width: "30%",
                height: "40px",
                padding: "2px",
                marginLeft: "10px",
              }}
              className="ml-auto rounded-lg border-blue-500 p-4 hover:border"
            />
          </div>
        </Form.Item>

        <Form.Item>
          <button onClick={register} className="submit" type="submit">
            注册
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default registerForm;
