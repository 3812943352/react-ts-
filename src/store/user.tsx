/*
 * @Author: wb
 * @Date: 2024-11-21 10:40:44
 * @LastEditors: wb
 * @LastEditTime: 2024-11-21 10:40:44
 * @FilePath: \demo\src\store\user.tsx
 * @Description: 请填写简介
 */
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./user/selector";

export const selectToken = createSelector(
  (state: RootState) => state.token,
  (token) => token,
);

export const selectCacheKey = createSelector(
  (state: RootState) => state.cacheKey,
  (cacheKey) => cacheKey,
);
