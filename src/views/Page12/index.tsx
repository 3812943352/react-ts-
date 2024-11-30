/*
 * @Author: wb
 * @Date: 2024-11-04 09:16:08
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-11-30 18:23:47
 * @FilePath: src/views/Page12/index.tsx
 * @Description: 请填写简介
 */
import CustomTable from "@/views/commponents/table.tsx";
import { Card, Form, Space, Tooltip } from "antd";
import Search from "antd/es/input/Search";
import React, { ReactNode, useEffect, useState } from "react";
import { banBlurAPI, delApi, getAllApi, unBanAPI } from "@/api/apiSuperVision.ts";
import { store } from "@/store/user/selector.tsx";
import CustomModal from "@/views/commponents/modal.tsx";
import { toast } from "react-toastify";
import GradientButton from "@/views/commponents/colorButton.tsx";
import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { openMethodOptions } from "@/views/Page12/options/openMethod.ts";
import { ApiSuperVisionOptions } from "@/views/Page12/options/api.ts";
import { apiMethodOptions } from "@/views/Page12/options/apiMethod.ts";
import { apiTableOptions } from "@/views/Page12/options/apiTable.ts";
import { apiControllerOptions } from "@/views/Page12/options/apiController.ts";
import { initialRow } from "@/views/Page12/initialRow.ts";

const View: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    pageNum: 1,
    pageSize: 10,
    total: 0,
    list: [],
  });
  const [isBlur, setIsBlur] = useState(false);
  const [word, setWord] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<ReactNode>();
  const [modalOpen, setModalOpen] = useState(false);
  const [serchBlurValue, setSerchBlurValue] = useState("");
  const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm<T>();

  // 编辑相关状态
  useEffect(() => {
    if (data && data.records) {
      let newRecords = [...data.records];
      if (!newRecords.some((row) => row.id === -1)) {
        const newRowData = { id: -1, ...initialRow };
        newRecords = [...newRecords, newRowData];
        const newData = {
          ...data,
          records: newRecords,
        };
        setData(newData);
      }
    }
  }, [data, setData, initialRow]);
  const isEditing = (record: any) => record.id === editingKey;
  const save = async (record: any) => {
    const row = await form.validateFields();
    console.log(row);
    const updatedData = data.records.map((item: any) =>
      item.id === record.id ? { ...item, ...row } : item,
    );
    console.log("更新数据" + JSON.stringify(updatedData));
    data.records = updatedData;
    setData(data);
    setEditingKey("");
  };

  const edit = (record: any) => {
    // form.setFieldsValue({
    //   [dataIndex]: record[dataIndex],
    // });
    setEditingKey(record.id); // 设置编辑中的键
  };

  // 使用 useEffect 监听 editingKey 的变化
  useEffect(() => {
    if (editingKey !== null) {
    }
  }, [editingKey]);
  const cancel = () => {
    setEditingKey("");
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "3%",
      fixed: "left",
      sorter: (a: any, b: any) => a.id.length - b.id.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "api名",
      dataIndex: "apiTitle",
      key: "apiTitle",
      width: "5%",

      editable: true,
      sorter: (a: { apiTitle: any }, b: { apiTitle: any }) =>
        a.apiTitle.length - b.apiTitle.length,
      sortDirections: ["descend", "ascend"],
      ellipsis: {
        showTitle: false,
      },
      render: (address: any) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "api描述",
      dataIndex: "apiDes",
      key: "apiDes",
      width: "6%",

      editable: true,
      sorter: (a: any, b: any) => a.apiDes.length - b.apiDes.length,
      sortDirections: ["descend", "ascend"],
      ellipsis: {
        showTitle: false,
      },
      render: (address: any) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "开放方式",
      dataIndex: "openMethod",
      key: "openMethod",
      width: "5%",
      editable: true,
      options: openMethodOptions,
      cascader: true,
      sorter: (a: any, b: any) =>
        a.openMethod.length - b.openMethod.length,
      sortDirections: ["descend", "ascend"],
      ellipsis: {
        showTitle: false,
      },
      render: (address: any) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "接口地址",
      dataIndex: "api",
      key: "api",
      width: "5%",
      editable: true,
      cascader: true,
      options: ApiSuperVisionOptions,
      sorter: (a: any, b: any) => a.api.length - b.api.length,
      sortDirections: ["descend", "ascend"],
      ellipsis: {
        showTitle: false,
      },
      render: (address: any) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "api控制器",
      dataIndex: "apiController",
      key: "apiController",
      width: "5%",
      editable: true,
      cascader: true,
      options: apiControllerOptions,
      sorter: (a: any, b: any) =>
        a.apiController.length - b.apiController.length,
      sortDirections: ["descend", "ascend"],
      ellipsis: {
        showTitle: false,
      },
      render: (address: any) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "方法",
      dataIndex: "apiMethod",
      key: "apiMethod",
      width: "5%",
      editable: true,
      cascader: true,
      options: apiMethodOptions,
      sorter: (a: any, b: any) =>
        a.apiMethod.length - b.apiMethod.length,
      sortDirections: ["descend", "ascend"],
      ellipsis: {
        showTitle: false,
      },
      render: (address: any) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "api表名",
      dataIndex: "apiTable",
      key: "apiTable",
      width: "5%",
      cascader: true,
      editable: true,
      options: apiTableOptions,
      sorter: (a: any, b: any) =>
        a.apiTable.length - b.apiTable.length,
      sortDirections: ["descend", "ascend"],
      ellipsis: {
        showTitle: false,
      },
      render: (address: any) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "api数据格式",
      dataIndex: "apiFormat",
      key: "apiFormat",
      width: "5%",
      editable: true,
      sorter: (a: any, b: any) =>
        a.apiFormat.length - b.apiFormat.length,
      sortDirections: ["descend", "ascend"],
      ellipsis: {
        showTitle: false,
      },
      render: (address: any) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "请求示例",
      dataIndex: "apiDes",
      key: "apiDes",
      width: "5%",
      editable: true,
      sorter: (a: any, b: any) => a.apiDemo.length - b.apiDemo.length,
      sortDirections: ["descend", "ascend"],
      ellipsis: {
        showTitle: false,
      },
      render: (address: any) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },

    {
      title: "调用次数",
      dataIndex: "times",
      key: "times",
      width: "4%",
      fixed: "right",
      sorter: (a: any, b: any) => a.times.length - b.times.length,
      sortDirections: ["descend", "ascend"],
      ellipsis: {
        showTitle: false,
      },
      render: (address: any) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "访问次数",
      dataIndex: "visits",
      key: "visits",
      width: "4%",
      fixed: "right",
      sorter: (a: any, b: any) => a.visits.length - b.visits.length,
      sortDirections: ["descend", "ascend"],
      ellipsis: {
        showTitle: false,
      },
      render: (address: any) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "操作",
      key: "action",
      width: "6%",
      editable: false,
      dataIndex: "action",
      fixed: "right",
      render: (_: any, record: T) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <GradientButton
              type="primary"
              size="small"
              icon={<CheckOutlined />}
              gradientStartColor="#00b4db "
              gradientEndColor="#7fffd4 "
              hoverGradientStartColor="#00c6fb   " // 悬停时的起始颜色
              hoverGradientEndColor="#005bea   " // 悬停时的结束颜色
              textColor="#000000" // 默认文字颜色
              hoverTextColor="#ffefd5" // 悬停时的文字颜色
              onClick={() => save(record)}
            >
              保存
            </GradientButton>
            <GradientButton
              type="primary"
              size="small"
              icon={<CloseOutlined />}
              gradientStartColor="#F5F5F5  "
              gradientEndColor="#CCCCCC  "
              hoverGradientStartColor="#BDBDBD  " // 悬停时的起始颜色
              hoverGradientEndColor="#E0E0E0  " // 悬停时的结束颜色
              textColor="#000000" // 默认文字颜色
              hoverTextColor="#696969" // 悬停时的文字颜色
              onClick={cancel}
            >
              取消
            </GradientButton>
          </span>
        ) : (
          <>
            <GradientButton
              type="primary"
              size="middle"
              icon={<EditOutlined />}
              gradientStartColor="#ff6b6b"
              gradientEndColor="#f9c851"
              hoverGradientStartColor="#ff9900" // 悬停时的起始颜色
              hoverGradientEndColor="#ff0066" // 悬停时的结束颜色
              textColor="#000000" // 默认文字颜色
              hoverTextColor="#ffefd5" // 悬停时的文字颜色
              onClick={() => edit(record)}
            >
              编辑
            </GradientButton>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    const req = {
      data: {
        pageNum: 1,
        pageSize: 10,
      },
      headers: { token: store.getState().token?.token },
    };

    getAllApi(req).then((r) => {
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
    } else {
      const req = {
        data: {
          pageNum: pagination.current,
          pageSize: pagination.pageSize,
        },
        headers: { token: store.getState().token?.token },
      };
      getAllApi(req).then((r) => {
        setData(r.data);
        setPagination({ ...pagination, total: r.data.total });
      });
    }
  };
  const serchBlur = (value: string) => {
    if (value !== "") {
      setIsBlur(true);
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
        } else {
          const req = {
            data: {
              pageNum: pagination.pageNum,
              pageSize: pagination.pageSize,
            },
            headers: { token: store.getState().token?.token },
          };
          getAllApi(req).then((r) => {
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
      </Space>
      <CustomTable
        scroll={{ x: 2000, y: 600 }}
        onChange={onChange}
        virtual={true}
        columns={columns}
        dataSource={data.records}
        pagination={pagination}
        rowHoverable={true}
        onEdit={edit}
        onCancel={cancel}
        isEditing={isEditing}
        editingKey={editingKey}
        form={form}
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
