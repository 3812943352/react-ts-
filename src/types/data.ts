/**
 * @Author: wb
 * @Date: 2024-11-21 13:02:39
 * @LastEditTime: 2024-11-21 13:25:07
 * @FilePath: src/types/data.ts
 * @Description:
 */
export interface AreaEntity {
  id: number | null; // ID
  name: string | null; // 区域名称
  created: number | null; // 创建时间
  updated: number | null; // 更新时间
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
}

export interface DepartmentEntity {
  id: number | null; // ID
  name: string | null; // 部门名称
  created: number | null; // 创建时间
  updated: number | null; // 更新时间
}
