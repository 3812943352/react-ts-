/*
 * @Author: wb
 * @Date: 2024-10-31 15:01:55
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-22 10:34:51
 * @FilePath: src/views/Home/index.tsx
 * @Description: 请填写简介
 */
import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import { Breadcrumb, Layout, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const View: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { pathname } = useLocation();

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
                title: pathname,
              },
            ]}
          />
        </Header>
        <Content style={{ margin: "16px 16px" }}>
          <div
            style={{
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          阳光数安数据开放平台 2006 - {new Date().getFullYear()}{" "}
          Created by 阳光数安<sup>®</sup>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default View;
