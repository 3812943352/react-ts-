import ax from "@/utils/request.tsx";
import {
  ApiEntity,
  ApiPageDataType,
  banDataType,
  blurDataType,
  delDataType,
  getChartsType,
  getDateDataType,
  getLinesType,
  unBanDataType,
} from "@/types/apiSuperVision.ts";
import {
  ApiPath,
  gatePath,
  ipPath,
} from "@/api/reqPath/apiSuperVision.tsx";

/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-26 11:49:46
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-12 10:06:52
 * @FilePath: src/api/apiSuperVision.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
export function gatePageAPI(data: ApiPageDataType) {
  return ax.post(gatePath.getPage, null, {
    params: data.data,
    headers: data.headers,
  });
}

export function getBanAPI(data: ApiPageDataType) {
  return ax.post(ipPath.getBan, null, {
    params: data.data,
    headers: data.headers,
  });
}

export function banAPI(data: banDataType) {
  return ax.post(ipPath.ban, null, {
    params: data.data,
    headers: data.headers,
  });
}

export function banBlurAPI(data: blurDataType) {
  return ax.post(ipPath.banBlur, null, {
    params: data.data,
    headers: data.headers,
  });
}

export function banDateAPI(data: getDateDataType) {
  return ax.post(ipPath.banDate, null, {
    params: data.data,
    headers: data.headers,
  });
}

export function unBanAPI(data: unBanDataType) {
  return ax.post(ipPath.unBan, null, {
    params: data.data,
    headers: data.headers,
  });
}

export function getBlurAPI(data: blurDataType) {
  return ax.post(gatePath.getBlur, null, {
    params: data.data,
    headers: data.headers,
  });
}

export function delApi(data: delDataType) {
  return ax.post(ipPath.del, null, {
    params: data.data,
    headers: data.headers,
  });
}

export function getDateAPI(data: getDateDataType) {
  return ax.post(gatePath.getDate, null, {
    params: data.data,
    headers: data.headers,
  });
}

export function addApiApi(data: ApiEntity) {
  return ax.post(ApiPath.addApi, data, {
    headers: data.headers,
  });
}

export function deleteApi(data: ApiEntity) {
  return ax.post(ApiPath.deleteApi, data, {
    headers: data.headers,
  });
}

export function updateApi(data: ApiEntity) {
  return ax.post(ApiPath.updateApi, data, {
    headers: data.headers,
  });
}

export function getAllApi(data: ApiPageDataType) {
  return ax.post(ApiPath.getAllApi, null, {
    params: data.data,
    headers: data.headers,
  });
}

export function blurApi(data: blurDataType) {
  return ax.post(ApiPath.apiBlur, null, {
    params: data.data,
    headers: data.headers,
  });
}

export function getChartsApi(data: getChartsType) {
  return ax.post(ApiPath.getCharts, null, {
    params: data.data,
    headers: data.headers,
  });
}
export function getLinesApi(data: getLinesType) {
  return ax.post(ApiPath.getLines, null, {
    headers: data.headers,
  });
}
