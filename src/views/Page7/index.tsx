/*
 * @Author: wb
 * @Date: 2024-11-04 09:16:08
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-17 15:43:38
 * @FilePath: src/views/Page7/index.tsx
 * @Description: 请填写简介
 */
import CustomTable from "@/views/commponents/table.tsx";
import {
  Button,
  Card,
  Empty,
  Form,
  message,
  Pagination,
  Popconfirm,
  Progress,
  Space,
  Spin,
  Tooltip,
} from "antd";

import Search from "antd/es/input/Search";
import React, { ReactNode, useEffect, useState } from "react";
import { addApiApi, banBlurAPI } from "@/api/apiSuperVision.ts";
import { store } from "@/store/user/selector.tsx";
import CustomModal from "@/views/commponents/modal.tsx";
import { toast } from "react-toastify";
import GradientButton from "@/views/commponents/colorButton.tsx";
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { openMethodOptions } from "@/views/Page12/options/openMethod.ts";
import { initialRow } from "@/views/Page12/initialRow.ts";
import {
  ApiEntity,
  delDataType,
  getDateDataType,
} from "@/types/apiSuperVision.ts";
import {
  dataBlurAPI,
  dataDateAPI,
  deleteAPI,
  getAreaAPI,
  getDepartmentAPI,
  getFileAPI,
  readexcelAPI,
} from "@/api/data.ts";
import { formatDate } from "@/commponents/formatDate.ts";
import FileUploader from "@/views/commponents/upload.tsx";
import axios from "axios";
import TimePicke from "@/commponents/datePicker";
import { Dayjs } from "dayjs";
import { timeToUnix } from "@/commponents/timeToUnix.ts";
import ExcelView from "@/views/commponents/excelView.tsx";
import { excelDataType } from "@/types/data.ts";

const View: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    pageNum: 1,
    pageSize: 10,
    total: 0,
    list: [],
  });
  const [isMangage, setManage] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [word, setWord] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<ReactNode>();
  const [modalOpen, setModalOpen] = useState(false);
  const [serchBlurValue, setSerchBlurValue] = useState("");
  const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm<T>();
  const [form1] = Form.useForm<T>();

  const [area, setArea] = useState<any[]>([]);
  const [department, setDepartment] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [fileList, setFileList] = useState<File[]>([]);
  // 存储选择的文件
  const [uploadProgress, setUploadProgress] = useState<number>(0); // 控制上传进度
  // 处理文件选择的回调函数
  const [uploading, setUploading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [serchDateValue, setSerchDateValue] = useState<
    [Dayjs, Dayjs] | null
  >(null);
  const [isDate, setIsDate] = useState(false);
  const [sTime, setSTime] = useState(0);
  const [eTime, setETime] = useState(0);
  const [excelData, setExcelData] = useState([]);
  const [sheett, setSheett] = useState(0);
  const [excelPagination, setExcelPagination] = useState({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  });
  const [excelID, setExcelID] = useState(0);
  const [sheetList, setSheetList] = useState([]);

  useEffect(() => {
    if (store.getState().outh?.outh === "管理") {
      setManage(true);
    } else {
      setManage(false);
    }
  }, []);
  const copy = (record: any) => {
    const url = `${import.meta.env.VITE_API_URL}/data/download?filename=${encodeURIComponent(record.filename)}`;

    // 创建一个隐藏的 <textarea> 元素
    const textarea = document.createElement("textarea");
    textarea.value = url;
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px"; // 移出可见区域
    document.body.appendChild(textarea);

    // 选择并复制文本
    textarea.select();
    textarea.setSelectionRange(0, 99999); // 对于移动设备

    try {
      const successful = document.execCommand("copy");
      if (successful) {
        message.success("复制成功");
      } else {
        message.error("复制失败");
      }
    } catch (err) {
      console.error("Failed to copy text: ", err);
      message.error("复制失败");
    } finally {
      // 清理
      document.body.removeChild(textarea);
    }
  };
  const download = (record: any) => {
    axios({
      url: "/api/data/download",
      method: "GET",
      params: {
        filename: record.filename,
      },
      headers: {
        token: store.getState().token?.token, // 注意 token 的格式
      },
      responseType: "blob", // 设置响应类型为 blob
    })
      .then((response) => {
        const url = window.URL.createObjectURL(
          new Blob([response.data]),
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", record.name); // 设置下载文件名
        document.body.appendChild(link);
        link.click();
        link.remove(); // 下载完成后移除 a 标签
        window.URL.revokeObjectURL(url); // 释放对象 URL
      })
      .catch((error) => {
        if (error.response.status === 404) {
          toast.error("文件链接已失效，请刷新页面");
        }
      });
  };
  const handleSheetClick = (sheet: number) => {
    setSheett(sheet);

    setExcelData([]);
    setContent(
      <>
        <Spin size="large" />
      </>,
    );
    getExceldata(excelID, 1, excelPagination.pageSize, sheet);
  };
  const excelChange = (page: number) => {
    setExcelPagination({
      pageSize: excelPagination.pageSize,
      total: excelPagination.total,
      pageNum: page,
    });
    setExcelData([]);
    setContent(
      <>
        <Spin size="large" />
      </>,
    );
    getExceldata(excelID, page, excelPagination.pageSize, sheett);
  };
  const getExceldata = (id, pageNum, pageSize, sheet) => {
    const req: excelDataType = {
      data: {
        ID: id,
        sheet: sheet,
        pageNum: pageNum,
        pageSize: pageSize,
      },
      headers: { token: store.getState().token?.token },
    };

    readexcelAPI(req).then((r) => {
      if (r.data.total === 0) {
        setContent(
          <>
            <Empty />
          </>,
        );
      } else {
        setExcelPagination({
          pageNum: excelPagination.pageNum,
          pageSize: excelPagination.pageSize,
          total: r.data.total,
        });
        setExcelData(r.data.data);
        setSheetList(r.data.sheet);
      }
    });
  };
  const Preview = (record: any) => {
    setExcelData([]);
    setContent(
      <>
        <Spin size="large" />
      </>,
    );
    setTitle("文件:" + record.name + "预览");
    setExcelID(record.id);
    getExceldata(
      record.id,
      excelPagination.pageNum,
      excelPagination.pageSize,
      sheett,
    );
    setModalOpen(true);
  };
  useEffect(() => {
    if (modalOpen && excelData.length > 0) {
      setContent(
        <>
          <ExcelView data={excelData} />
          <div style={{ display: "flex", marginBottom: "20px" }}>
            {sheetList.map((sheet, index) => (
              <Button
                key={index}
                style={{ margin: "0 5px" }}
                size={"small"}
                color="default"
                variant={index === sheett ? "solid" : "outlined"}
                className="sheet-button"
                onClick={() => handleSheetClick(sheet.sheetNo)}
              >
                {sheet.sheetName}
              </Button>
            ))}

            <Pagination
              style={{ marginLeft: "auto" }}
              simple
              defaultCurrent={1}
              total={excelPagination.total}
              onChange={excelChange}
            />
          </div>
        </>,
      );
    }
  }, [modalOpen, excelData, excelPagination]);

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
          ID: store.getState().user?.user,
        },
        headers: { token: store.getState().token?.token },
      };
      dataDateAPI(req).then((r) => {
        setData(r.data);
        setPagination({ ...pagination, total: r.data.total });
      });
    }
  }, [sTime, eTime]);
  const onFileSelect = async (selectedFile: File) => {
    setIsUploading(true);
    setFileList([selectedFile]);
    setFile(selectedFile);
    message.success(`${selectedFile.name} 已准备好上传`);
  };

  const onRemove = () => {
    setFileList([]);
  };
  // 触发上传的函数
  const handleUpload = async () => {
    const row = await form.validateFields();
    for (let key in row) {
      if (Array.isArray(row[key]) && row[key].length > 0) {
        row[key] = row[key][row[key].length - 1];
      }
    }
    if (!file) {
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("uploader", store.getState().user?.user);
    formData.append("area", row.area);
    formData.append("dataDes", row.dataDes);
    formData.append("department", row.department);
    formData.append("openMethod", row.openMethod);

    try {
      const r = await axios.post(
        "/api/data/upload", // 确认API端点是否正确
        formData,
        {
          headers: {
            token: store.getState().token?.token,
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.lengthComputable) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total,
              );
              setUploadProgress(percentCompleted);
            }
          },
        },
      );
      if (r.data.code === 200) {
        getApi();
        setEditingKey("");
        toast.success(r.data.message, {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: false,
        });
      } else {
        toast.error(r.data.message, {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: false,
        });
      }

      setUploading(false);
    } catch (error) {
      console.error("文件上传失败:", error);
      setUploading(false);
    }
  };
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
        user: store.getState().user?.user,
      },
      headers: { token: store.getState().token?.token },
    };
    getFileAPI(req).then((r) => {
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
    setUploading(true);
    const formData = new FormData();
    if (file) {
      formData.append("file", file); // 仅在 file 不为 null 时添加
    }
    formData.append("id", record.id);
    formData.append("uploader", store.getState().user?.user);
    formData.append("area", row.area);
    formData.append("dataDes", row.dataDes);
    formData.append("department", row.department);
    formData.append("openMethod", row.openMethod);
    try {
      const r = await axios.post(
        "/api/data/update", // 确认API端点是否正确
        formData,
        {
          headers: {
            token: store.getState().token?.token,
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.lengthComputable) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total,
              );
              setUploadProgress(percentCompleted);
            }
          },
        },
      );
      if (r.data.code === 200) {
        getApi();
        setEditingKey("");
        toast.success(r.data.message, {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: false,
        });
        const newRecords = data.records.map((item: any) =>
          item.id === record.id ? { ...item, ...row } : item,
        );
        const newData = {
          ...data,
          records: newRecords,
        };
        setData(newData);
        setEditingKey("");
      } else {
        toast.error(r.data.message, {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: false,
        });
      }

      setUploading(false);
    } catch (error) {
      console.error("文件上传失败:", error);
      setUploading(false);
    }
  };
  const delApi = async (record: any) => {
    const req: delDataType = {
      data: {
        ID: record.id,
      },
      headers: { token: store.getState().token?.token },
    };
    deleteAPI(req).then((r) => {
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
      const req: ApiEntity = {
        ...values,
        headers: { token: store.getState().token?.token },
      };
      addApiApi(req).then((r) => {
        if (r.code === 200) {
          getApi();
          setEditingKey("");
        }
      });
    });
  };
  const edit = (record: any) => {
    setEditingKey(record.id); // 设置编辑中的键
  };

  useEffect(() => {
    if (editingKey !== null) {
    }
  }, [editingKey]);
  const cancel = () => {
    setIsUploading(false);
    setFile(null);
    setFileList([]);
    const newPagination = {
      ...pagination,
      total: pagination.total - 1,
    };
    if (
      Math.ceil(newPagination.total / newPagination.pageSize) ===
      Math.floor(newPagination.total / newPagination.pageSize)
    ) {
      if (pagination.total <= pagination.pageSize) {
        setPagination({
          ...pagination,
          pageNum: pagination.pageNum,
          total: pagination.total,
        });
        const req = {
          data: {
            pageNum: pagination.pageNum,
            pageSize: pagination.pageSize,
            user: store.getState().user?.user,
          },
          headers: { token: store.getState().token?.token },
        };
        getFileAPI(req).then((r) => {
          if (r.code === 200) {
            setData(r.data);
            setEditingKey("");
          }
        });
      } else {
        setPagination({
          ...pagination,
          pageNum: pagination.pageNum - 1,
          total: pagination.total - 1,
        });
        const req = {
          data: {
            pageNum: pagination.pageNum - 1,
            pageSize: pagination.pageSize,
            user: store.getState().user?.user,
          },
          headers: { token: store.getState().token?.token },
        };
        getFileAPI(req).then((r) => {
          if (r.code === 200) {
            setData(r.data);
            setEditingKey("");
          }
        });
      }
    } else {
      setEditingKey("");
    }
  };
  const columns = isMangage
    ? [
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
          width: "3%",
          fixed: "left",
          sorter: (a: any, b: any) => a.id.length - b.id.length,
          sortDirections: ["descend", "ascend"],
          ellipsis: {
            showTitle: false,
          },
          render: (_: any, record: any) => (
            <Tooltip
              placement="topLeft"
              title={"点击预览" + record.name}
            >
              <div
                style={{ cursor: "pointer" }}
                onClick={() => Preview(record)}
              >
                {record.id}
              </div>
            </Tooltip>
          ),
        },
        {
          title: "数据集名称",
          dataIndex: "name",
          key: "name",
          width: "5%",
          sorter: (a: { name: any }, b: { name: any }) =>
            a.name.length - b.name.length,
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
          title: "上传者",
          dataIndex: "uploader",
          key: "uploader",
          width: "5%",
          sorter: (a: { uploader: any }, b: { uploader: any }) =>
            a.uploader.length - b.uploader.length,
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
          title: "数据集描述",
          dataIndex: "dataDes",
          key: "dataDes",
          width: "6%",

          editable: true,
          sorter: (a: any, b: any) =>
            a.dataDes.length - b.dataDes.length,
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
          width: "4%",
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
          title: "所属部门",
          dataIndex: "department",
          key: "department",
          width: "4%",
          editable: true,
          cascader: true,
          options: department,
          sorter: (a: any, b: any) =>
            a.department.length - b.department.length,
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
          title: "所属区域",
          dataIndex: "area",
          key: "area",
          width: "4%",
          editable: true,
          cascader: true,
          options: area,
          sorter: (a: any, b: any) => a.area.length - b.area.length,
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
          title: "下载次数",
          dataIndex: "downloads",
          key: "downloads",
          width: "4%",
          sorter: (a: any, b: any) =>
            a.downloads.length - b.downloads.length,
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
          title: "数据集大小",
          dataIndex: "datas",
          key: "datas",
          width: "5%",
          sorter: (a: any, b: any) => a.datas.length - b.datas.length,
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
          title: "上传时间",
          dataIndex: "uploadTime",
          key: "uploadTime",
          width: "6%",
          sorter: (a: any, b: any) =>
            a.uploadTime.length - b.uploadTime.length,
          sortDirections: ["descend", "ascend"],
          ellipsis: {
            showTitle: false,
          },
          render: (address: any = "") =>
            address === "" ? (
              ""
            ) : (
              <Tooltip
                placement="topLeft"
                title={formatDate(address)}
              >
                {formatDate(address)}
              </Tooltip>
            ),
        },
        {
          title: "更新时间",
          dataIndex: "updateTime",
          key: "updateTime",
          width: "6%",
          sorter: (a: any, b: any) =>
            a.updateTime.length - b.updateTime.length,
          sortDirections: ["descend", "ascend"],
          ellipsis: {
            showTitle: false,
          },
          render: (address: any = "") =>
            address === "" ? (
              ""
            ) : (
              <Tooltip
                placement="topLeft"
                title={formatDate(address)}
              >
                {formatDate(address)}
              </Tooltip>
            ),
        },
        {
          title: "资源文件",
          dataIndex: "filename",
          key: "filename",
          width: "7%",
          fixed: "right",
          ellipsis: {
            showTitle: false,
          },
          render: (_: any, record: T) => {
            const editable = isEditing(record);
            return editable ? (
              <>
                <FileUploader
                  onFileSelect={onFileSelect}
                  fileList={fileList}
                  onRemove={onRemove}
                  form={form1}
                />
                {uploading ? "正在上传..." : ""}

                {uploading && (
                  <Progress
                    percent={uploadProgress}
                    status={
                      uploadProgress === 100 ? "success" : undefined
                    }
                    strokeColor={{
                      "0%": "#e91010",
                      "100%": "#0037ff",
                    }}
                    strokeWidth={3}
                  />
                )}
              </>
            ) : (
              <span>
                {/*<GradientButton*/}
                {/*  type="primary"*/}
                {/*  size="middle"*/}
                {/*  icon={<CheckOutlined />}*/}
                {/*  gradientStartColor="#00b4db "*/}
                {/*  gradientEndColor="#7fffd4 "*/}
                {/*  hoverGradientStartColor="#00c6fb   " // 悬停时的起始颜色*/}
                {/*  hoverGradientEndColor="#005bea   " // 悬停时的结束颜色*/}
                {/*  textColor="#000000" // 默认文字颜色*/}
                {/*  hoverTextColor="#ffefd5" // 悬停时的文字颜色*/}
                {/*  onClick={() => download(record)}*/}
                {/*>*/}
                {/*  下载*/}
                {/*</GradientButton>*/}
                <GradientButton
                  type="primary"
                  size="middle"
                  icon={<CheckOutlined />}
                  gradientStartColor="#F5F5F5  "
                  gradientEndColor="#CCCCCC  "
                  hoverGradientStartColor="#BDBDBD  " // 悬停时的起始颜色
                  hoverGradientEndColor="#E0E0E0  " // 悬停时的结束颜色
                  textColor="#000000" // 默认文字颜色
                  hoverTextColor="#696969" // 悬停时的文字颜色
                  onClick={() => {
                    copy(record);
                  }}
                >
                  复制链接
                </GradientButton>
              </span>
            );
          },
        },
        {
          title: "操作",
          key: "action",
          width: "6.2%",
          editable: false,
          dataIndex: "action",
          fixed: "right",
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
                    add ? () => handleUpload() : () => save(record)
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
      ]
    : [
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
          width: "3%",
          fixed: "left",
          sorter: (a: any, b: any) => a.id.length - b.id.length,
          sortDirections: ["descend", "ascend"],
          ellipsis: {
            showTitle: false,
          },
          render: (_: any, record: any) => (
            <Tooltip
              placement="topLeft"
              title={"点击预览" + record.name}
            >
              <div
                style={{ cursor: "pointer" }}
                onClick={() => Preview(record)}
              >
                {record.id}
              </div>
            </Tooltip>
          ),
        },
        {
          title: "数据集名称",
          dataIndex: "name",
          key: "name",
          width: "5%",
          sorter: (a: { name: any }, b: { name: any }) =>
            a.name.length - b.name.length,
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
          title: "上传者",
          dataIndex: "uploader",
          key: "uploader",
          width: "5%",
          sorter: (a: { uploader: any }, b: { uploader: any }) =>
            a.uploader.length - b.uploader.length,
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
          title: "数据集描述",
          dataIndex: "dataDes",
          key: "dataDes",
          width: "6%",

          editable: true,
          sorter: (a: any, b: any) =>
            a.dataDes.length - b.dataDes.length,
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
          title: "所属部门",
          dataIndex: "department",
          key: "department",
          width: "4%",
          editable: true,
          cascader: true,
          options: department,
          sorter: (a: any, b: any) =>
            a.department.length - b.department.length,
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
          title: "所属区域",
          dataIndex: "area",
          key: "area",
          width: "4%",
          editable: true,
          cascader: true,
          options: area,
          sorter: (a: any, b: any) => a.area.length - b.area.length,
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
          title: "下载次数",
          dataIndex: "downloads",
          key: "downloads",
          width: "4%",
          sorter: (a: any, b: any) =>
            a.downloads.length - b.downloads.length,
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
          title: "数据集大小",
          dataIndex: "datas",
          key: "datas",
          width: "5%",
          sorter: (a: any, b: any) => a.datas.length - b.datas.length,
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
          title: "上传时间",
          dataIndex: "uploadTime",
          key: "uploadTime",
          width: "6%",
          sorter: (a: any, b: any) =>
            a.uploadTime.length - b.uploadTime.length,
          sortDirections: ["descend", "ascend"],
          ellipsis: {
            showTitle: false,
          },
          render: (address: any = "") =>
            address === "" ? (
              ""
            ) : (
              <Tooltip
                placement="topLeft"
                title={formatDate(address)}
              >
                {formatDate(address)}
              </Tooltip>
            ),
        },
        {
          title: "更新时间",
          dataIndex: "updateTime",
          key: "updateTime",
          width: "6%",
          sorter: (a: any, b: any) =>
            a.updateTime.length - b.updateTime.length,
          sortDirections: ["descend", "ascend"],
          ellipsis: {
            showTitle: false,
          },
          render: (address: any = "") =>
            address === "" ? (
              ""
            ) : (
              <Tooltip
                placement="topLeft"
                title={formatDate(address)}
              >
                {formatDate(address)}
              </Tooltip>
            ),
        },
        {
          title: "资源文件",
          dataIndex: "filename",
          key: "filename",
          width: "7%",
          fixed: "right",
          ellipsis: {
            showTitle: false,
          },
          render: (_: any, record: T) => {
            const editable = isEditing(record);
            return editable ? (
              <>
                <FileUploader
                  onFileSelect={onFileSelect}
                  fileList={fileList}
                  onRemove={onRemove}
                  form={form1}
                />
                {uploading ? "正在上传..." : ""}

                {uploading && (
                  <Progress
                    percent={uploadProgress}
                    status={
                      uploadProgress === 100 ? "success" : undefined
                    }
                    strokeColor={{
                      "0%": "#e91010",
                      "100%": "#0037ff",
                    }}
                    strokeWidth={3}
                  />
                )}
              </>
            ) : (
              <span>
                {/*<GradientButton*/}
                {/*  type="primary"*/}
                {/*  size="middle"*/}
                {/*  icon={<CheckOutlined />}*/}
                {/*  gradientStartColor="#00b4db "*/}
                {/*  gradientEndColor="#7fffd4 "*/}
                {/*  hoverGradientStartColor="#00c6fb   " // 悬停时的起始颜色*/}
                {/*  hoverGradientEndColor="#005bea   " // 悬停时的结束颜色*/}
                {/*  textColor="#000000" // 默认文字颜色*/}
                {/*  hoverTextColor="#ffefd5" // 悬停时的文字颜色*/}
                {/*  onClick={() => download(record)}*/}
                {/*>*/}
                {/*  下载*/}
                {/*</GradientButton>*/}
                <GradientButton
                  type="primary"
                  size="middle"
                  icon={<CheckOutlined />}
                  gradientStartColor="#F5F5F5  "
                  gradientEndColor="#CCCCCC  "
                  hoverGradientStartColor="#BDBDBD  " // 悬停时的起始颜色
                  hoverGradientEndColor="#E0E0E0  " // 悬停时的结束颜色
                  textColor="#000000" // 默认文字颜色
                  hoverTextColor="#696969" // 悬停时的文字颜色
                  onClick={() => {
                    copy(record);
                  }}
                >
                  复制链接
                </GradientButton>
              </span>
            );
          },
        },
      ];

  useEffect(() => {
    getArea();
    getDepartment();
    getApi();
  }, []);
  const getApi = () => {
    const req = {
      data: {
        pageNum: pagination.pageNum,
        pageSize: pagination.pageSize,
        user: store.getState().user?.user,
      },
      headers: { token: store.getState().token?.token },
    };

    getFileAPI(req).then((r) => {
      setData(r.data);
      setPagination({ ...pagination, total: r.data.total });
    });
  };
  const getArea = () => {
    getAreaAPI().then((r) => {
      const areaOptions = r.data.map((item: any) => ({
        label: item,
        value: item,
      }));
      setArea(areaOptions);
    });
  };
  const getDepartment = () => {
    getDepartmentAPI().then((r) => {
      const departmentOptions = r.data.map((item: any) => ({
        label: item,
        value: item,
      }));
      setDepartment(departmentOptions);
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
          user: store.getState().user?.user,
        },
        headers: { token: store.getState().token?.token },
      };
      getFileAPI(req).then((r) => {
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
          ID: store.getState().user?.user,
        },
        headers: { token: store.getState().token?.token },
      };
      dataBlurAPI(req).then((r) => {
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

  return isMangage ? (
    <Card hoverable={true} style={{ cursor: "default" }}>
      <Space style={{ marginBottom: 16 }}>
        <Tooltip
          placement="topLeft"
          title="模糊查询数据集名称，数据集描述"
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
        单击ID栏预览对应文件，每次下载后链接重置，请刷新页面获取新链接
      </Space>
      <CustomTable
        scroll={{ x: 2200, y: 600 }}
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
        isUploading={isUploading}
      />

      <CustomModal
        width={1200}
        title={title}
        content={content}
        modalOpen={modalOpen}
        onCancel={onCancel}
        onOk={onOk}
      ></CustomModal>
    </Card>
  ) : (
    <Card hoverable={true} style={{ cursor: "default" }}>
      <Space style={{ marginBottom: 16 }}>
        <Tooltip
          placement="topLeft"
          title="模糊查询数据集名称，数据集描述"
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
        单击ID栏预览对应文件，每次下载后链接重置，请刷新页面获取新链接
      </Space>
      <CustomTable
        scroll={{ x: 2200, y: 600 }}
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
        isUploading={isUploading}
      />

      <CustomModal
        width={1200}
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
