/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-12-14 10:15:35
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-14 10:42:20
 * @FilePath: src/views/Page10/options/authOptins.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
interface Option {
  value: string;
  label: string;
  children?: Option[];
}

export const authOptions: Option[] = [
  {
    label: "管理",
    value: "管理",
  },
  {
    label: "用户",
    value: "用户",
  },
];
