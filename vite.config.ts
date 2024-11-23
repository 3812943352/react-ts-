/*
 * @Author: wb
 * @Date: 2024-10-28 14:23:24
 * @LastEditors: wb
 * @LastEditTime: 2024-11-21 11:25:46
 * @FilePath: vite.config.ts
 * @Description: 请填写简介
 */
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteEslint from "vite-plugin-eslint2";
import path from "path";
// import { env } from "process";
// https://vite.dev/config/
const ENV_DIR = path.join(__dirname, "envs");
// @ts-ignore
export default ({ mode }) =>
  defineConfig({
    server: {
      proxy: {
        "/api": {
          target: loadEnv(mode, ENV_DIR).VITE_API_URL,

          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },

    plugins: [
      react(),
      viteEslint({
        cache: false,
        cacheLocation: "./node_modules/.eslintcache",
        overrideConfigFile: "./.eslintrc.mjs", // 指定配置文件的路径
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
    envDir: ENV_DIR,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  });
