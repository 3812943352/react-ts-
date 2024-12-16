/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-23 09:22:59
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-16 14:44:32
 * @FilePath: src/rules/user.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
export const userRules = {
  phone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    {
      pattern:
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      message: "请输入正确的手机号",
      trigger: "blur",
    },
  ],
  pwd: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      pattern: /^.{6,10}$/,
      message: "密码为长度在6-10位",
      trigger: "blur",
    },
  ],
  newPwd: [
    { required: true, message: "请输入新密码", trigger: "blur" },
    {
      pattern: /^.{6,10}$/,
      message: "新密码为长度在6-10位",
      trigger: "blur",
    },
  ],
  captcha: [
    { required: true, message: "请输入验证码", trigger: "blur" },
    {
      pattern: /^.{4}$/,
      message: "验证码为4位",
      trigger: "blur",
    },
  ],
  smsCode: [
    { required: true, message: "请输入短信验证码", trigger: "blur" },
    {
      pattern: /^.{4}$/,
      message: "短信验证码为4位数字",
      trigger: "blur",
    },
  ],
};
