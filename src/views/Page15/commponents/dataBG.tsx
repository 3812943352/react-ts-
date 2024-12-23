/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-12-23 09:01:25
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-23 14:49:34
 * @FilePath: src/views/Page15/commponents/dataBG.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import "./dataBG.css";
import React from "react";

interface IProps {
  title: string;
}
const View: React.FC<IProps> = ({ title }) => {
  return <h1 className="cyberpunk">{title}</h1>;
};

export default View;
