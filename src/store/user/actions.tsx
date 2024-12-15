/*
 * @Author: wb
 * @Date: 2024-11-20 20:25:28
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-13 11:06:25
 * @FilePath: src/store/user/actions.tsx
 * @Description: 请填写简介
 */
import {
  RESET_CATCH,
  RESET_OUTH,
  RESET_OUTH_List,
  RESET_TOKEN,
  RESET_USER,
  SET_CATCH,
  SET_OUTH,
  SET_OUTH_List,
  SET_TOKEN,
  SET_USER,
} from "../../utils/actionTypes";

export const setToken = (token: string | null) => ({
  type: SET_TOKEN,
  payload: token,
});

export const resetToken = () => ({
  type: RESET_TOKEN,
});

export const setCatch = (catchKey: string | null) => ({
  type: SET_CATCH,
  payload: catchKey,
});

export const resetCatch = () => ({
  type: RESET_CATCH,
});
export const setUser = (user: string | null) => ({
  type: SET_USER,
  payload: user,
});

export const resetUser = () => ({
  type: RESET_USER,
});
export const setOuth = (outh: number | null) => ({
  type: SET_OUTH,
  payload: outh,
});

export const resetOuth = () => ({
  type: RESET_OUTH,
});
export const setOuthList = (outh: [string] | null) => ({
  type: SET_OUTH_List,
  payload: outh,
});

export const resetOuthList = () => ({
  type: RESET_OUTH_List,
});
