/*
 * @Author: wb
 * @Date: 2024-11-16 19:46:45
 * @LastEditors: wb
 * @LastEditTime: 2024-11-16 19:46:45
 * @FilePath: \demo\src\polyfills.tsx
 * @Description: 请填写简介
 */
// src/polyfills.ts
if (typeof window !== "undefined") {
  (window as any).global = window;
}
