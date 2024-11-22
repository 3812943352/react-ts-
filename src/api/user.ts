/*
 * @Author: wb
 * @Date: 2024-11-20 21:49:38
 * @LastEditors: wb
 * @LastEditTime: 2024-11-21 12:51:19
 * @FilePath: src/api/user.ts
 * @Description: 请填写简介
 */
import * as dataType from "@/types/user";
import http from "@/utils/request";
import { captchaPath, smsPath, userPath } from "@/api/reqPath/user.tsx";

/**
 * @description: 用户登录
 * @param {loginDataType} data 登录参数
 * @return 返回请求登录接口的结果
 */
export function postLoginAPI(data: dataType.loginDataType) {
  return http.post<{ token: string }>(userPath.login, data);
}

/**
 * @description: 用户注册
 * @param {registerDataType} data 注册参数
 * @return 注册结果
 */
export function postRegisterAPI(data: dataType.registerDataType) {
  return http.post(userPath.register, data);
}

/**
 * @description: 根据用户ID获取用户信息
 * @param {getUserByIdDataType} data
 */
export function getUserById(data: dataType.getUserByIdDataType) {
  return http.post(userPath.getUserById, data);
}

/**
 * @description: 根据用户手机号获取用户信息
 * @param {getUserByPhoneDataType} data
 */
export function getUserByPhone(
  data: dataType.getUserByPhoneDataType,
) {
  return http.post(userPath.getUserByPhone, data);
}

/**
 * @description: 获取所有用户信息
 * @param {getAllUserDataType} data
 */
export function getAllUser(data: dataType.getAllUserDataType) {
  return http.post(userPath.getAllUser, data);
}

/**
 * @description: 根据用户ID删除用户
 * @param {delUserByIdDataType}data
 */
export function delUserById(data: dataType.delUserByIdDataType) {
  return http.post(userPath.delUserById, data);
}

/**
 * @description: 获取验证码
 * @return 返回验证码
 */
export function getCaptcha() {
  return http.get(captchaPath.getCaptcha);
}

/**
 * @description: 发送短信
 * @param {sendSmsDataType}data
 */
export function sendSms(data: dataType.sendSmsDataType) {
  return http.post(smsPath.sendSms, data);
}
