/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-12-13 14:29:40
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-13 14:54:14
 * @FilePath: src/views/Page9/options/authOption.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
interface Option {
  value: string;
  label: string;
  children?: Option[];
}

export const authOpton: Option[] = [
  {
    label: "管理",
    value: "管理",
  },
  {
    label: "用户",
    value: "用户",
  },
];
