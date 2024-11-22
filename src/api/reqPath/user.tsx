/**
 * @Author: wb
 * @Date: 2024-11-21 11:34:30
 * @LastEditTime: 2024-11-21 12:41:54
 * @FilePath: src/api/reqPath/user.tsx
 * @Description:
 */
export const userPath = {
  login: "/api/user/login",
  register: "/api/user/register",
  getUserById: "/api/user/getUserById",
  getUserByPhone: "/api/user/getUserByPhone",
  getAllUser: "/api/user/getAllUser",
  delUserById: "/api/user/delUserById",
  updateUserById: "/api/user/updateUserById",
};
export const captchaPath = {
  getCaptcha: "/api/user/captcha",
};

export const smsPath = {
  sendSms: "/api/user/sendSms",
};
