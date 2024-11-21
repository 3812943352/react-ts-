/*
 * @Author: wb
 * @Date: 2024-10-28 14:23:24
 * @LastEditors: wb
 * @LastEditTime: 2024-11-04 10:47:50
 * @FilePath: \demo\vite.config.ts
 * @Description: 请填写简介
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteEslint from "vite-plugin-eslint2";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteEslint({
      cache: false,
      cacheLocation: "./node_modules/.eslintcache",
      overrideConfigFile: "./.eslintrc.js", // 指定配置文件的路径
    }),
  ],
  //   esbuild: {
  //     drop: ["console", "debugger"],
  //   },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === "CIRCULAR_DEPENDENCY") return;
        warn(warning);
      },
    },
  },
  optimizeDeps: {
    include: ["sockjs-client"],

    esbuildOptions: {
      loader: {
        ".json": "json",
      },
    },
  },
  envDir: "./envDir",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
