/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-28 12:00:43
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-11-28 12:10:01
 * @FilePath: src/commponents/formatDate.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
// 日期格式化函数

export function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000); // Unix 时间戳是以秒为单位，Date 构造函数需要毫秒
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从0开始，需要加1
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
}
 