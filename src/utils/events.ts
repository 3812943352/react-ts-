/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-25 16:01:37
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-12 15:04:20
 * @FilePath: src/utils/events.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import { EventEmitter } from "events";

const eventBus = new EventEmitter();
export default eventBus;
