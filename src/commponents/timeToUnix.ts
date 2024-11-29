/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-28 14:01:07
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-11-28 14:09:52
 * @FilePath: src/commponents/timeToUnix.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
export const timeToUnix = (time: string) => {
  const date = new Date(time);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }
  return date.getTime() / 1000;
};
