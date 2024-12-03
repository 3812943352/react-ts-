import CustomTable from "@/views/commponents/table.tsx";
import { Card, Form, Popconfirm, Space, Tooltip } from "antd";
import Search from "antd/es/input/Search";
import React, { ReactNode, useEffect, useState } from "react";
import { banBlurAPI } from "@/api/apiSuperVision.ts";
import { store } from "@/store/user/selector.tsx";
import CustomModal from "@/views/commponents/modal.tsx";
import { toast } from "react-toastify";
import GradientButton from "@/views/commponents/colorButton.tsx";
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { initialRow } from "@/views/Page12/initialRow.ts";
import {
  addAreaAPI,
  deleteAreaAPI,
  departmentBlurAPI,
  getAllAreaAPI,
  updateAreaAPI,
} from "@/api/data.ts";
import { AreaEntity, DepartmentEntity } from "@/types/data.ts";
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
  const [word, setWord] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<ReactNode>();
  const [modalOpen, setModalOpen] = useState(false);
  const [serchBlurValue, setSerchBlurValue] = useState("");
  const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm<T>();

  const handleAdd = () => {
    const { pageSize, total } = pagination;
    const totalPages = Math.ceil(total / pageSize);
    const newPagination = {
      ...pagination,
      pageNum: totalPages,
    };
    const req = {
      data: {
        pageNum: newPagination.pageNum,
        pageSize: newPagination.pageSize,
      },
      headers: { token: store.getState().token?.token },
    };
    getAllAreaAPI(req).then((r) => {
      let newRecords = [...r.data.records];
      if (!newRecords.some((row) => row.id === -1)) {
        const newRowData = { id: "新增", ...initialRow };

        if (
          Math.ceil(newPagination.total / newPagination.pageSize) ===
          Math.floor(newPagination.total / newPagination.pageSize)
        ) {
          newRecords = [newRowData];
          const newData = {
            ...data,
            records: newRecords,
          };
          setEditingKey("新增");
          setData(newData);
          setPagination({
            ...newPagination,
            pageNum: newPagination.pageNum + 1,
            total: r.data.total + 1,
          });
        } else {
          newRecords = [...newRecords, newRowData];
          const newData = {
            ...data,
            records: newRecords,
          };
          setEditingKey("新增");
          setData(newData);
          setPagination({ ...newPagination, total: r.data.total });
        }
      }
    });
  };
  const isEditing = (record: any) => record.id === editingKey;
  const isAdding = (record: any) => record.id === "新增";
  const save = async (record: any) => {
    const row = await form.validateFields();

    for (let key in row) {
      if (Array.isArray(row[key]) && row[key].length > 0) {
        row[key] = row[key][row[key].length - 1];
      }
    }
    const req: DepartmentEntity = {
      id: record.id,
      ...row,
      headers: { token: store.getState().token?.token },
    };

    updateAreaAPI(req).then((r) => {
      if (r.code === 200) {
        const newRecords = data.records.map((item: any) =>
          item.id === record.id ? { ...item, ...row } : item,
        );
        const newData = {
          ...data,
          records: newRecords,
        };
        setData(newData);
        setEditingKey("");
      }
    });
  };
  const delApi = async (record: any) => {
    const row = await form.validateFields();

    for (let key in row) {
      if (Array.isArray(row[key]) && row[key].length > 0) {
        row[key] = row[key][row[key].length - 1];
      }
    }
    const req: AreaEntity = {
      id: record.id,
      ...row,
      headers: { token: store.getState().token?.token },
    };
    deleteAreaAPI(req).then((r) => {
      if (r.code === 200) {
        getApi();
        setEditingKey("");
      }
    });
  };
  const addApi = (record: any) => {
    form.validateFields().then((values) => {
      for (let key in values) {
        if (Array.isArray(values[key]) && values[key].length > 0) {
          values[key] = values[key][values[key].length - 1];
        }
      }
      const req: AreaEntity = {
        ...values,
        headers: { token: store.getState().token?.token },
      };
      addAreaAPI(req).then((r) => {
        if (r.code === 200) {
          getApi();
          setEditingKey("");
        }
      });
    });
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
    const newPagination = {
      ...pagination,
      total: pagination.total - 1,
    };

    if (
      Math.ceil(newPagination.total / newPagination.pageSize) ===
      Math.floor(newPagination.total / newPagination.pageSize)
    ) {
      console.log(1);
      setPagination({
        ...pagination,
        pageNum: pagination.pageNum - 1,
        total: pagination.total - 1,
      });
      const req = {
        data: {
          pageNum: pagination.pageNum - 1,
          pageSize: pagination.pageSize,
        },
        headers: { token: store.getState().token?.token },
      };
      getAllAreaAPI(req).then((r) => {
        if (r.code === 200) {
          console.log(r);
          setData(r.data);
          setEditingKey("");
        }
      });
    } else {
      setEditingKey("");
    }
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "3%",
      sorter: (a: any, b: any) => a.id.length - b.id.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "部门名称",
      dataIndex: "name",
      key: "name",
      width: "5%",
      editable: true,
      sorter: (a: any, b: any) => a.name.length - b.name.length,
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
      title: "创建时间",
      dataIndex: "created",
      key: "created",
      width: "6%",
      sorter: (a: any, b: any) => a.created.length - b.created.length,
      sortDirections: ["descend", "ascend"],
      ellipsis: {
        showTitle: false,
      },
      render: (address: any = "") =>
        address === "" ? (
          ""
        ) : (
          <Tooltip placement="topLeft" title={formatDate(address)}>
            {formatDate(address)}
          </Tooltip>
        ),
    },
    {
      title: "更新时间",
      dataIndex: "updated",
      key: "updated",
      width: "5%",
      sorter: (a: any, b: any) => a.updated.length - b.updated.length,
      sortDirections: ["descend", "ascend"],
      ellipsis: {
        showTitle: false,
      },
      render: (address: any = "") =>
        address === "" ? (
          ""
        ) : (
          <Tooltip placement="topLeft" title={formatDate(address)}>
            {formatDate(address)}
          </Tooltip>
        ),
    },
    {
      title: "操作",
      key: "action",
      width: "7%",
      editable: false,
      dataIndex: "action",
      render: (_: any, record: T) => {
        const editable = isEditing(record);
        const add = isAdding(record);
        return editable ? (
          <span>
            <GradientButton
              type="primary"
              size="middle"
              icon={<CheckOutlined />}
              gradientStartColor="#00b4db "
              gradientEndColor="#7fffd4 "
              hoverGradientStartColor="#00c6fb   " // 悬停时的起始颜色
              hoverGradientEndColor="#005bea   " // 悬停时的结束颜色
              textColor="#000000" // 默认文字颜色
              hoverTextColor="#ffefd5" // 悬停时的文字颜色
              onClick={
                add ? () => addApi(record) : () => save(record)
              }
            >
              {add ? "新增" : "保存"}
            </GradientButton>
            <GradientButton
              type="primary"
              size="middle"
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
            <Popconfirm
              title="确定删除吗？"
              onConfirm={() => delApi(record)}
              okText="是"
              cancelText="否"
            >
              <GradientButton
                type="primary"
                size="middle"
                icon={<EditOutlined />}
                gradientStartColor="#CCCCCC"
                gradientEndColor="#F5F5F5"
                hoverGradientStartColor="#00c6fb" // 悬停时的起始颜色
                hoverGradientEndColor="#005bea" // 悬停时的结束颜色
                textColor="#000000" // 默认文字颜色
                hoverTextColor="#ffefd5" // 悬停时的文字颜色
              >
                删除
              </GradientButton>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    getApi();
  }, []);
  const getApi = () => {
    const req = {
      data: {
        pageNum: pagination.pageNum,
        pageSize: pagination.pageSize,
      },
      headers: { token: store.getState().token?.token },
    };

    getAllAreaAPI(req).then((r) => {
      // console.log(r.data);
      setData(r.data);
      setPagination({ ...pagination, total: r.data.total });
    });
  };
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
      getAllAreaAPI(req).then((r) => {
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
      departmentBlurAPI(req).then((r) => {
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
  };
  const onCancel = () => {
    setModalOpen(false);
  };

  return (
    <Card hoverable={true} style={{ cursor: "default" }}>
      <Space style={{ marginBottom: 16 }}>
        <Tooltip placement="topLeft" title="模糊查询区域名称">
          <Search
            value={serchBlurValue}
            placeholder="查询"
            allowClear
            onChange={(r) => setSerchBlurValue(r.currentTarget.value)}
            onPressEnter={(r) => serchBlur(r.currentTarget.value)}
            onSearch={(value) => serchBlur(value)}
          />
        </Tooltip>
        <GradientButton
          type="primary"
          size="middle"
          icon={<EditOutlined />}
          gradientStartColor="#6a11cb"
          gradientEndColor="#2575fc"
          hoverGradientStartColor="#8ec5fc" // 悬停时的起始颜色
          hoverGradientEndColor="#e0c3fc" // 悬停时的结束颜色
          textColor="#ffefd5" // 默认文字颜色
          hoverTextColor="#000000" // 悬停时的文字颜色
          onClick={() => handleAdd()}
        >
          新增
        </GradientButton>
      </Space>
      <CustomTable
        scroll={{ x: 1000, y: 600 }}
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
        setData={setData}
        data={data}
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
