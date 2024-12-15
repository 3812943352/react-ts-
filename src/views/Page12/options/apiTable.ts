/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-30 16:54:40
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-12 16:29:04
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
    value: "api表",
  },
  {
    label: "地区表",
    value: "地区表",
  },
  {
    label: "数据表",
    value: "数据表",
  },
  {
    label: "部门表",
    value: "部门表",
  },
  {
    label: "网关表",
    value: "网关表",
  },
  {
    label: "ip表",
    value: "ip表",
  },
  {
    label: "用户表",
    value: "用户表",
  },
  {
    label: "权限表",
    value: "权限表",
  },
  {
    label: "无",
    value: "无",
  },
];
