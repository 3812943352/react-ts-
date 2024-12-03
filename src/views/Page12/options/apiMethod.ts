/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-30 16:53:28
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-02 17:32:06
 * @FilePath: src/views/Page12/options/apiMethod.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
interface Option {
  value: string;
  label: string;
  children?: Option[];
}

export const apiMethodOptions: Option[] = [
  {
    label: "GET",
    value: "GET",
  },
  {
    label: "POST",
    value: "POST",
  },
  {
    label: "无",
    value: "无",
  },
];
