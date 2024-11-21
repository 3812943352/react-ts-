/*
 * @Author: wb
 * @Date: 2024-10-31 15:01:55
 * @LastEditors: wb
 * @LastEditTime: 2024-11-04 15:27:48
 * @FilePath: \demo\src\views\Home\index.tsx
 * @Description: 请填写简介
 */
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import { Breadcrumb, Layout, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const View: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <MainMenu />
        <div className="demo-logo-vertical" />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Breadcrumb
            style={{ margin: "16px 0" }}
            className="px-4"
            items={[
              {
                title: "Users",
              },
              {
                title: ":id",
                href: "",
              },
            ]}
            params={{ id: 1 }}
          />
        </Header>
        <Content style={{ margin: "16px 16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default View;
