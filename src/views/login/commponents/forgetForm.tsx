/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-12-16 12:18:42
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-16 15:06:37
 * @FilePath: src/views/login/commponents/forgetForm.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import React, {
  forwardRef,
  Ref,
  useEffect,
  useRef,
  useState,
} from "react";
import type { FormProps } from "antd";
import { Form, Input } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import {
  resetPwdDataType,
  resetSmsDataType,
  UserEntity,
} from "@/types/user.ts";
import "@/input.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userRules } from "@/rules/user.ts";
import { store } from "@/store/user/selector.tsx";
import { setCatch } from "@/store/user/actions.tsx";
import { useDispatch } from "react-redux";
import { resetAPI, ResetSms } from "@/api/user.ts";
import eventBus from "@/utils/events.ts";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {}

const ForgetForm = forwardRef(
  (props: LoginFormProps, ref: Ref<any>) => {
    const smsRef = useRef<HTMLButtonElement>(null);
    const [catchUrl, setCatchUrl] = useState<string>("");
    const [isFetching, setIsFetching] = useState(false);
    const [smssended, setSmssended] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [hasShownWarning, setHasShownWarning] = useState(false);
    const [isFirstThreeValid, setIsFirstThreeValid] = useState(false);

    const [form] = Form.useForm();
    // const phoneValue = form.getFieldValue("phone");
    // const pwdValue = form.getFieldValue("pwd");
    // const captchaVale = form.getFieldValue("captcha");
    // const smsCodeValue = form.getFieldValue("smsCode");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sendSmsCode = () => {
      form
        .validateFields(["phone", "pwd", "captcha"])
        .then((values) => {
          const phoneValue = values.phone;
          const pwd = values.pwd;
          const captchaValue = values.captcha;
          const captchaKey = store.getState().cacheKey;
          const data: resetSmsDataType = {
            data: {
              phone: phoneValue,
              pwd: pwd,
              captcha: captchaValue,
            },
            headers: { "captcha-key": captchaKey?.catchKey },
          };
          ResetSms(data).then((r) => {
            if (r.code !== 200) {
              getCap();
            } else if (r.code === 200) {
              setIsFirstThreeValid(false);
              countdown(60);
            }
          });
        })
        .catch((error) => {});
    };

    function countdown(count: number) {
      const originText = smsRef.current!.textContent;
      const interval = setInterval(() => {
        if (count === 0) {
          smsRef.current!.textContent = originText;
          clearInterval(interval);
          setIsFirstThreeValid(true);
        } else {
          smsRef.current!.textContent = `| ${count}秒后重发`;
          count--;
        }
      }, 1000);
    }

    const login = () => {
      form
        .validateFields(["phone", "pwd", "captcha", "smsCode"])
        .then((values) => {
          const phoneValue = values.phone;
          const pwd = values.pwd;
          const smsCodeValue = values.smsCode;
          const data: resetPwdDataType = {
            data: {
              phone: phoneValue,
              smsCode: smsCodeValue,
              pwd: pwd,
            },
          };
          resetAPI(data).then((r) => {
            if (r.code === 200) {
            }
          });
        })
        .catch((error) => {});
    };

    const handleFieldsChange = (
      changedFields: any[],
      allFields: any[],
    ) => {
      const firstThreeFields = ["phone", "pwd", "captcha"];
      const isSmsChanged = changedFields.some(
        (field) => field.name[0] === "smsCode",
      );
      const hasValue = firstThreeFields.every((field) => {
        const value = allFields.find(
          (f) => f.name[0] === field,
        )?.value;
        return value !== undefined && value !== "";
      });
      const isValid = firstThreeFields.every((field) => {
        const fieldError =
          allFields.find((f) => f.name[0] === field)?.errors?.length >
          0;
        return !fieldError;
      });
      if (!isSmsChanged) {
        if (isValid && hasValue) {
          setIsDisabled(true);
          setIsFirstThreeValid(true);
        } else {
          setIsDisabled(false);
          setIsFirstThreeValid(false);
        }
      }
    };
    useEffect(() => {
      eventBus.on("Fgetcap", getCap);
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

    const onFinish: FormProps<UserEntity>["onFinish"] = (values) => {
      console.info("Success:", values);
    };

    const onFinishFailed: FormProps<UserEntity>["onFinishFailed"] = (
      errorInfo,
    ) => {};

    return (
      <div className="absolute" ref={ref} style={{ top: "-1000px" }}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ minWidth: 400, maxWidth: 600 }}
          initialValues={{
            phone: "",
            pwd: "",
            captcha: "",
            smsCode: "",
          }}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          onFieldsChange={handleFieldsChange}
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
            rules={userRules.newPwd}
          >
            <Input.Password
              showCount
              maxLength={10}
              size="large"
              placeholder="新密码"
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

          {/* 短信验证码 */}
          <Form.Item<UserEntity>
            label=""
            name="smsCode"
            rules={userRules.smsCode}
          >
            <div className="flex w-full max-w-md items-center">
              <Input
                style={{ position: "absolute", zIndex: "1" }}
                size="large"
                placeholder="短信验证码"
                prefix={<MailOutlined />}
              />
              <button
                disabled={!isDisabled}
                ref={smsRef}
                onClick={sendSmsCode}
                style={{
                  zIndex: "1",
                  position: "absolute",
                  left: "65%",
                  marginLeft: "auto",
                  color: isFirstThreeValid ? "#0054ff" : "#6a6a6a",
                  cursor: isFirstThreeValid
                    ? "pointer"
                    : "not-allowed",
                }}
                type="button"
              >
                | &nbsp;获取验证码
              </button>
            </div>
          </Form.Item>

          <Form.Item>
            <button onClick={login} className="submit" type="submit">
              重置密码
            </button>
          </Form.Item>
        </Form>
      </div>
    );
  },
);

ForgetForm.displayName = "ForgetForm";

export default ForgetForm;
