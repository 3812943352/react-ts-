/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-30 17:01:24
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-03 10:22:22
 * @FilePath: src/views/Page12/options/apiController.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
interface Option {
  value: string;
  label: string;
  children?: Option[];
}

export const apiControllerOptions: Option[] = [
  {
    label: "data",
    value: "data",
  },
  {
    label: "ApiSuperVision",
    value: "ApiSuperVision",
  },
  {
    label: "user",
    value: "user",
  },
  {
    label: "无",
    value: "无",
  },
];
