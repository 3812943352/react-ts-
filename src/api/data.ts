import ax from "@/utils/request.tsx";
import {
  AreaEntity,
  blurDataType,
  dataPageDataType,
  DepartmentEntity,
  downloadDataType,
  getFileDataType,
  resetDataType,
  uploadDataType,
} from "@/types/data.ts";
import {
  areaPath,
  dataPath,
  departmentPath,
} from "@/api/reqPath/data.tsx";
import { delDataType } from "@/types/apiSuperVision.ts";

/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-12-03 10:33:33
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-03 17:12:49
 * @FilePath: src/api/data.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
export function addAreaAPI(data: AreaEntity) {
  return ax.post(areaPath.addArea, data, {
    headers: data.headers,
  });
}
export function deleteAreaAPI(data: AreaEntity) {
  return ax.post(areaPath.deleteArea, data, {
    headers: data.headers,
  });
}
export function getAllAreaAPI(data: dataPageDataType) {
  return ax.post(areaPath.getAllArea, null, {
    params: data.data,
    headers: data.headers,
  });
}
export function blurAreaAPI(data: blurDataType) {
  return ax.post(areaPath.areaBlur, null, {
    params: data.data,
    headers: data.headers,
  });
}

export function departmentBlurAPI(data: blurDataType) {
  return ax.post(departmentPath.departmentBlur, null, {
    params: data.data,
    headers: data.headers,
  });
}
export function updateAreaAPI(data: AreaEntity) {
  return ax.post(areaPath.updateArea, data, {
    headers: data.headers,
  });
}

export function addDepartmentAPI(data: DepartmentEntity) {
  return ax.post(departmentPath.addDepartment, data, {
    headers: data.headers,
  });
}

export function deleteDepartmentAPI(data: DepartmentEntity) {
  return ax.post(departmentPath.deleteDepartment, data, {
    headers: data.headers,
  });
}
export function getAllDepartmentAPI(data: dataPageDataType) {
  return ax.post(departmentPath.getAllDepartment, null, {
    params: data.data,
    headers: data.headers,
  });
}
export function updateDepartmentAPI(data: DepartmentEntity) {
  return ax.post(departmentPath.updateDepartment, data, {
    headers: data.headers,
  });
}
export function getFileAPI(data: getFileDataType) {
  return ax.post(dataPath.getFile, null, {
    params: data.data,
    headers: data.headers,
  });
}
export function uploadAPI(data: uploadDataType) {
  return ax.post(dataPath.upload, data.dataEntity, {
    params: data.data,
    headers: data.headers,
  });
}
export function downloadAPI(data: downloadDataType) {
  return ax.post(dataPath.download, null, {
    params: data.data,
    headers: data.headers,
  });
}
export function reset(data: resetDataType) {
  return ax.post(dataPath.reset, null, {
    params: data.data,
    headers: data.headers,
  });
}
export function updateAPI(data: uploadDataType) {
  return ax.post(dataPath.update, data.dataEntity, {
    params: data.data,
    headers: data.headers,
  });
}
export function getAreaAPI() {
  return ax.post(dataPath.getArea);
}
export function getDepartmentAPI() {
  return ax.post(dataPath.getDepartment);
}
export function deleteAPI(data: delDataType) {
  return ax.post(dataPath.delete, null, {
    params: data.data,
    headers: data.headers,
  });
}
