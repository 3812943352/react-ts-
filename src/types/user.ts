/*
 * @Author: wb
 * @Date: 2024-11-20 21:50:45
 * @LastEditors: wb
 * @LastEditTime: 2024-11-20 21:50:50
 * @FilePath: \demo\src\types\user.ts
 * @Description: 请填写简介
 */
// src/types/user.ts
export interface loginDataType {
  username: string;
  password: string;
}

export interface userInfoType {
  id: number;
  username: string;
  email: string;
  // 其他用户信息字段
}
