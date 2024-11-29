/*
 * @Author: wb
 * @Date: 2024-11-04 15:20:38
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-11-29 11:06:26
 * @FilePath: src/views/Home/components/MainMenu.tsx
 * @Description: 请填写简介
 */

import type { MenuProps } from "antd";
import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BankOutlined,
  DatabaseOutlined,
  DesktopOutlined,
  PieChartOutlined,
  StockOutlined,
  UserOutlined,
} from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("基础数据", "/page1", <PieChartOutlined />),
  getItem("趋势数据", "/page2", <StockOutlined />),
  getItem("部门区域", "sub1", <BankOutlined />, [
    getItem("市级部门管理", "/department/page3"),
    getItem("区域管理", "/area/page4"),
  ]),
  getItem("Api访问监测", "sub2", <DesktopOutlined />, [
    getItem("请求列表", "/req/page5"),
    getItem("封禁列表", "/supervision/page11"),
    getItem("Api管理", "/supervision/page12"),
    getItem("监测分析", "/supervision/page6"),
  ]),
  getItem("数据管理", "sub3", <DatabaseOutlined />, [
    getItem("数据集管理", "/data/page7"),
    getItem("数据集api管理", "/data/page8"),
  ]),

  getItem("用户", "sub4", <UserOutlined />, [
    getItem("权限管理", "/user/page9"),
    getItem("用户管理", "/user/page10"),
  ]),
];
const Comp: React.FC = () => {
  const Routelocation = useLocation();
  const navigateTo = useNavigate();
  let firstOpenKey: string[] = JSON.parse(
    localStorage.getItem("openKeys") || "[]",
  );

  const [openKeys, setOpenKeys] = useState([firstOpenKey[0]]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([
    Routelocation.pathname,
  ]);
  useEffect(() => {
    localStorage.setItem(
      "selectedKeys",
      JSON.stringify(selectedKeys),
    );
  }, [selectedKeys]);
  useEffect(() => {
    localStorage.setItem("openKeys", JSON.stringify(openKeys));
  }, [openKeys]);
  const selectKeys = () => {
    const pagex = /^\/page\d$/;
    if (pagex.test(Routelocation.pathname)) {
      localStorage.setItem("openKeys", JSON.stringify([]));
    }

    const savedOpenKeys = JSON.parse(
      localStorage.getItem("openKeys") || "[]",
    );
    const savedSelectedKeys = JSON.parse(
      localStorage.getItem("selectedKeys") || "[]",
    );
    if (savedOpenKeys === null) {
      return;
    } else {
      setOpenKeys(savedOpenKeys);
    }
    if (savedSelectedKeys === null) {
      return;
    } else {
      setSelectedKeys(savedSelectedKeys);
    }
  };
  useEffect(() => {
    selectKeys();
  }, []);
  const menuClick = (e: { key: string }) => {
    setSelectedKeys([e.key]);
    navigateTo(e.key);
  };

  const handleOpenChange = (openKeys: string[]) => {
    openKeys = [openKeys[openKeys.length - 1]];
    setOpenKeys(openKeys);

    for (let i = 0; i < items.length; i++) {
      if (items[i]?.key === openKeys[0]) {
        Routelocation.pathname = (items[i] as any)?.children[0].key;
        setSelectedKeys([Routelocation.pathname]);
        navigateTo(Routelocation.pathname);

        // setSelectedKeys([(items[i] as any)?.children[0].key]);
      }
    }
  };
  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={[Routelocation.pathname]}
      selectedKeys={selectedKeys}
      mode="inline"
      items={items}
      onClick={menuClick}
      onOpenChange={handleOpenChange}
      openKeys={openKeys}
    />
  );
};
export default Comp;
