/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-21 11:34:30
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-16 14:38:29
 * @FilePath: src/api/reqPath/user.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

export const userPath = {
  login: "/api/user/login",
  reset: "/api/user/reset",
  register: "/api/user/register",
  getUserById: "/api/user/getUserById",
  getUserByPhone: "/api/user/getUserByPhone",
  getAllUser: "/api/user/getAllUser",
  delUserById: "/api/user/delUserById",
  updateUserById: "/api/user/updateUserById",
  getDatabase: "/api/user/getDatabase",
  getAuth: "/api/user/getAuth",
  addAuth: "/api/user/addAuth",
  delAuth: "/api/user/delAuth",
  updateAuth: "/api/user/updateAuth",
  userBlur: "/api/user/userBlur",
};
export const captchaPath = {
  getCaptcha: "/api/user/captcha",
};

export const smsPath = {
  sendSms: "/api/user/sendSms",
  resetSms: "/api/user/resetSms",
};
