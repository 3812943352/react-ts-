/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-12-20 14:36:03
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-20 15:01:47
 * @FilePath: src/views/shader/HideMaterial/material.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
/*
 * @Author: hongbin
 * @Date: 2023-05-26 22:40:02
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-20 15:01:47
 * @Description:
 */
import { ShaderMaterial } from "three/src/materials/ShaderMaterial";
import vertexShader from "./vt.glsl";
import fragmentShader from "./fm.glsl";

export class HideMaterial extends ShaderMaterial {
  constructor(params: {
    axis: number;
    axisLength: number;
    process: number;
    reverse?: number;
  }) {
    const uniforms = {
      axis: { value: params.axis },
      axisLength: { value: params.axisLength },
      process: { value: params.process },
      reverse: { value: params.reverse || 0 },
    };

    super({
      vertexShader,
      fragmentShader,
      uniforms,
    });
  }
}
