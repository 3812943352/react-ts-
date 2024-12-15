/*
 * @Author: wb
 * @Date: 2024-11-04 09:16:08
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-14 10:59:32
 * @FilePath: src/views/Page5/index.tsx
 * @Description: 请填写简介
 */
import CustomTable from "@/views/commponents/table.tsx";
import {
  Button,
  Card,
  Input,
  InputNumber,
  Space,
  TableColumnsType,
  Tooltip,
} from "antd";
import Search from "antd/es/input/Search";
import React, { ReactNode, useEffect, useState } from "react";
import {
  banAPI,
  delApi,
  gatePageAPI,
  getBlurAPI,
  getDateAPI,
} from "@/api/apiSuperVision.ts";
import { store } from "@/store/user/selector.tsx";
import CustomModal from "@/views/commponents/modal.tsx";
import { toast } from "react-toastify";
import TimePicke from "@/commponents/datePicker";
import { timeToUnix } from "@/commponents/timeToUnix.ts";
import { getDateDataType } from "@/types/apiSuperVision.ts";
import { Dayjs } from "dayjs";
import { formatDate } from "@/commponents/formatDate.ts";

const View: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    pageNum: 1,
    pageSize: 10,
    total: 0,
    list: [],
  });
  const [isBlur, setIsBlur] = useState(false);
  const [isDate, setIsDate] = useState(false);
  const [word, setWord] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>();
  const [title, setTitle] = useState("");
  const [banReason, setBanReason] = useState("");
  const [banIp, setBanIp] = useState("");
  const [banId, setBanId] = useState(0);
  const [isban, setIsBan] = useState(false);
  const [banYear, setBanYear] = useState(0);
  const [banMonth, setBanMonth] = useState(0);
  const [banDay, setBanDay] = useState(0);
  const [sTime, setSTime] = useState(0);
  const [eTime, setETime] = useState(0);
  const [serchBlurValue, setSerchBlurValue] = useState("");
  const [serchDateValue, setSerchDateValue] = useState<
    [Dayjs, Dayjs] | null
  >(null);

  const columns: TableColumnsType<(typeof data)[0]> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "5%",
      fixed: "left",

      sorter: (a, b) => a.id.length - b.id.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "用户名",
      dataIndex: "username",
      key: "username",
      width: "8%",
      fixed: "left",
      sorter: (a, b) => a.username.length - b.username.length,
      sortDirections: ["descend", "ascend"],
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "请求地址",
      dataIndex: "reqAdd",
      key: "reqAdd",
      width: "10%",
      fixed: "left",
      sorter: (a, b) => a.reqAdd.length - b.reqAdd.length,
      sortDirections: ["descend", "ascend"],
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "请求方式",
      dataIndex: "reqMethod",
      key: "reqMethod",
      width: "10%",
      fixed: "left",
      sorter: (a, b) => a.reqMethod.length - b.reqMethod.length,
      sortDirections: ["descend", "ascend"],
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "请求IP",
      dataIndex: "reqIp",
      key: "reqIp",
      width: "10%",
      sorter: (a, b) => a.reqIp.length - b.reqIp.length,
      sortDirections: ["descend", "ascend"],
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "code",
      dataIndex: "reqCode",
      key: "reqCode",
      width: "5%",
      sorter: (a, b) => a.reqCode.length - b.reqCode.length,
      sortDirections: ["descend", "ascend"],
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "错误",
      dataIndex: "error",
      key: "error",
      width: "10%",
      sorter: (a, b) => a.error.length - b.error.length,
      sortDirections: ["descend", "ascend"],
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip
          placement="topLeft"
          title={address === null ? "无" : address}
        >
          {address === null ? "无" : address}
        </Tooltip>
      ),
    },
    {
      title: "处理耗时(ms)",
      dataIndex: "ms",
      key: "ms",
      width: "10%",
      sorter: (a, b) => a.ms.length - b.ms.length,
      sortDirections: ["descend", "ascend"],
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "UA",
      dataIndex: "ua",
      key: "ua",
      width: "10%",
      sorter: (a, b) => a.ua.length - b.ua.length,
      sortDirections: ["descend", "ascend"],
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "请求接口",
      dataIndex: "reqController",
      key: "reqController",
      sorter: (a, b) =>
        a.reqController.length - b.reqController.length,
      sortDirections: ["descend", "ascend"],
      width: "10%",
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "接口名",
      dataIndex: "reqName",
      key: "reqName",
      width: "10%",
      sorter: (a, b) => a.reqName.length - b.reqName.length,
      sortDirections: ["descend", "ascend"],
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "contentType",
      dataIndex: "contentType",
      key: "contentType",
      sorter: (a, b) => a.contentType.length - b.contentType.length,
      sortDirections: ["descend", "ascend"],
      width: "10%",
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "contentLength",
      dataIndex: "contentLength",
      key: "contentLength",
      width: "10%",
      sorter: (a, b) =>
        a.contentLength.length - b.contentLength.length,
      sortDirections: ["descend", "ascend"],
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "jwt",
      dataIndex: "jwt",
      key: "jwt",
      width: "10%",
      sorter: (a, b) => a.jwt.length - b.jwt.length,
      sortDirections: ["descend", "ascend"],
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "请求时间",
      dataIndex: "reqTime",
      key: "reqTime",
      width: "10%",
      sorter: (a, b) => a.reqTime.length - b.reqTime.length,
      sortDirections: ["descend", "ascend"],
      ellipsis: {
        showTitle: false,
      },
      render: (reqTime) => (
        <Tooltip placement="topLeft" title={formatDate(reqTime)}>
          {formatDate(reqTime)}
        </Tooltip>
      ),
    },
    {
      title: "响应时间",
      dataIndex: "resTime",
      key: "resTime",
      width: "10%",
      sorter: (a, b) => a.resTime.length - b.resTime.length,
      sortDirections: ["descend", "ascend"],
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={formatDate(address)}>
          {formatDate(address)}
        </Tooltip>
      ),
    },
    {
      title: "操作",
      key: "action",
      fixed: "right",
      width: "10%",
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
      render: (_, record) => (
        <Space size="middle">
          <Button
            color="default"
            variant="solid"
            onClick={() => ban(record)}
          >
            封禁
          </Button>
          <Button
            color="danger"
            variant="solid"
            onClick={() => del(record)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];
  const ban = (record: any) => {
    setIsBan(true);
    setModalOpen(true);
    setTitle("封禁IP");
    setBanIp(record.reqIp);
    setBanId(record.id);
    setContent(
      <>
        <p>确认封禁该IP？IP: {record.reqIp}</p>
        <Input
          placeholder="封禁理由，可不填"
          onChange={banInputChange}
        />
        <div className={"flex"}>
          <InputNumber
            className={"m-2"}
            addonAfter="年"
            defaultValue={0}
            onChange={year}
          />
          <InputNumber
            className={"m-2"}
            addonAfter="月"
            defaultValue={0}
            onChange={month}
          />
          <InputNumber
            className={"m-2"}
            addonAfter="日"
            defaultValue={0}
            onChange={day}
          />
        </div>
      </>,
    );
  };
  const del = (record: any) => {
    setIsBan(false);
    setModalOpen(true);
    setTitle("删除记录");
    setBanId(record.id);

    setContent(<p>确认删除该记录？ID: {record.id}</p>);

    // 传递自定义的 onOk 和 onCancel 方法
  };
  const banInputChange = (r: React.ChangeEvent<HTMLInputElement>) => {
    setBanReason(r.target.value);
  };
  const year = (value: number | null) => {
    if (value === null) {
      setBanYear(0);
    } else {
      setBanYear(value * 365 * 24 * 60 * 60);
    }
  };
  const month = (value: number | null) => {
    if (value === null) {
      setBanMonth(0);
    } else {
      setBanMonth(value * 30 * 24 * 60 * 60);
    }
  };
  const day = (value: number | null) => {
    if (value === null) {
      setBanDay(0);
    } else {
      setBanDay(value * 24 * 60 * 60);
    }
  };
  useEffect(() => {
    const req = {
      data: {
        pageNum: 1,
        pageSize: 10,
      },
      headers: { token: store.getState().token?.token },
    };
    gatePageAPI(req).then((r) => {
      setData(r.data);
      setPagination({ ...pagination, total: r.data.total });
    });
  }, []);

  const onChange = (pagination: any) => {
    if (isBlur) {
      const req = {
        data: {
          pageNum: pagination.current,
          pageSize: pagination.pageSize,
          word: word,
        },
        headers: { token: store.getState().token?.token },
      };
      getBlurAPI(req).then((r) => {
        setData(r.data);
        setPagination({ ...pagination, total: r.data.total });
      });
    } else if (isDate) {
      const req: getDateDataType = {
        data: {
          start: sTime,
          end: eTime,
          pageNum: pagination.current,
          pageSize: pagination.pageSize,
        },
        headers: { token: store.getState().token?.token },
      };
      getDateAPI(req).then((r) => {
        setData(r.data);
        setPagination({ ...pagination, total: r.data.total });
      });
    } else {
      const req = {
        data: {
          pageNum: pagination.current,
          pageSize: pagination.pageSize,
        },
        headers: { token: store.getState().token?.token },
      };
      gatePageAPI(req).then((r) => {
        setData(r.data);
        setPagination({ ...pagination, total: r.data.total });
      });
    }
  };
  const serchBlur = (value: string) => {
    if (value !== "") {
      setIsBlur(true);
      setIsDate(false);
      setSerchDateValue(null);
      setWord(value);
      const req = {
        data: {
          pageNum: 1,
          pageSize: 10,
          word: value,
        },
        headers: { token: store.getState().token?.token },
      };
      getBlurAPI(req).then((r) => {
        setData(r.data);
        setPagination({ ...pagination, total: r.data.total });
      });
    } else {
      toast.warn("搜索内容不得为空", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: false,
      });
    }
  };

  const onOk = () => {
    setModalOpen(false);
    if (isban) {
      const req = {
        data: {
          ip: banIp,
          reason: banReason,
          time: banYear + banMonth + banDay,
        },
        headers: { token: store.getState().token?.token },
      };
      banAPI(req).then((r) => {});
    } else {
      const req = {
        data: {
          id: banId,
        },
        headers: { token: store.getState().token?.token },
      };
      delApi(req).then((r) => {
        if (isBlur) {
          const req = {
            data: {
              pageNum: pagination.pageNum,
              pageSize: 10,
              word: word,
            },
            headers: { token: store.getState().token?.token },
          };
          getBlurAPI(req).then((r) => {
            setData(r.data);
            setPagination({ ...pagination, total: r.data.total });
          });
        } else if (isDate) {
          const req: getDateDataType = {
            data: {
              start: sTime,
              end: eTime,
              pageNum: pagination.pageNum,
              pageSize: 10,
            },
            headers: { token: store.getState().token?.token },
          };
          getDateAPI(req).then((r) => {
            setData(r.data);
            setPagination({ ...pagination, total: r.data.total });
          });
        } else {
          const req = {
            data: {
              pageNum: pagination.pageNum,
              pageSize: pagination.pageSize,
            },
            headers: { token: store.getState().token?.token },
          };
          gatePageAPI(req).then((r) => {
            setData(r.data);
            setPagination({ ...pagination, total: r.data.total });
          });
        }
      });
    }
  };
  const onCancel = () => {
    setModalOpen(false);
  };

  const timeOnChange = (
    dates: [Dayjs, Dayjs],
    dateStrings: [string, string],
  ) => {
    setSerchBlurValue("");
    setSerchDateValue(dates);
    setIsDate(true);
    setIsBlur(false);
    setSTime(timeToUnix(dateStrings[0]));
    setETime(timeToUnix(dateStrings[1]));
  };

  useEffect(() => {
    if (sTime !== 0 && eTime !== 0) {
      const req: getDateDataType = {
        data: {
          start: sTime,
          end: eTime,
          pageNum: 1,
          pageSize: 10,
        },
        headers: { token: store.getState().token?.token },
      };
      getDateAPI(req).then((r) => {
        setData(r.data);
        setPagination({ ...pagination, total: r.data.total });
      });
    }
  }, [sTime, eTime]);
  return (
    <Card hoverable={true} style={{ cursor: "default" }}>
      <Space style={{ marginBottom: 16 }}>
        <Tooltip
          placement="topLeft"
          title="模糊查询用户名,请求IP,请求接口名,code,错误"
        >
          <Search
            value={serchBlurValue}
            placeholder="查询"
            allowClear
            onChange={(r) => setSerchBlurValue(r.currentTarget.value)}
            onPressEnter={(r) => serchBlur(r.currentTarget.value)}
            onSearch={(value) => serchBlur(value)}
          />
        </Tooltip>
        <TimePicke value={serchDateValue} onChange={timeOnChange} />
      </Space>
      <CustomTable
        onChange={onChange}
        virtual={true}
        scroll={{ x: 2000, y: 600 }}
        columns={columns}
        dataSource={data.records}
        pagination={pagination}
        rowHoverable={true}
      />
      <CustomModal
        title={title}
        content={content}
        modalOpen={modalOpen}
        onCancel={onCancel}
        onOk={onOk}
      ></CustomModal>
    </Card>
  );
};

export default View;
