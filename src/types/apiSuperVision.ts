// apiEntity.ts
export interface ApiEntity {
  ID: number | null; // api接口ID
  apiTitle: string | null; // api标题
  apiDes: string | null; // api描述
  openMethod: string | null; // 开放方式
  source: string | null; // api源单位
  api: string | null; // 接口地址
  apiController: string | null; // api控制器
  apiMethod: string | null; // api方法
  apiFormat: string | null; // api数据格式
  apiDemo: string | null; // 请求示例
  apiTable: string | null; // api表名
  department: number | null; // 所属部门
  area: number | null; // 所属区域
  times: number | null; // 调用次数
  visits: number | null; // 访问次数
  created: number | null; // 创建时间
  updated: number | null; // 更新时间
}

// gatewayEntity.ts
export interface GatewayEntity {
  ID: number | null; // API请求ID
  username: string | null; // 请求用户ID
  reqAdd: string | null; // 请求地址
  reqMethod: string | null; // 请求方法
  reqIp: string | null; // 请求ip
  ua: string | null; // 请求用户字符串
  reqController: string | null; // 请求控制器
  reqName: string | null; // 请求接口名
  reqCode: string | null; // 请求状态码
  error: string | null; // 异常信息
  contentType: string | null; // 请求体格式
  contentLength: number | null; // 请求体长度
  uri: string | null; // 请求uri
  jwt: string | null; // 是否jwt验证，0否，1是
  reqTime: string | null; // 请求时间
  resTime: string | null; // 响应时间
  ms: number | null; // 耗时
}

// ipEntity.ts
export interface IpEntity {
  ID: number | null; // 主键ID
  ip: string | null; // IP地址
  time: number | null; // 时间戳
  reason: string | null; // 封禁原因
}

export interface ApiPageDataType {
  pageNum: number;
  pageSize: number;
  headers: {
    token: string;
  };
}
