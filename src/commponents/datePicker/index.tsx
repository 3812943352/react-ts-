/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-28 11:07:44
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-11-28 15:16:09
 * @FilePath: src/commponents/datePicker/index.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import locale from "antd/locale/zh_CN";
import dayjs, { Dayjs } from "dayjs";

import "dayjs/locale/zh-cn";
import { ConfigProvider, DatePicker } from "antd";
import React from "react";

interface TimePickeProps {
  onChange?: (dates: any, dateStrings: [string, string]) => void;
  value?: [Dayjs | null | undefined, Dayjs | null | undefined] | null;
}

const CustomTimePicke: React.FC<TimePickeProps> = ({
  onChange,
  value,
}) => {
  dayjs.locale("zh-cn");
  const { RangePicker } = DatePicker;
  return (
    <ConfigProvider locale={locale}>
      <RangePicker
        value={value}
        onChange={onChange}
        status="warning"
      />
    </ConfigProvider>
  );
};

export default CustomTimePicke;
