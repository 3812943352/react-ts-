/*
 * @Author: wb
 * @Date: 2024-11-20 20:01:07
 * @LastEditors: wb
 * @LastEditTime: 2024-11-21 10:40:37
 * @FilePath: \demo\src\store\user\selector.tsx
 * @Description: 请填写简介
 */
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import tokenReducer from "./reducer";
import catchReducer from "./catchReducer";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

export interface RootState {
  token: ReturnType<typeof tokenReducer>;
  cacheKey: ReturnType<typeof catchReducer>;
}
const rootReducer = combineReducers({
  token: tokenReducer,
  cacheKey: catchReducer,
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
