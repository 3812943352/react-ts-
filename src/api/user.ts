/*
 * @Author: wb
 * @Date: 2024-11-20 21:49:38
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-16 14:43:05
 * @FilePath: src/api/user.ts
 * @Description: 请填写简介
 */
import * as dataType from "@/types/user";
import {
  getAllUserDataType,
  getAuthDataType,
  resetPwdDataType,
  resetSmsDataType,
  sendSmsDataType,
} from "@/types/user";
import ax from "@/utils/request";
import {
  captchaPath,
  smsPath,
  userPath,
} from "@/api/reqPath/user.tsx";
import { onlyHeaderType } from "@/types/data.ts";
import { blurDataType } from "@/types/apiSuperVision.ts";

/**
 * @description: 用户登录
 * @param {loginDataType} data 登录参数
 * @return 返回请求登录接口的结果
 */
export function postLoginAPI(data: dataType.loginDataType) {
  return ax.post(userPath.login, null, {
    params: data.data,
  });
}
export function resetAPI(data: resetPwdDataType) {
  return ax.post(userPath.reset, null, {
    params: data.data,
  });
}
/**
 * @description: 用户注册
 * @param {registerDataType} data 注册参数
 * @return 注册结果
 */
export function postRegisterAPI(data: dataType.registerDataType) {
  return ax.post(userPath.register, data.UserEntity, {
    headers: data.headers,
    params: data.data,
  });
}

/**
 * @description: 根据用户ID获取用户信息
 * @param {getUserByIdDataType} data
 */
export function getUserById(data: dataType.getUserByIdDataType) {
  return ax.post(userPath.getUserById, null, {
    params: data.data,
    headers: data.headers,
  });
}

/**
 * @description: 根据用户手机号获取用户信息
 * @param {getUserByPhoneDataType} data
 */
export function getUserByPhone(
  data: dataType.getUserByPhoneDataType,
) {
  return ax.post(userPath.getUserByPhone, data);
}

/**
 * @description: 获取所有用户信息
 * @param {getAllUserDataType} data
 */
export function getAllUser(data: dataType.getAllUserDataType) {
  return ax.post(userPath.getAllUser, null, {
    params: data.data,
    headers: data.headers,
  });
}
export function updateUser(data: dataType.updateUserByIdDataType) {
  return ax.post(userPath.updateUserById, data.data, {
    headers: data.headers,
  });
}
/**
 * @description: 根据用户ID删除用户
 * @param {delUserByDataType}data
 */
export function delUser(data: dataType.delUserByDataType) {
  return ax.post(userPath.delUserById, data.data, {
    headers: data.headers,
  });
}
export function userBlurApi(data: blurDataType) {
  return ax.post(userPath.userBlur, null, {
    params: data.data,
    headers: data.headers,
  });
}
/**
 * @description: 获取验证码
 * @return 返回验证码
 */
export function getCaptcha() {
  return ax.get(captchaPath.getCaptcha, { responseType: "blob" });
}

/**
 * @description: 发送短信
 * @param {sendSmsDataType}data
 *
 */
export function sendSms(data: sendSmsDataType) {
  return ax.post(smsPath.sendSms, null, {
    params: data.data,
    headers: data.headers,
  });
}
export function ResetSms(data: resetSmsDataType) {
  return ax.post(smsPath.resetSms, null, {
    params: data.data,
    headers: data.headers,
  });
}
export function getDatabaseAPI(data: onlyHeaderType) {
  return ax.post(userPath.getDatabase, null, {
    headers: data.headers,
  });
}
export function getAuthAPI(data: getAllUserDataType) {
  return ax.post(userPath.getAuth, null, {
    params: data.data,
    headers: data.headers,
  });
}
export function addAuthAPI(data: getAuthDataType) {
  return ax.post(userPath.addAuth, data.data, {
    headers: data.headers,
  });
}
export function delAuthAPI(data: getAuthDataType) {
  return ax.post(userPath.delAuth, data.data, {
    headers: data.headers,
  });
}
export function updateAuthAPI(data: getAuthDataType) {
  return ax.post(userPath.updateAuth, data.data, {
    headers: data.headers,
  });
}
