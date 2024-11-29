/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-28 17:57:56
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-11-28 17:58:35
 * @FilePath: src/commponents/secToTime.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
export const secToTime = (seconds: number) => {
  // 定义基础时间单位
  const oneMinute = 60;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;
  const oneMonth = oneDay * 30; // 这里使用30天作为一个平均月份
  const oneYear = oneDay * 365; // 这里使用365天作为一个非闰年

  // 计算各个时间单位的数量
  const years = Math.floor(seconds / oneYear);
  seconds %= oneYear;

  const months = Math.floor(seconds / oneMonth);
  seconds %= oneMonth;

  const days = Math.floor(seconds / oneDay);
  seconds %= oneDay;

  const hours = Math.floor(seconds / oneHour);
  seconds %= oneHour;

  const minutes = Math.floor(seconds / oneMinute);
  seconds %= oneMinute;

  // 构建输出字符串
  let result = [];
  if (years > 0) result.push(`${years}年`);
  if (months > 0) result.push(`${months}月`);
  if (days > 0) result.push(`${days}日`);
  if (hours > 0) result.push(`${hours}时`);
  if (minutes > 0) result.push(`${minutes}分`);
  if (seconds > 0 || result.length === 0) result.push(`${seconds}秒`);

  return result.join("");
};
