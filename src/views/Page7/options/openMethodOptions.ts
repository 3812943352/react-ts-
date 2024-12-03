/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-12-03 16:23:17
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-03 16:24:03
 * @FilePath: src/views/Page7/options/openMethodOptions.ts
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
    value: "0",
  },
  {
    label: "无限制",
    value: "1",
  },
];
