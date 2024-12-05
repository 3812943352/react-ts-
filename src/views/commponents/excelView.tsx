/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-12-05 14:14:08
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-05 15:26:25
 * @FilePath: src/views/commponents/excelView.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import React from "react";
import Spreadsheet from "react-spreadsheet";

interface ExcelViewProps {
  data: any[][];
}

const ExcelView: React.FC<ExcelViewProps> = ({ data }) => {
  // 如果数据为空或未定义，则显示空表格或提示信息
  if (!data || data.length === 0) {
    return <div>No data available.</div>;
  }
  // 将后端返回的数据结构转换为 react-spreadsheet 所需的格式
  const formattedData = data.map((row, rowIndex) =>
    Object.keys(row).map((key) => ({
      value: row[key],
      readOnly: false, // 假设第一行是表头，设置为只读
    })),
  );

  return <Spreadsheet data={formattedData} />;
};

export default ExcelView;
