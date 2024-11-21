/*
 * @Author: wb
 * @Date: 2024-11-20 21:50:45
 * @LastEditors: wb
 * @LastEditTime: 2024-11-21 10:02:05
 * @FilePath: \demo\src\types\user.ts
 * @Description: 请填写简介
 */
// src/types/user.ts
interface UserEntity {
  ID?: number;
  phone: string;
  pwd?: string;
  role?: number;
  auth?: number;
  created?: number;
  lastLogin?: number;
}
export interface registerDataType {
  data: {
    captcha: string;
  };
  UserEntity: UserEntity;
}
export interface loginDataType {
  data: { phone: number; smsCode: string };
}
