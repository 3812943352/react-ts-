/*
 * @Author: wb
 * @Date: 2024-11-04 09:16:08
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-07 11:59:15
 * @FilePath: src/views/Page6/index.tsx
 * @Description: 请填写简介
 */
import Line from "@/views/commponents/echarts/Line.tsx";
import { Card } from "antd";

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
      </div>
    </Card>
  );
};

export default View;
