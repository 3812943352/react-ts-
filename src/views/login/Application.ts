/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-12-17 16:33:07
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-18 16:23:56
 * @FilePath: src/views/login/Application.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
// @ts-ignore
import Experience from "./Experience.ts";

export default class Application {
  constructor() {
    this.setExperience();
  }

  setExperience() {
    this.experience = new Experience({
      targetElement: document.querySelector(".experience"),
    });
  }
}
