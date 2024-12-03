/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-30 16:34:59
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-02 17:30:10
 * @FilePath: src/views/Page12/options/api.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const ApiSuperVisionOptions: Option[] = [
  {
    label: "/ApiSuperVision/addApi",
    value: "/ApiSuperVision/addApi",
  },
  {
    label: "/ApiSuperVision/deleteApi",
    value: "/ApiSuperVision/deleteApi",
  },
  {
    label: "/ApiSuperVision/updateApi",
    value: "/ApiSuperVision/updateApi",
  },
  {
    label: "/ApiSuperVision/getAllApi",
    value: "/ApiSuperVision/getAllApi",
  },
  {
    label: "/ApiSuperVision/getApiBlur",
    value: "/ApiSuperVision/getApiBlur",
  },
  {
    label: "/ApiSuperVision/getPage",
    value: "/ApiSuperVision/getPage",
  },
  {
    label: "/ApiSuperVision/getBlur",
    value: "/ApiSuperVision/getBlur",
  },
  {
    label: "/ApiSuperVision/getDate",
    value: "/ApiSuperVision/getDate",
  },
  {
    label: "/ApiSuperVision/delRecord",
    value: "/ApiSuperVision/delRecord",
  },
  {
    label: "/ApiSuperVision/getBan",
    value: "/ApiSuperVision/getBan",
  },
  {
    label: "/ApiSuperVision/ban",
    value: "/ApiSuperVision/ban",
  },
  {
    label: "/ApiSuperVision/unBan",
    value: "/ApiSuperVision/unBan",
  },
  {
    label: "/ApiSuperVision/banBlur",
    value: "/ApiSuperVision/banBlur",
  },
  {
    label: "/ApiSuperVision/banDate",
    value: "/ApiSuperVision/banDate",
  },
  {
    label: "/ApiSupervision-service/v3/api-docs",
    value: "/ApiSupervision-service/v3/api-docs",
  },
];
const userOptions: Option[] = [
  {
    label: "/user/captcha",
    value: "/user/captcha",
  },
  {
    label: "/user/sendSms",
    value: "/user/sendSms",
  },
  {
    label: "/user/login",
    value: "/user/login",
  },
  {
    label: "/user/register",
    value: "/user/register",
  },
  {
    label: "/user/getUserById",
    value: "/user/getUserById",
  },
  {
    label: "/user/getUserByPhone",
    value: "/user/getUserByPhone",
  },
  {
    label: "/user/getAllUser",
    value: "/user/getAllUser",
  },
  {
    label: "/user/delUserById",
    value: "/user/delUserById",
  },
  {
    label: "/user/updateUserById",
    value: "/user/updateUserById",
  },
  {
    label: "/user-service/v3/api-docs",
    value: "/user-service/v3/api-docs",
  },
];
const dataOptions: Option[] = [
  {
    label: "/data/addArea",
    value: "/data/addArea",
  },
  {
    label: "/data/deleteArea",
    value: "/data/deleteArea",
  },
  {
    label: "/data/getAreaById",
    value: "/data/getAreaById",
  },
  {
    label: "/data/getAllArea",
    value: "/data/getAllArea",
  },
  {
    label: "/data/updateArea",
    value: "/data/updateArea",
  },
  {
    label: "/data/upload",
    value: "/data/upload",
  },
  {
    label: "/data/download",
    value: "/data/download",
  },
  {
    label: "/data/getFile",
    value: "/data/getFile",
  },
  {
    label: "/data/update",
    value: "/data/update",
  },
  {
    label: "/data/delete",
    value: "/data/delete",
  },
  {
    label: "/data/addDepartment",
    value: "/data/addDepartment",
  },
  {
    label: "/data/deleteDepartment",
    value: "/data/deleteDepartment",
  },
  {
    label: "/data/getAllDepartment",
    value: "/data/getAllDepartment",
  },
  {
    label: "/data/getDepartmentById",
    value: "/data/getDepartmentById",
  },
  {
    label: "/data/updateDepartment",
    value: "/data/updateDepartment",
  },
  {
    label: "/data-service/v3/api-docs",
    value: "/data-service/v3/api-docs",
  },
];
export const ControllerOptions: Option[] = [
  {
    label: "data",
    value: "data",
    children: dataOptions,
  },
  {
    label: "ApiSuperVision",
    value: "ApiSuperVision",
    children: ApiSuperVisionOptions,
  },
  {
    label: "user",
    value: "user",
    children: userOptions,
  },
];
