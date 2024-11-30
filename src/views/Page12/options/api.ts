/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-30 16:34:59
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-11-30 16:52:33
 * @FilePath: src/views/Page12/options/api.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
interface Option {
  value: string;
  label: string;
  children?: Option[];
}

export const ApiSuperVisionOptions: Option[] = [
  {
    label: "http://localhost:9998/ApiSuperVision/addApi",
    value: "http://localhost:9998/ApiSuperVision/addApi",
  },
  {
    label: "http://localhost:9998/ApiSuperVision/deleteApi",
    value: "http://localhost:9998/ApiSuperVision/deleteApi",
  },
  {
    label: "http://localhost:9998/ApiSuperVision/updateApi",
    value: "http://localhost:9998/ApiSuperVision/updateApi",
  },
  {
    label: "http://localhost:9998/ApiSuperVision/getAllApi",
    value: "http://localhost:9998/ApiSuperVision/getAllApi",
  },
  {
    label: "http://localhost:9998/ApiSuperVision/getApiBlur",
    value: "http://localhost:9998/ApiSuperVision/getApiBlur",
  },
  {
    label: "http://localhost:9998/ApiSuperVision/getPage",
    value: "http://localhost:9998/ApiSuperVision/getPage",
  },
  {
    label: "http://localhost:9998/ApiSuperVision/getBlur",
    value: "http://localhost:9998/ApiSuperVision/getBlur",
  },
  {
    label: "http://localhost:9998/ApiSuperVision/getDate",
    value: "http://localhost:9998/ApiSuperVision/getDate",
  },
  {
    label: "http://localhost:9998/ApiSuperVision/delRecord",
    value: "http://localhost:9998/ApiSuperVision/delRecord",
  },
  {
    label: "http://localhost:9998/ApiSuperVision/getBan",
    value: "http://localhost:9998/ApiSuperVision/getBan",
  },
  {
    label: "http://localhost:9998/ApiSuperVision/ban",
    value: "http://localhost:9998/ApiSuperVision/ban",
  },
  {
    label: "http://localhost:9998/ApiSuperVision/unBan",
    value: "http://localhost:9998/ApiSuperVision/unBan",
  },
  {
    label: "http://localhost:9998/ApiSuperVision/banBlur",
    value: "http://localhost:9998/ApiSuperVision/banBlur",
  },
  {
    label: "http://localhost:9998/ApiSuperVision/banDate",
    value: "http://localhost:9998/ApiSuperVision/banDate",
  },
];
export const userOptions: Option[] = [
  {
    label: "http://localhost:9998/user/captcha",
    value: "http://localhost:9998/user/captcha",
  },
  {
    label: "http://localhost:9998/user/sendSms",
    value: "http://localhost:9998/user/sendSms",
  },
  {
    label: "http://localhost:9998/user/login",
    value: "http://localhost:9998/user/login",
  },
  {
    label: "http://localhost:9998/user/register",
    value: "http://localhost:9998/user/register",
  },
  {
    label: "http://localhost:9998/user/getUserById",
    value: "http://localhost:9998/user/getUserById",
  },
  {
    label: "http://localhost:9998/user/getUserByPhone",
    value: "http://localhost:9998/user/getUserByPhone",
  },
  {
    label: "http://localhost:9998/user/getAllUser",
    value: "http://localhost:9998/user/getAllUser",
  },
  {
    label: "http://localhost:9998/user/delUserById",
    value: "http://localhost:9998/user/delUserById",
  },
  {
    label: "http://localhost:9998/user/updateUserById",
    value: "http://localhost:9998/user/updateUserById",
  },
];
export const dataOptions: Option[] = [
  {
    label: "http://localhost:9998/data/addArea",
    value: "http://localhost:9998/data/addArea",
  },
  {
    label: "http://localhost:9998/data/deleteArea",
    value: "http://localhost:9998/data/deleteArea",
  },
  {
    label: "http://localhost:9998/data/getAreaById",
    value: "http://localhost:9998/data/getAreaById",
  },
  {
    label: "http://localhost:9998/data/getAllArea",
    value: "http://localhost:9998/data/getAllArea",
  },
  {
    label: "http://localhost:9998/data/updateArea",
    value: "http://localhost:9998/data/updateArea",
  },
  {
    label: "http://localhost:9998/data/upload",
    value: "http://localhost:9998/data/upload",
  },
  {
    label: "http://localhost:9998/data/download",
    value: "http://localhost:9998/data/download",
  },
  {
    label: "http://localhost:9998/data/getFile",
    value: "http://localhost:9998/data/getFile",
  },
  {
    label: "http://localhost:9998/data/update",
    value: "http://localhost:9998/data/update",
  },
  {
    label: "http://localhost:9998/data/delete",
    value: "http://localhost:9998/data/delete",
  },
  {
    label: "http://localhost:9998/data/addDepartment",
    value: "http://localhost:9998/data/addDepartment",
  },
  {
    label: "http://localhost:9998/data/deleteDepartment",
    value: "http://localhost:9998/data/deleteDepartment",
  },
  {
    label: "http://localhost:9998/data/getAllDepartment",
    value: "http://localhost:9998/data/getAllDepartment",
  },
  {
    label: "http://localhost:9998/data/getDepartmentById",
    value: "http://localhost:9998/data/getDepartmentById",
  },
  {
    label: "http://localhost:9998/data/updateDepartment",
    value: "http://localhost:9998/data/updateDepartment",
  },
];
