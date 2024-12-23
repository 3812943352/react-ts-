/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-12-23 11:34:27
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-23 16:27:38
 * @FilePath: src/views/commponents/scroll.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import React from "react";
import "./scroll.css";
// 导入滚动的cssSeamlessScroll
import CssSeamlessScroll from "./SeamlessScroll/cssSeamlessScroll";

interface IProps {
  header: string[];
  height: number;
  data: object[];
}
const NewBet: React.FC<IProps> = ({ header, height, data }) => {
  return (
    <div className="newBetContent">
      <div className="px-3 text-white">
        <div className="table">
          <div className="header">
            <span>{header[0]}</span>
            <span>{header[1]}</span>
            <span>{header[2]}</span>
            <span>{header[3]}</span>
          </div>
          <div className="scroll" style={{ height: height + "px" }}>
            <CssSeamlessScroll datas={data} direction="up">
              {data.map((_item, _index) => (
                <div className="item">
                  <span>{_item.gameName}</span>
                  <span>{_item.player}</span>
                  <span>{_item.betAmount}</span>
                  <span>{_item.profit}</span>
                </div>
              ))}
            </CssSeamlessScroll>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewBet;
