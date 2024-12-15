import EChartsReact from "echarts-for-react";
import * as echarts from "echarts";

/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-12-09 09:02:35
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-14 11:00:33
 * @FilePath: src/views/commponents/echarts/bar.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
interface BarProps {
  data: any[][];
  data1?: any[][];
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
  // 准备类别数据（原本的X轴数据）
  const categories: any[] = data.map((item) => item[0]);

  // 准备数值数据（原本的Y轴数据）
  const values: number[] = data.map((item) => item[1]);
  const values1: number[] = data1 ? data1.map((item) => item[1]) : [];

  const axisTextStyle = {
    color: tc, // 文本颜色
    fontSize: 10, // 字体大小
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
    top: "10%",
    left: "10%", // 调整左边距以适应更长的标签
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
      if (item1 === undefined) {
        return `
            ${yName}: ${item0.name}<br>
            ${xName}: ${item0.value}<br>
        `;
      } else {
        return `
            ${xName}: ${item0.name}<br>
            注册数: ${item0.value}<br>
            活跃数: ${item1.value}<br>
        `;
      }
    },
    axisPointer: {
      type: "line",
      lineStyle: {
        color: "#FF845A",
      },
    },
  };

  // 横向条形图需要交换X轴和Y轴的位置
  const yAxis = {
    type: "category", // 类目轴
    data: categories, // 类别数据作为Y轴
    name: xName,
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
    nameTextStyle: axisTextStyle,
    axisLabel: {
      textStyle: axisTextStyle,
    },
  };

  const xAxis = {
    type: "value", // 数值轴
    name: yName,
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
    nameTextStyle: axisTextStyle,
    axisLabel: {
      textStyle: axisTextStyle,
    },
  };

  const seriesConfig = (dataSet: number[], seriesName: string) => ({
    type: "bar",
    name: seriesName,
    data: dataSet,
    label: {
      show: false,
      position: "right", // 改变位置以适应横向条形图
      color: tc,
      fontSize: 14,
      fontWeight: "100",
      textShadowColor: "#03bcf4",
      textShadowBlur: 10,
      textShadowOffsetX: 0,
      textShadowOffsetY: 0,
    },
    barWidth: "40%",
    itemStyle: {
      normal: {
        borderRadius: [5, 5, 5, 5], // 只有底部圆角
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0.1, color: "#21B8FA" + "00" },
          { offset: 0.8, color: "#21B8FA" },
        ]),
        shadowBlur: 10,
        shadowColor: "#03bcf4",
        shadowOffsetX: 0,
        shadowOffsetY: 0,
      },
      emphasis: {
        shadowBlur: 20,
        shadowColor: "#03bcf4",
        shadowOffsetX: 0,
        shadowOffsetY: 0,
      },
    },
  });

  const series = [
    seriesConfig(values, "系列1"),
    ...(data1 ? [seriesConfig(values1, "系列2")] : []),
  ];

  const option = {
    backgroundColor: bg,
    title: barTitle,
    grid: barGrid,
    tooltip: tooltip,
    yAxis: yAxis,
    xAxis: xAxis,
    series: series,
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
