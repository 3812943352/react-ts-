/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-12-06 14:46:59
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-07 11:58:25
 * @FilePath: src/views/commponents/echarts/Line.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import * as echarts from "echarts";
import EChartsReact from "echarts-for-react";

interface LineProps {
  data: any[][];
  title: string;
  xName: string;
  yName: string;
}
const Line: React.FC<LineProps> = ({ data, title, xName, yName }) => {
  const axisTextStyle = {
    color: "#ffffff", // 文本颜色
    fontSize: 14, // 字体大小
    fontWeight: "100", // 字体粗细
    textShadowColor: "#03bcf4", // 发光颜色
    textShadowBlur: 10, // 模糊程度，值越大越模糊
    textShadowOffsetX: 0, // X轴方向偏移
    textShadowOffsetY: 0, // Y轴方向偏移
  };
  const lineTitle = {
    text: title,
    left: "center",
    top: "top",
    textStyle: {
      fontWeight: "normal",
      color: "rgb(232,239,240)",
      textShadowColor: "#03bcf4",
      textShadowBlur: 8,
    },
  };
  const lineGrid = {
    top: "15%",
    left: "5%",
    right: "10%",
    bottom: "5%",
    containLabel: true,
  };
  const tooltip = {
    trigger: "axis",
    confine: true,
    backgroundColor: "rgba(255, 132, 90, 0.3)",
    borderColor: "#FF845A",
    textStyle: {
      fontSize: 16,
      color: "#fff",
      textShadowColor: "#03bcf4", // 发光颜色
      textShadowBlur: 10, // 模糊程度，值越大越模糊
      textShadowOffsetX: 0, // X轴方向偏移
      textShadowOffsetY: 0, // Y轴方向偏移
    },
    formatter: function (params: any) {
      const item = params[0];
      return `
            ${xName}: ${item.value[0]}<br>
            ${yName}: ${item.value[1]}<br>
        `;
    },

    // 鼠标移入时竖线的样式
    axisPointer: {
      type: "line",
      lineStyle: {
        color: "#FF845A",
      },
    },
  };
  const xAxis = {
    name: xName,
    boundaryGap: true,
    axisLine: {
      show: true,
      symbol: ["none", "rect"],
      symbolSize: [6, 12],
      lineStyle: {
        width: 2,
        color: "#537DAA",
      },
    },
    axisTick: {
      show: false,
    },
    nameTextStyle: axisTextStyle, // 应用发光字体样式
    axisLabel: {
      textStyle: axisTextStyle, // 应用发光字体样式到坐标标签
    },
  };
  const yAxis = {
    nameTextStyle: axisTextStyle, // 应用发光字体样式
    axisLabel: {
      textStyle: axisTextStyle, // 应用发光字体样式到坐标标签
    },
    name: yName,
    // x、y轴顶端的样式，小矩形
    axisLine: {
      show: true,
      symbol: ["none", "rect"],
      symbolSize: [6, 12],
      lineStyle: {
        width: 2,
        color: "#537DAA",
      },
    },
    axisTick: {
      show: false,
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "rgba(83, 125, 170, 0.2)",
      },
    },
  };
  const line = {
    type: "line",
    lineWidth: 1.2,
    data: data,
    // 线条节点的样式
    symbol: "",
    itemStyle: {
      color: "rgba(114, 178, 255, 1)",
    },
    // 线条样式
    lineStyle: {
      width: 2,
      shadowBlur: 20,
      shadowColor: "#72B2FF",
      shadowOffsetY: 10,
    },

    // 线条下面阴影的样式，线性渐变
    areaStyle: {
      color: new echarts.graphic.LinearGradient(
        0,
        0,
        0,
        1,
        [
          {
            offset: 0,
            color: "rgba(114, 178, 255, 0.25)",
          },
          {
            offset: 1,
            color: "rgba(114, 178, 255, 0)",
          },
        ],
        false,
      ),
      opacity: 1,
    },
  };
  const lines = {
    data: [
      {
        coords: data,
      },
    ],
    coordinateSystem: "cartesian2d",
    type: "lines",

    zlevel: 1,
    // 是否是多线段
    polyline: true,
    symbol: "circle",
    effect: {
      show: true,
      trailLength: 0.4,
      symbol: "circle",
      period: 8,
      symbolSize: 8,
    },
    lineStyle: {
      normal: {
        color: "#64FFFF",
        width: 0,
        opacity: 0,
        curveness: 1,
      },
    },
  };
  const option = {
    backgroundColor: "#000",
    title: lineTitle,
    grid: lineGrid,
    tooltip: tooltip,
    xAxis: xAxis,
    yAxis: yAxis,
    series: [line, lines],
  };
  return (
    <>
      <EChartsReact
        option={option}
        style={{ width: "40vw" }}
      ></EChartsReact>
    </>
  );
};

export default Line;
