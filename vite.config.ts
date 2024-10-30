import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteEslint from "vite-plugin-eslint2";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteEslint({
      cache: false,
      cacheLocation: "./node_modules/.eslintcache",
      overrideConfigFile: "./.eslintrc.cjs", // 指定配置文件的路径
    }),
  ],
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".json": "json",
      },
    },
  },
});
