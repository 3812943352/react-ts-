/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-12-13 14:28:43
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-13 14:54:14
 * @FilePath: src/views/Page9/options/isLoginOption.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
interface Option {
  value: string;
  label: string;
  children?: Option[];
}

export const isLoginOption: Option[] = [
  {
    label: "无限制",
    value: "无限制",
  },
  {
    label: "登录",
    value: "登录",
  },
];
