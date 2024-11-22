/*
 * @Author: wb
 * @Date: 2024-10-28 16:51:35
 * @LastEditors: wb
 * @LastEditTime: 2024-11-21 11:24:45
 * @FilePath: .eslintrc.mjs
 * @Description: 请填写简介
 */

export default {
  root: true, // 指定了root为true，eslint只检查当前项目目录
  env: {
    // 提供预设的全局变量，避免eslint检查报错，例如window
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    // 共享推荐的配置风格
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:import/typescript", // TypeScript 的导入规则
    "plugin:jsx-a11y/recommended", // 可访问性规则
    "plugin:react/recommended", // React 规则
    "plugin:react-hooks/recommended", // React Hooks 规则
  ],
  parser: "@typescript-eslint/parser", // 由于eslint默认使用espree来作为js的解释器，我们项目使用的是ts，所以换成了这个
  plugins: [
    "@typescript-eslint", // TypeScript 插件
    "react", // React 插件
    "react-hooks", // React Hooks 插件
    "jsx-a11y", // JSX 可访问性插件
    "import", // 导入规则插件
    "prettier", // Prettier 插件
  ],
  parserOptions: {
    ecmaVersion: "latest", // 指定ECMAScript 语法为最新
    sourceType: "module", // 指定代码为 ECMAScript 模块
    ecmaFeatures: {
      jsx: true, // 启用jsx
    },
    project: "./tsconfig.json",
  },
  settings: {
    react: {
      version: "detect", // 自动检测 React 版本
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off", // React17后不需要在jsx中主动引入react
    "prettier/prettier": [
      "error",
      {
        singleAttributePerLine: false, // 不强制要求一个属性占一行
      },
    ],
    // React Hooks 规则
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    // 其他自定义规则
    // 你可以在这里添加或覆盖其他规则
  },
  ignores: [
    ".eslintrc.mjs",
    "node_modules/**",
    "dist/**",
    ".DS_Store",
    "*.local",
  ],
};
