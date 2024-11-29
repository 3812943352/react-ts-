/*
 * @Author: wb
 * @Date: 2024-11-20 21:50:45
 * @LastEditors: wb
 * @LastEditTime: 2024-11-21 16:27:53
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
  ID: number | null;
  phone: string;
  pwd: string | null;
  role: number | 2;
  auth: number | 2;
  created: number | null;
  lastLogin: number | null;
  captcha: string | null;
  smsCode: string | null;
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

export interface getUserByIdDataType {
  data: {
    ID: number;
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

export interface delUserByIdDataType {
  data: {
    ID: number;
  };
  headers: {
    token: string;
  };
}

export interface updateUserByIdDataType {
  UserEntity: UserEntity;
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
