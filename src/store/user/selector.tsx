/*
 * @Author: wb
 * @Date: 2024-11-20 20:01:07
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-14 11:06:09
 * @FilePath: src/store/user/selector.tsx
 * @Description: 请填写简介
 */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./tokenReducer.tsx";
import userReducer from "./tokenReducer.tsx";
import catchReducer from "./catchReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import outhReducer from "@/store/user/outhReducer.tsx";
import outhListReducer from "@/store/user/outhListReducer.tsx";

export interface RootState {
  token: ReturnType<typeof tokenReducer>;
  cacheKey: ReturnType<typeof catchReducer>;
  user: ReturnType<typeof userReducer>;
  outh: ReturnType<typeof outhReducer>;
  outhList: ReturnType<typeof outhReducer>;
}
const rootReducer = combineReducers({
  token: tokenReducer,
  cacheKey: catchReducer,
  user: userReducer,
  outh: outhReducer,
  outhList: outhListReducer,
});
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
