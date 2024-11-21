/*
 * @Author: wb
 * @Date: 2024-11-20 20:01:07
 * @LastEditors: wb
 * @LastEditTime: 2024-11-20 20:28:23
 * @FilePath: \demo\src\store\user.tsx
 * @Description: 请填写简介
 */
import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./user/reducer";

const store = configureStore({
  reducer: {
    token: tokenReducer,
  },
});

export default store;
