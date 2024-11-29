import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
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
}

const CustomTable = <T extends object>({
  columns,
  dataSource,
  pagination,
  virtual,
  scroll,
  onChange,
  rowHoverable,
}: TableProps<T>) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<Input>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: { closeDropdown?: boolean }) => void,
    dataIndex: DataIndex<T>,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex as string);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };
  const onDoubleClick = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("复制成功", {
          position: "top-center",
          autoClose: 1000,
          closeOnClick: false,
        });
      })
      .catch((err) => {
        toast.error("复制失败" + err, {
          position: "top-center",
          autoClose: 1000,
          closeOnClick: false,
        });
      });
  };
  const getColumnSearchProps = (
    dataIndex: DataIndex<T>,
    title: string,
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
          placeholder={`Search ${title}`}
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
    onCell: (record: T, rowIndex: number) => ({
      onDoubleClick: (event) => {
        // 获取当前单元格的内容
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
    }),
  });

  const columnsWithSearch = columns.map((col) => ({
    ...col,
    ...getColumnSearchProps(
      col.dataIndex as DataIndex<T>,
      col.title as string,
    ),
  }));

  // 将 pagination 对象转换成 Ant Design Table 组件所需的格式
  const tablePagination = {
    current: pagination.pageNum,
    pageSize: pagination.pageSize,
    total: pagination.total,
    data: pagination.list,
    showSizeChanger: false,
    showQuickJumper: true,
  };
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
  return (
    <Table<T>
      locale={locale}
      virtual={virtual}
      scroll={scroll}
      onChange={onChange}
      columns={columnsWithSearch}
      dataSource={dataSource}
      pagination={tablePagination}
      rowHoverable={rowHoverable}
    />
  );
};

export default CustomTable;
