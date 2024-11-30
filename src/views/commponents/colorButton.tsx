/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-30 14:14:08
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-11-30 15:48:35
 * @FilePath: src/views/commponents/colorButton.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import React from "react";
import { Button } from "antd";
import "./css/GradientButton.css"; // 引入自定义的 CSS 文件

interface GradientButtonProps {
  children?: React.ReactNode;
  type?: "primary" | "default" | "dashed" | "link" | "text";
  size?: "large" | "middle" | "small";
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  gradientStartColor?: string; // 新增属性
  gradientEndColor?: string; // 新增属性
  hoverGradientStartColor?: string; // 悬停时的起始颜色
  hoverGradientEndColor?: string; // 悬停时的结束颜色
  textColor?: string; // 默认文字颜色
  hoverTextColor?: string; // 悬停时的文字颜色
}

const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  type = "primary",
  size = "large",
  icon,
  onClick,
  gradientStartColor = "#6253e1", // 默认值
  gradientEndColor = "#04befe", // 默认值
  hoverGradientStartColor = "#ff6b6b", // 悬停时的默认起始颜色
  hoverGradientEndColor = "#f9c851", // 悬停时的默认结束颜色
  textColor = "#ffffff", // 默认文字颜色
  hoverTextColor = "#000000", // 悬停时的文字颜色
}) => {
  const gradientStyle = {
    "--gradient-start-color": gradientStartColor,
    "--gradient-end-color": gradientEndColor,
    "--hover-gradient-start-color": hoverGradientStartColor,
    "--hover-gradient-end-color": hoverGradientEndColor,
    "--text-color": textColor,
    "--hover-text-color": hoverTextColor,
  };

  return (
    <Button
      type={type}
      size={size}
      icon={icon}
      onClick={onClick}
      className="gradient-button"
      style={gradientStyle} // 应用自定义样式
    >
      {children}
    </Button>
  );
};

export default GradientButton;
