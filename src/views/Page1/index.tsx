/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-04 09:16:08
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-11-26 14:02:38
 * @FilePath: src/views/Page1/index.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
// import React, { useEffect, useState } from "react";

import CustomTable from "@/views/commponents/table.tsx";
import { Space, TableColumnsType } from "antd";

const View: React.FC = () => {
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      abbress: "New York No. 1 Lake",
    },
    {
      key: "2",
      name: "Joe Black",
      age: 42,
      address: "London No. 1 Lake Park",
      abbress: "New York No. 1 Lake k",
    },
    {
      key: "3",
      name: "Jim Green",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      abbress: "New York No. 1 Lake Pk",
    },
    {
      key: "4",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
      abbress: "New York No. 1 Lake Par",
    },
  ];

  const columns: TableColumnsType<(typeof data)[0]> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: "20%",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Abbress",
      dataIndex: "abbress",
      key: "abbress",
      sorter: (a, b) => a.abbress.length - b.abbress.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <CustomTable
        columns={columns}
        dataSource={data}
        pagination={{
          pageNum: 1,
          pageSize: 10,
          total: 0,
          list: [],
        }}
      />
    </div>
  );
};

export default View;
