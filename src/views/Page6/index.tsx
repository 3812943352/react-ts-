/*
 * @Author: wb
 * @Date: 2024-11-04 09:16:08
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-09 09:33:04
 * @FilePath: src/views/Page6/index.tsx
 * @Description: 请填写简介
 */
import Line from "@/views/commponents/echarts/Line.tsx";
import { Card } from "antd";
import Bar from "@/views/commponents/echarts/bar.tsx";

const View: React.FC = () => {
  const testData = {
    xName: "接口",
    yName: "时间",
    data: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 9],
      [9, 10],
    ],
    title: "3D Line Chart Example",
  };
  const testData1 = {
    data: [
      ["一月", 120],
      ["二月", 200],
      ["三月", 150],
      ["四月", 80],
      ["五月", 70],
      ["六月", 110],
      ["七月", 130],
    ],
    title: "每月销售量统计",
    xName: "月份",
    yName: "销售量",
  };
  return (
    <Card
      hoverable={true}
      style={{ cursor: "default", maxHeight: "85vh" }}
      className="antiCard h-[85vh] w-full overflow-auto"
    >
      <div
        style={{
          display: "flex",
          gap: "5vw",
          flexWrap: "wrap",
          backgroundColor: "#000",
        }}
      >
        <Line {...testData} />
        <Line {...testData} />
        <Line {...testData} />
        <Bar {...testData1} />
      </div>
    </Card>
  );
};

export default View;
