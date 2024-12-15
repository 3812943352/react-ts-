/*
 * @Author: wb
 * @Date: 2024-11-04 09:16:08
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-14 10:59:30
 * @FilePath: src/views/Page6/index.tsx
 * @Description: 请填写简介
 */
import { Card } from "antd";
import Bar from "@/views/commponents/echarts/bar.tsx";
import Pie from "@/views/commponents/echarts/pie.tsx";
import { getChartsType } from "@/types/apiSuperVision.ts";
import { store } from "@/store/user/selector.tsx";
import { getChartsApi } from "@/api/apiSuperVision.ts";
import React, { useEffect, useState } from "react";
import TimePicke from "@/commponents/datePicker";
import { Dayjs } from "dayjs";
import { timeToUnix } from "@/commponents/timeToUnix.ts";

const View: React.FC = () => {
  const [sTime, setSTime] = useState(0);
  const [eTime, setETime] = useState(0);
  const [serchDateValue, setSerchDateValue] = useState<
    [Dayjs, Dayjs] | null
  >(null);
  const [codePie, setCodePie] = useState([]);
  const [msPie, setMsPie] = useState([]);
  const [reqTop, setReqTop] = useState([]);
  const [errorTop, setErrorTop] = useState([]);
  const [fastTop, setFastTop] = useState([]);
  const [slowTop, setSlowTop] = useState([]);

  const timeOnChange = (
    dates: [Dayjs, Dayjs],
    dateStrings: [string, string],
  ) => {
    setSerchDateValue(dates);
    setSTime(timeToUnix(dateStrings[0]));
    setETime(timeToUnix(dateStrings[1]));
  };
  useEffect(() => {
    if (sTime !== 0 && eTime !== 0) {
      getCharts();
    }
  }, [sTime, eTime]);
  useEffect(() => {
    getCharts();
  }, []);
  const getCharts = () => {
    const req: getChartsType = {
      data: {
        start: sTime,
        end: eTime,
      },
      headers: {
        token: store.getState().token?.token,
      },
    };
    getChartsApi(req).then((r) => {
      setCodePie(r.data.stuPie);
      setMsPie(r.data.msPie);
      setReqTop(r.data.reqTop15);
      setErrorTop(r.data.errorTop15);
      setFastTop(r.data.fastTop15);
      setSlowTop(r.data.slowTop15);
    });
  };
  const msPieData = {
    data: msPie,
    title: "请求处理时间（ms）",
  };
  const codePieData = {
    data: codePie,
    title: "状态码统计",
  };
  const reqTopData = {
    data: reqTop,
    title: "最多请求 TOP15",
    xName: "次数",
    yName: "接口",
  };
  const errorTopData = {
    data: errorTop,
    title: "请求错误 TOP15",
    xName: "次数",
    yName: "接口",
  };
  const slowTopData = {
    data: slowTop,
    title: "平均处理时间最慢 TOP15",
    xName: "速度（ms）",
    yName: "接口",
  };
  const fastTopData = {
    data: fastTop,
    title: "平均处理时间最快 TOP15",
    xName: "速度（ms）",
    yName: "接口",
  };
  return (
    <Card
      hoverable={true}
      style={{ cursor: "default", maxHeight: "85vh" }}
      className="antiCard h-[85vh] w-full overflow-auto"
    >
      <TimePicke value={serchDateValue} onChange={timeOnChange} />
      <div
        style={{
          display: "flex",
          gap: "3vw",
          flexWrap: "wrap",
          backgroundColor: "#000",
          margin: "3vh 0",
        }}
      >
        <Pie {...codePieData} />
        <Pie {...msPieData} />
        <Bar {...reqTopData} />
        <Bar {...errorTopData} />
        <Bar {...fastTopData} />
        <Bar {...slowTopData} />
      </div>
    </Card>
  );
};

export default View;
