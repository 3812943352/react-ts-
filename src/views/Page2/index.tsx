/*
 * @Author: wb
 * @Date: 2024-11-04 09:16:08
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-12 10:48:07
 * @FilePath: src/views/Page2/index.tsx
 * @Description: 请填写简介
 */
import { Card } from "antd";
import { useEffect, useState } from "react";
import { getLinesType } from "@/types/apiSuperVision.ts";
import { store } from "@/store/user/selector.tsx";
import { getLinesApi } from "@/api/apiSuperVision.ts";
import Line from "@/views/commponents/echarts/Line.tsx";

const View: React.FC = () => {
  const [mReqCountData, setMReqCountData] = useState([]);
  const [mPerMsData, setMPerMsData] = useState([]);
  const [hReqCountData, setHReqCountData] = useState([]);
  const [hPerMsData, setHPerMsData] = useState([]);
  const [dReqCountData, setDReqCountData] = useState([]);
  const [dPerMsData, setDPerMsData] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    const req: getLinesType = {
      headers: {
        token: store.getState().token?.token,
      },
    };
    getLinesApi(req).then((r) => {
      setMReqCountData(r.data.mReqCount);
      setMPerMsData(r.data.mPerMs);
      setHReqCountData(r.data.hReqCount);
      setHPerMsData(r.data.hPerMs);
      setDReqCountData(r.data.dReqCount);
      setDPerMsData(r.data.dPerMs);
    });
  };
  const mReqCount = {
    xName: "分钟",
    yName: "次数",
    data: mReqCountData,
    title: "每分钟请求次数",
  };
  const mPerMs = {
    xName: "分钟",
    yName: "ms",
    data: mPerMsData,
    title: "每分钟平均处理时间（ms）",
  };
  const hReqCount = {
    xName: "小时",
    yName: "次数",
    data: hReqCountData,
    title: "每小时请求次数",
  };
  const hPerMs = {
    xName: "小时",
    yName: "ms",
    data: hPerMsData,
    title: "每小时平均处理时间（ms）",
  };
  const dReqCount = {
    xName: "日期",
    yName: "次数",
    data: dReqCountData,
    title: "每天请求次数",
  };
  const dPerMs = {
    xName: "日期",
    yName: "次数",
    data: dPerMsData,
    title: "每天平均处理时间（ms）",
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
        <Line {...mReqCount} />
        <Line {...mPerMs} />
        <Line {...hReqCount} />
        <Line {...hPerMs} />
        <Line {...dReqCount} />
        <Line {...dPerMs} />
      </div>
    </Card>
  );
};

export default View;
