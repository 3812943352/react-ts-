/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-28 09:19:52
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-11-28 10:08:57
 * @FilePath: src/commponents/loading/index.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import eventBus from "@/utils/events"; // 确保导入正确的路径

interface CustomLoadingProps {
  spinning: boolean;
}

const CustomLoading: React.FC<CustomLoadingProps> = ({
  spinning: initialSpinning = false,
}) => {
  const [spinning, setSpinning] = useState(initialSpinning);

  useEffect(() => {
    const handleStartLoading = () => {
      setSpinning(true);
    };
    const handleStopLoading = () => {
      setSpinning(false);
    };

    eventBus.on("startLoading", handleStartLoading);
    eventBus.on("stopLoading", handleStopLoading);
  }, [spinning]);

  return (
    <Spin
      spinning={spinning}
      fullscreen
      indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
    />
  );
};

export default CustomLoading;
