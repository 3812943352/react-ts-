/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-25 17:11:44
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-14 11:00:33
 * @FilePath: src/views/commponents/table.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Cascader,
  Form,
  Input,
  message,
  Space,
  Table,
  TableColumnsType,
  TableColumnType,
} from "antd";
import Highlighter from "react-highlight-words";
import { toast } from "react-toastify";

type DataIndex<T> = keyof T;

interface TableProps<T> {
  columns: TableColumnsType<T>;
  dataSource: T[];
  pagination: {
    pageNum: number;
    pageSize: number;
    total: number;
    list: T[];
  };
  virtual?: boolean;
  scroll?: { x: number; y: number };
  onChange?: (pagination: any, filters: any, sorter: any) => void;
  rowHoverable?: boolean;
  onEdit?: (record: Partial<T> & { key: React.Key }) => void; // 编辑方法
  onCancel?: () => void; // 取消方法
  isEditing?: (record: T) => boolean; // 判断是否正在编辑
  editingKey?: React.Key | null; // 当前编辑的键
  form?: any;
  setData?: (newData: any) => void;
  data?: any;
  isUploading?: boolean;
}

interface EditableCellProps
  extends React.HTMLAttributes<HTMLElement> {
  dataIndex: string;
  title: any;
  inputType: "text";
  record: any;
  index: number;
  col: any;
  editingKey: any;
  form: any;
  dataSource: any;
  data: any;
  setData: (newData: any) => void;
  isUploading: boolean;
}

const EditableCell: React.FC<
  React.PropsWithChildren<EditableCellProps>
> = ({
  col,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  editingKey,
  form,
  dataSource,
  data,
  setData,
  isUploading,
  ...restProps
}) => {
  const editing = col.editable === true && record.id === editingKey;
  useEffect(() => {
    if (
      dataSource.some((row: any) => row.id === "新增") &&
      record.id !== "新增" &&
      editingKey !== "新增"
    ) {
      const filteredDataSource = dataSource.filter(
        (row: any) => row.id !== "新增",
      );
      const newData = {
        ...data,
        records: filteredDataSource,
      };
      setData(newData);
    }
    if (editing && !isUploading) {
      if (record.id === "新增") {
        form.setFieldsValue({
          [dataIndex]: null,
        });
      } else {
        form.setFieldsValue({
          [dataIndex]: record[dataIndex],
        });
      }
    }
  }, [editing, record, dataIndex, form]);
  const isCascader = col.cascader === true && col.options;

  const inputNode = (
    <Input status={"warning"} placeholder={record[dataIndex]} />
  );
  const cascader = (
    <Cascader
      status="warning"
      options={col.options}
      placeholder={record[dataIndex]}
    />
  );
  const node = isCascader ? cascader : inputNode;
  // 当编辑状态改变时，初始化表单字段
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `请输入${title}！`,
            },
          ]}
        >
          {node}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const CustomTable = <T extends object>({
  columns,
  dataSource,
  pagination,
  virtual,
  scroll,
  onChange,
  rowHoverable,
  onEdit,
  onCancel,
  isEditing,
  editingKey,
  form,
  data,
  isUploading,
  setData,
}: TableProps<T>) => {
  // 搜索相关状态和逻辑
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<Input>(null);

  // 开始编辑某一行

  // 保存编辑内容

  // 为列添加搜索属性
  const getColumnSearchProps = (
    dataIndex: DataIndex<T>,
    title: string,
    col: any,
    form: any,
    dataSource: any,
    data: any,
    setData: (newData: any) => void,
  ): TableColumnType<T> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{ padding: "8px" }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`搜索${title}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(
                selectedKeys as string[],
                confirm,
                dataIndex,
              )
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 60 }}
          >
            搜索
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            重置
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex as string);
            }}
          >
            过滤
          </Button>
          <Button type="link" size="small" onClick={() => close()}>
            关闭
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined
        style={{ color: filtered ? "#1677ff" : undefined }}
      />
    ),
    onFilter: (value: any, record: { [x: string]: any }) =>
      String(record[dataIndex])
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onCell: (record: T, rowIndex: number) => {
      return {
        record,
        col,
        dataIndex,
        form,
        editingKey,
        dataSource,
        data,
        setData,
        isUploading,
        onDoubleClick: (event) => {
          const text = event.target.innerText;
          onDoubleClick(text);
        },
        children:
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{
                backgroundColor: "#ffc069",
                padding: 0,
              }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={String(record[dataIndex])}
            />
          ) : (
            record[dataIndex]
          ),
      };
    },
  });

  // 将每列与搜索属性合并
  const columnsWithSearch = columns.map((col) => ({
    ...col,

    ...getColumnSearchProps(
      col.dataIndex as DataIndex<T>,
      col.title as string,
      col,
      form,
      dataSource,
      data,
      setData,
      isUploading,
    ),
  }));

  // 添加操作列

  // 将分页对象转换成 Ant Design Table 组件所需的格式
  const tablePagination = {
    current: pagination.pageNum,
    pageSize: pagination.pageSize,
    total: pagination.total,
    showSizeChanger: false,
    showQuickJumper: true,
  };

  // 表格的本地化配置
  const locale = {
    filterTitle: "筛选",
    filterConfirm: "确定",
    filterReset: "重置",
    filterEmptyText: "无筛选项",
    filterCheckall: "全选",
    filterSearchPlaceholder: "在筛选项中搜索",
    selectAll: "全选当页",
    selectInvert: "反选当页",
    selectNone: "清空所有",
    selectionAll: "全选所有",
    sortTitle: "排序",
    expand: "展开行",
    collapse: "关闭行",
    triggerDesc: "点击降序",
    triggerAsc: "点击升序",
    cancelSort: "取消排序",
  };

  // 处理搜索
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: { closeDropdown?: boolean }) => void,
    dataIndex: DataIndex<T>,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex as string);
  };

  // 重置搜索
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  // 双击复制文本
  const onDoubleClick = (text: string) => {
    // 确保代码在浏览器环境中运行
    if (typeof document === "undefined") {
      console.error("Document is not available in this environment");
      toast.error("当前环境不支持复制", {
        position: "top-center",
        autoClose: 1000,
        closeOnClick: false,
      });
      return;
    }

    // 创建一个隐藏的 <textarea> 元素
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "absolute";
    textArea.style.left = "-9999px"; // 移出可见区域
    document.body.appendChild(textArea);

    // 选择并复制文本
    try {
      textArea.select();
      textArea.setSelectionRange(0, 99999); // 对于移动设备

      const successful = document.execCommand("copy");
      if (successful) {
        message.success("复制成功");
      } else {
        message.error("复制失败");
      }
    } catch (err) {
      console.error("复制失败", err);
    } finally {
      // 清理
      document.body.removeChild(textArea);
    }
  };

  return (
    <Form form={form} component={false}>
      <Table<T>
        components={{
          body: {
            cell: (props: any) => {
              // 确保 column 和 dataIndex 存在
              return (
                <EditableCell
                  {...props}
                  record={props.record}
                  dataIndex={props.col.dataIndex as string}
                  title={props.col.title}
                  editing={isEditing?.(props.record)}
                  form={form}
                />
              );
            },
          },
        }}
        bordered
        dataSource={dataSource}
        columns={columnsWithSearch}
        rowClassName="editable-row"
        pagination={tablePagination}
        locale={locale}
        virtual={virtual}
        scroll={scroll}
        onChange={onChange}
        rowHoverable={rowHoverable}
        onEdit={onEdit}
        onCancel={onCancel}
        isEditing={isEditing}
        editingKey={editingKey}
        rowKey={(record) => record.id.toString()}
        form={form}
        data={data}
        setData={setData}
      />
    </Form>
  );
};

export default CustomTable;
