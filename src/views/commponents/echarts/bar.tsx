import EChartsReact from "echarts-for-react";
import * as echarts from "echarts";

/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-12-09 09:02:35
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-09 17:31:44
 * @FilePath: src/views/commponents/echarts/bar.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
interface BarProps {
  data: any[][];
  data1: any[][];
  title: string;
  xName: string;
  yName: string;
  bg?: string;
  tc?: string;
}

const Bar: React.FC<BarProps> = ({
  data,
  title,
  xName,
  yName,
  data1,
  bg = "#000000",
  tc = "#ffffff",
}) => {
  const xData: any[] = [];
  data.forEach((item, i) => {
    xData.push(item[0]);
  });
  const axisTextStyle = {
    color: tc, // 文本颜色
    fontSize: 14, // 字体大小
    fontWeight: "100", // 字体粗细
    textShadowColor: "#03bcf4", // 发光颜色
    textShadowBlur: 10, // 模糊程度，值越大越模糊
    textShadowOffsetX: 0, // X轴方向偏移
    textShadowOffsetY: 0, // Y轴方向偏移
  };
  const barTitle = {
    text: title,
    left: "center",
    top: "top",
    textStyle: {
      fontWeight: "normal",
      color: tc,
      textShadowColor: "#03bcf4",
      textShadowBlur: 8,
    },
  };
  const barGrid = {
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
      color: tc,
      textShadowColor: "#03bcf4", // 发光颜色
      textShadowBlur: 10, // 模糊程度，值越大越模糊
      textShadowOffsetX: 0, // X轴方向偏移
      textShadowOffsetY: 0, // Y轴方向偏移
    },
    formatter: function (params: any) {
      const item0 = params[0];
      const item1 = params[1];
      return `
            ${xName}: ${item0.value[0]}<br>
            注册数: ${item0.value[1]}<br>
            活跃数: ${item1.value[1]}<br>
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
    data: xData,
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
  const bar = {
    type: "bar",
    data: data,
    label: {
      show: true,
      position: "top",
      color: tc,
      fontSize: 14,
      fontWeight: "100",
      textShadowColor: "#03bcf4", // 发光颜色
      textShadowBlur: 10, // 模糊程度，值越大越模糊
      textShadowOffsetX: 0, // X轴方向偏移
      textShadowOffsetY: 0, // Y轴方向偏移
    },
    barWidth: "20%",
    itemStyle: {
      normal: {
        borderRadius: [5, 5, 0, 0], // 只有顶部圆角
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          // 设置渐变色
          { offset: 0, color: "#21B8FA" },
          { offset: 0.8, color: "#21B8FA" + "00" },
        ]),
        shadowBlur: 10,
        shadowColor: "#03bcf4", // 发光颜色
        shadowOffsetX: 0,
        shadowOffsetY: 0,
      },
      emphasis: {
        shadowBlur: 20,
        shadowColor: "#03bcf4", // 更强的发光颜色
        shadowOffsetX: 0,
        shadowOffsetY: 0,
      },
    },
  };
  const bar1 = {
    type: "bar",
    data: data1,
    label: {
      show: true,
      position: "top",
      color: tc,
      fontSize: 14,
      fontWeight: "100",
      textShadowColor: "#03bcf4", // 发光颜色
      textShadowBlur: 10, // 模糊程度，值越大越模糊
      textShadowOffsetX: 0, // X轴方向偏移
      textShadowOffsetY: 0, // Y轴方向偏移
    },
    barWidth: "20%",
    itemStyle: {
      normal: {
        borderRadius: [5, 5, 0, 0], // 只有顶部圆角
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          // 设置渐变色
          { offset: 0, color: "#21B8FA" },
          { offset: 0.8, color: "#21B8FA" + "00" },
        ]),
        shadowBlur: 10,
        shadowColor: "#03bcf4", // 发光颜色
        shadowOffsetX: 0,
        shadowOffsetY: 0,
      },
      emphasis: {
        shadowBlur: 20,
        shadowColor: "#03bcf4", // 更强的发光颜色
        shadowOffsetX: 0,
        shadowOffsetY: 0,
      },
    },
  };
  const option = {
    backgroundColor: bg,
    title: barTitle,
    grid: barGrid,
    tooltip: tooltip,
    xAxis: xAxis,
    yAxis: yAxis,
    series: [bar, bar1],
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
export default Bar;
