import { Card, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { store } from "@/store/user/selector.tsx";
import { getUserById } from "@/api/user.ts";
import { formatDate } from "@/commponents/formatDate.ts";
import GradientButton from "@/views/commponents/colorButton.tsx";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-12-12 15:36:00
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-16 16:37:57
 * @FilePath: src/views/Page13/index.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
const View: React.FC = () => {
  const navigator = useNavigate();
  const [data, setData] = useState<any>();
  const getUser = () => {
    const req = {
      data: {
        id: store.getState().user?.user,
      },
      headers: { token: store.getState().token?.token },
    };
    getUserById(req).then((r) => {
      if (r.code === 200) {
        setData(r.data);
      }
    });
  };
  const logout = () => {
    navigator("/login");
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <Card
      hoverable={true}
      style={{ cursor: "default", height: "85VH" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          lineHeight: "60px",
        }}
      >
        <div style={{ display: "flex" }}>
          <div>手机号：</div>
          <div>{data?.phone}</div>
        </div>
        <div style={{ display: "flex" }}>
          <div>权限：</div>
          <div>{data?.auth}</div>
        </div>
        <div style={{ display: "flex" }}>
          <div>注册时间：</div>
          <div>{formatDate(data?.created)}</div>
        </div>
        <div style={{ display: "flex" }}>
          <div>上次登录：</div>
          <div>{formatDate(data?.lastLogin)}</div>
        </div>
        <div>
          <Popconfirm
            title="确定退出登录吗？"
            onConfirm={() => logout()}
            okText="是"
            cancelText="否"
          >
            <GradientButton
              type="primary"
              size="middle"
              icon={<LogoutOutlined />}
              gradientStartColor="#6a11cb"
              gradientEndColor="#2575fc"
              hoverGradientStartColor="#8ec5fc" // 悬停时的起始颜色
              hoverGradientEndColor="#e0c3fc" // 悬停时的结束颜色
              textColor="#ffefd5" // 默认文字颜色
              hoverTextColor="#000000" // 悬停时的文字颜色
            >
              退出登录
            </GradientButton>
          </Popconfirm>
        </div>
      </div>
    </Card>
  );
};

export default View;
