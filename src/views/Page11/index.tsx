/*
 * @Author: wb
 * @Date: 2024-11-04 09:16:08
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-11-30 13:59:47
 * @FilePath: src/views/Page11/index.tsx
 * @Description: 请填写简介
 */
import CustomTable from "@/views/commponents/table.tsx";
import { Button, Card, Space, TableColumnsType, Tooltip } from "antd";
import Search from "antd/es/input/Search";
import React, { ReactNode, useEffect, useState } from "react";
import { banBlurAPI, banDateAPI, delApi, getBanAPI, unBanAPI } from "@/api/apiSuperVision.ts";
import { store } from "@/store/user/selector.tsx";
import CustomModal from "@/views/commponents/modal.tsx";
import { toast } from "react-toastify";
import TimePicke from "@/commponents/datePicker";
import { timeToUnix } from "@/commponents/timeToUnix.ts";
import { getDateDataType } from "@/types/apiSuperVision.ts";
import { Dayjs } from "dayjs";
import { formatDate } from "@/commponents/formatDate.ts";
import { secToTime } from "@/commponents/secToTime.ts";

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
  const [banIp, setBanIp] = useState("");
  const [banId, setBanId] = useState(0);
  const [isban, setIsBan] = useState(false);
  const [sTime, setSTime] = useState(0);
  const [eTime, setETime] = useState(0);
  const [serchBlurValue, setSerchBlurValue] = useState("");
  const [serchDateValue, setSerchDateValue] = useState<
    [Dayjs, Dayjs] | null
  >(null);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: any) => record.id === editingKey;
  const columns: TableColumnsType<(typeof data)[0]> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "2%",
      sorter: (a, b) => a.id.length - b.id.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "IP",
      dataIndex: "ip",
      key: "ip",
      width: "5%",
      sorter: (a, b) => a.ip.length - b.ip.length,
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
      title: "封禁时长",
      dataIndex: "time",
      key: "time",
      width: "5%",
      sorter: (a, b) => a.time.length - b.time.length,
      sortDirections: ["descend", "ascend"],
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={secToTime(address)}>
          {secToTime(address)}
        </Tooltip>
      ),
    },

    {
      title: "封禁时间",
      dataIndex: "banTime",
      key: "banTime",
      width: "5%",
      sorter: (a, b) => a.banTime.length - b.banTime.length,
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
      title: "封禁原因",
      dataIndex: "reason",
      key: "reason",
      width: "10%",
      sorter: (a, b) => a.reason.length - b.reason.length,
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
      title: "操作",
      key: "action",
      width: "5%",
      render: (_, record) => (
        <Space size="middle">
          <Button
            color="primary"
            variant="solid"
            onClick={() => ban(record)}
          >
            解封
          </Button>
        </Space>
      ),
    },
  ];
  const ban = (record: any) => {
    console.log(record);
    setIsBan(true);
    setModalOpen(true);
    setTitle("解封IP");
    setBanIp(record.ip);
    setBanId(record.id);
    setContent(
      <>
        <p>确认解封该IP？IP: {record.ip}</p>
      </>,
    );
  };

  useEffect(() => {
    const req = {
      data: {
        pageNum: 1,
        pageSize: 10,
      },
      headers: { token: store.getState().token?.token },
    };
    getBanAPI(req).then((r) => {
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
      banBlurAPI(req).then((r) => {
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
      banDateAPI(req).then((r) => {
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
      getBanAPI(req).then((r) => {
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
      banBlurAPI(req).then((r) => {
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
        },
        headers: { token: store.getState().token?.token },
      };
      unBanAPI(req).then((r) => {});
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
          banBlurAPI(req).then((r) => {
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
          banDateAPI(req).then((r) => {
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
          getBanAPI(req).then((r) => {
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
    console.log(dateStrings);

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
      console.log(req);
      banDateAPI(req).then((r) => {
        setData(r.data);
        setPagination({ ...pagination, total: r.data.total });
      });
    }
  }, [sTime, eTime]);
  return (
    <Card hoverable={true} style={{ cursor: "default" }}>
      <Space style={{ marginBottom: 16 }}>
        <Tooltip placement="topLeft" title="模糊查询ip，封禁原因">
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
        scroll={{ x: 1000, y: 600 }}
        onChange={onChange}
        virtual={true}
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
