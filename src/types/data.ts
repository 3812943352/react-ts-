/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-21 13:02:39
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-05 14:20:39
 * @FilePath: src/types/data.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

/**
 * @Author: wb
 * @Date: 2024-11-21 13:02:39
 * @LastEditTime: 2024-12-05 14:20:39
 * @FilePath: src/types/data.ts
 * @Description:
 */
export interface AreaEntity {
  id: number | null; // ID
  name: string | null; // 区域名称
  created?: number | null; // 创建时间
  updated?: number | null; // 更新时间
  headers: {
    token: string | null;
  };
}

export interface DataEntity {
  id: number | null; // 数据ID
  filename: string | null; // 数据集文件名
  updateTime: number | null; // 数据集上传时间 / 更新时间
  url: string | null; // 资源文件url
  visits: number | null; // 访问量
  downloads: number | null; // 下载量
  openMethod: number; // 开放方式,0登录授权，1无限制
  source: string; // 数据源单位
  department: number; // 所属单位
  area: number; // 所属区域
  uploadTime: number | null; // 上传时间
  datas: string | null; // 数据量
  dataName: string; // 资源名称
  dataDes: string; // 资源描述
  name: string | null; // 文件名
  headers: {
    token: string | null;
  };
}

export interface DepartmentEntity {
  id: number | null; // ID
  name: string | null; // 部门名称
  created?: number | null; // 创建时间
  updated?: number | null; // 更新时间
  headers: {
    token: string | null;
  };
}
export interface dataPageDataType {
  data: {
    pageNum: number;
    pageSize: number;
  };
  headers: {
    token: string | null;
  };
}
export interface uploadDataType {
  data: FormData;

  headers: {
    token: string | null;
  };
}
export interface blurDataType {
  data: {
    pageNum: number;
    pageSize: number;
    word: string;
  };
  headers: {
    token: string | null;
  };
}
export interface downloadDataType {
  data: {
    filename: string;
  };
  headers: {
    token: string | null;
  };
}

export interface resetDataType {
  data: {
    id: number;
  };
  headers: {
    token: string | null;
  };
}
export interface excelDataType {
  data: {
    ID: number;
    pageNum: number;
    pageSize: number;
    sheet: number;
  };
  headers: {
    token: string | null;
  };
}
export interface getFileDataType {
  data: {
    pageNum: number;
    pageSize: number;
  };
  headers: {
    token: string | null;
  };
}
export interface blurDataType {
  data: {
    pageNum: number;
    pageSize: number;
    word: string;
  };
  headers: {
    token: string | null;
  };
}
