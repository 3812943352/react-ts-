/*
 * @Author: wb
 * @Date: 2024-11-20 21:50:45
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-16 14:46:51
 * @FilePath: src/types/user.ts
 * @Description: 请填写简介
 */

interface catchKeyState {
  catchKey: string | null | undefined;
}

interface TokenState {
  token: string | null;
}

// src/types/user.ts
export interface UserEntity {
  ID?: number | null;
  phone?: string;
  pwd?: string | null;
  role?: number | 1;
  auth?: number | 1;
  created?: number | null;
  lastLogin?: number | null;
  captcha?: string | null;
  smsCode?: string | null;
}

export interface registerDataType {
  data: {
    captcha: string;
  };
  headers: {
    captchaKey: string;
  };
  UserEntity: UserEntity;
}

export interface loginDataType {
  data: { phone: number; smsCode: string };
}
export interface resetPwdDataType {
  data: { phone: number; smsCode: string; pwd: string };
}
export interface getUserByIdDataType {
  data: {
    id: number;
  };
  headers: {
    token: string;
  };
}

export interface getUserByPhoneDataType {
  data: {
    phone: number;
  };
  headers: {
    token: string;
  };
}

export interface getAllUserDataType {
  data: {
    pageNum: number;
    pageSize: number;
  };
  headers: {
    token: string;
  };
}

export interface delUserByDataType {
  data: UserEntity;
  headers: {
    token: string;
  };
}

export interface updateUserByIdDataType {
  data: UserEntity;
  headers: {
    token: string;
  };
}

export interface getCaptchaDataType {}

export interface sendSmsDataType {
  data: {
    phone: number;
    pwd: string;
    captcha: string;
  };
  headers: {
    "captcha-key": catchKeyState;
  };
}
export interface resetSmsDataType {
  data: {
    phone: number;
    captcha: string;
    pwd: string;
  };
  headers: {
    "captcha-key": catchKeyState;
  };
}
export interface AuthEntity {
  ID?: number;
  path?: string;
  login?: number;
  auth?: number;
  des?: string;
}

export interface getAuthDataType {
  data: AuthEntity;
  headers: {
    token: string;
  };
}
export interface blurDataType {
  data: {
    pageNum: number;
    pageSize: number;
    word: string;
  };
  headers: {
    token: string | null;
  };
}
