/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-21 13:02:22
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-07 15:43:43
 * @FilePath: src/types/apiSuperVision.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
// apiEntity.ts
export interface ApiEntity {
  id: number | null; // api接口ID
  apiTitle: string | null; // api标题
  apiDes: string | null; // api描述
  openMethod: string | null; // 开放方式
  api: string | null; // 接口地址
  apiController: string | null; // api控制器
  apiMethod: string | null; // api方法
  apiFormat: string | null; // api数据格式
  apiDemo: string | null; // 请求示例
  apiTable: string | null; // api表名
  times?: number | null; // 调用次数
  visits?: number | null; // 访问次数
  headers: {
    token: string | null;
  };
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
  data: {
    pageNum: number;
    pageSize: number;
  };
  headers: {
    token: string | null;
  };
}

export interface banDataType {
  data: {
    ip: string;
    reason: string;
  };
  headers: {
    token: string | null;
  };
}

export interface unBanDataType {
  data: {
    ip: string;
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

export interface delDataType {
  data: {
    ID: number;
  };
  headers: {
    token: string | null;
  };
}

export interface getDateDataType {
  data: {
    start: number;
    end: number;
    pageNum: number;
    pageSize: number;
  };
  headers: {
    token: string | null;
  };
}
