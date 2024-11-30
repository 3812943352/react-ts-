/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-30 16:54:40
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-11-30 16:56:55
 * @FilePath: src/views/Page12/options/apiTable.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
interface Option {
  value: string;
  label: string;
  children?: Option[];
}

export const apiTableOptions: Option[] = [
  {
    label: "api表",
    value: "api",
  },
  {
    label: "地区表",
    value: "area",
  },
  {
    label: "数据表",
    value: "data",
  },
  {
    label: "部门表",
    value: "department",
  },
  {
    label: "网关表",
    value: "gateway",
  },
  {
    label: "ip表",
    value: "ip",
  },
  {
    label: "用户表",
    value: "user",
  },
];
