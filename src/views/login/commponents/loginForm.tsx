/**
 * @Author: wb
 * @Date: 2024-11-21 15:29:52
 * @LastEditTime: 2024-11-21 17:55:25
 * @FilePath: src/views/login/commponents/loginForm.tsx
 * @Description:
 */
import React from "react";
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
import { UserEntity } from "@/types/user.ts";

const catchUrl: string =
  import.meta.env.VITE_API_URL + "/user/captcha";
type FieldType = UserEntity;
const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
  errorInfo,
) => {
  console.log("Failed:", errorInfo);
};
const loginForm: React.FC = () => (
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ minWidth: 400, maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label=""
      name="phone"
      rules={[
        { required: true, message: "Please input your username!" },
      ]}
    >
      <Input
        showCount
        maxLength={11}
        size="large"
        placeholder="手机号"
        prefix={<PhoneOutlined />}
      />
    </Form.Item>

    <Form.Item<FieldType>
      label=""
      name="pwd"
      rules={[
        { required: true, message: "Please input your password!" },
      ]}
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

    <Form.Item<FieldType>
      style={{ display: "flex" }}
      label=""
      name="pwd"
      rules={[
        { required: true, message: "Please input your password!" },
      ]}
    >
      <Input
        style={{ width: "65% " }}
        showCount
        maxLength={4}
        size="large"
        placeholder="图形验证码"
        prefix={<SafetyOutlined />}
      />
      <img
        src={catchUrl}
        alt=""
        style={{ width: "30%", height: "100%" }}
      />
    </Form.Item>

    <Form.Item<FieldType>
      label=""
      name="pwd"
      rules={[
        { required: true, message: "Please input your password!" },
      ]}
    >
      <Input
        style={{ width: "65% " }}
        showCount
        maxLength={4}
        size="large"
        placeholder="短信验证码"
        prefix={<MailOutlined />}
      />
    </Form.Item>

    <Form.Item label={null}>
      <input className="submit" type="submit" value={"登录"} />
    </Form.Item>
  </Form>
);
export default loginForm;
