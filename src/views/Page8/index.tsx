/*
 * @Author: wb
 * @Date: 2024-11-04 09:16:08
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-05 12:32:45
 * @FilePath: src/views/Page8/index.tsx
 * @Description: 请填写简介
 */

import React from "react";
import Spreadsheet from "react-spreadsheet";

const View: React.FC = () => {
  const data = [
    [{ value: "Vanilla", readOnly: true }, { value: "Chocolate" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
  ];
  return <Spreadsheet data={data} />;
};

export default View;
