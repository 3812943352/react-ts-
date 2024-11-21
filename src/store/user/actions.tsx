/*
 * @Author: wb
 * @Date: 2024-11-20 20:25:28
 * @LastEditors: wb
 * @LastEditTime: 2024-11-21 10:12:43
 * @FilePath: \demo\src\store\user\actions.tsx
 * @Description: 请填写简介
 */
import {
  SET_TOKEN,
  RESET_TOKEN,
  SET_CATCH,
  RESET_CATCH,
} from "../../utils/actionTypes";

export const setToken = (token: string) => ({
  type: SET_TOKEN,
  payload: token,
});

export const resetToken = () => ({
  type: RESET_TOKEN,
});

export const setCatch = (catchKey: string) => ({
  type: SET_CATCH,
  payload: catchKey,
});

export const resetCatch = () => ({
  type: RESET_CATCH,
});
