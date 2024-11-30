/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-30 16:21:57
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-11-30 16:34:35
 * @FilePath: src/views/Page12/options/openMethod.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

export const openMethodOptions: Option[] = [
  {
    label: "登录",
    value: "登录",
  },
  {
    label: "无限制",
    value: "无限制",
  },
];
