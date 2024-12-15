import EChartsReact from "echarts-for-react";
import * as echarts from "echarts";

/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-12-10 09:20:27
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-14 11:00:33
 * @FilePath: src/views/commponents/echarts/pie.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
interface PieProps {
  data: any[][];
  title: string;
  tc?: string;
}

const Pie: React.FC<PieProps> = ({ data, title, tc = "#fff" }) => {
  let total = 0;
  let radius = 70;
  let series: any[] = [];
  let legendData: any[] = [];
  const color = [
    "#00FFFF",
    "#00B0FF",
    "#FFC000",
    "#FFAB6F",
    "#63E315",
    "#893BFF",
  ];
  data.forEach((item, i) => {
    total += item[1];
  });
  data.forEach((item, i) => {
    series.push({
      name: item[0],
      type: "pie",
      radius: [`${radius - i * 10}%`, `${radius - i * 10 + 5}%`],
      center: ["65%", "50%"],
      //环的位置
      label: {
        show: false,
        position: "center",
        fontWeight: "100",
        textShadowColor: color[i], // 发光颜色
        textShadowBlur: 10, // 模糊程度，值越大越模糊
        textShadowOffsetX: 0, // X轴方向偏移
        textShadowOffsetY: 0,
      },
      labelLine: {
        normal: {
          show: false,
        },
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "20",
          fontWeight: "bold",
        },
      },
      itemStyle: {
        normal: {
          borderRadius: [5, 5, 0, 0], // 只有顶部圆角
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            // 设置渐变色
            { offset: 0, color: color[i] },
            { offset: 1, color: "#fff" },
          ]),
          shadowBlur: 10,
          shadowColor: "rgba(141,141,141,0.3)", // 发光颜色
          shadowOffsetX: 0,
          shadowOffsetY: 0,
        },
        emphasis: {
          shadowBlur: 20,
          shadowColor: color[i], // 更强的发光颜色
          shadowOffsetX: 0,
          shadowOffsetY: 0,
        },
      },
      data: [
        {
          value: item[1], //需要显示的数据
          name: ((item[1] / total) * 100).toFixed(2) + "%",
          silent: false,
          itemStyle: {
            normal: {
              color: color[i],
            },
          },
        },
        {
          value: total - item[1],
          silent: true,
          itemStyle: {
            normal: {
              color: "#000",
            },
          },
        },
      ],
    });
    legendData.push({
      name: item[0],
      icon: "circle",
      textStyle: {
        color: "#D2D3D8", // 单独设置某一个图列的颜色
      },
    });
  });

  const legend = {
    orient: "vertical",
    left: "10%",
    top: "20%",
    itemHeight: 12, //图例的高度
    itemGap: 15, //图例之间的间距
    data: legendData,
  };
  const pieTitle = {
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
  const pieGrid = {
    top: "15%",
    left: "5%",
    right: "10%",
    bottom: "5%",
    containLabel: true,
  };
  const tooltip = {
    trigger: "item",
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
      if (params.data.silent === true) {
        return null;
      }
      if (params.value == 0) {
        return `
            ${params.seriesName}: 当前数据都为0<br>
        `;
      }
      return `
            ${params.seriesName}: ${((params.value / total) * 100).toFixed(2)}%<br>
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
  const option = {
    backgroundColor: "#000",
    title: pieTitle,
    grid: pieGrid,
    tooltip: tooltip,
    legend: legend,
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

export default Pie;
