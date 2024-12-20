/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-12-17 16:33:07
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-18 13:25:54
 * @FilePath: src/views/login/Time.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import EventEmitter from "./EventEmitter.ts";

export default class Time extends EventEmitter {
  ticker: any;
  current: any;
  delta: any;
  elapsed: any;
  playing: any;
  start: any;
  /**
   * Constructor
   */
  constructor() {
    super();

    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;
    this.playing = true;

    this.tick = this.tick.bind(this);
    this.tick();
  }

  play() {
    this.playing = true;
  }

  pause() {
    this.playing = false;
  }

  /**
   * Tick
   */
  tick() {
    this.ticker = window.requestAnimationFrame(this.tick);

    const current = Date.now();

    this.delta = current - this.current;
    this.elapsed += this.playing ? this.delta : 0;
    this.current = current;

    if (this.delta > 60) {
      this.delta = 60;
    }

    if (this.playing) {
      this.trigger("tick");
    }
  }

  /**
   * Stop
   */
  stop() {
    window.cancelAnimationFrame(this.ticker);
  }
}
