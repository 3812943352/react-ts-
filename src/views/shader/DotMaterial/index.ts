/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-20 16:36:35
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-20 15:45:55
 * @FilePath: src/views/shader/DotMaterial/index.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import * as THREE from "three";
import { ShaderMaterial, TextureLoader } from "three";
import vertexShader from "./vt.glsl";
import fragmentShader from "./fm.glsl";
import { ThreeHelper } from "../../ThreeHelper";

const defaultParams = {
  /** 离相机近点的位置 */
  near: 10,
  /** 离相机远点的位置 */
  far: 0,
  /** 渐入渐出的距离 */
  fadeDistance: 3,
  /** 没有 aColor 属性的模型使用uv贴图 */
  map: null as unknown as THREE.Texture | null,
  /** 模糊大小 */
  blur: 0,
  minOpacity: 0,
  maxOpacity: 1,
  baseParticleSize: 4.5,
};

const defaultDefines = {
  USE_ACOLOR: false,
  /** 深度测试 开启后边缘有些许百遍 但立体效果好一些 */
  depthTest: false,
};

const objToUniform = (params: Record<string, unknown>) => {
  const uniforms: Record<string, THREE.IUniform> = {};

  for (const [key, value] of Object.entries(params)) {
    uniforms[key] = { value };
  }

  return uniforms;
};

export class DotMaterial extends ShaderMaterial {
  constructor(
    params?: Partial<typeof defaultParams>,
    defines?: Partial<typeof defaultDefines>,
  ) {
    const realParams = { ...defaultParams, ...params };

    const uniforms = {
      /** 设备分辨率 适配不同分辨率屏幕上的粒子大小 */
      pixelRatio: {
        value: ThreeHelper.instance.renderer.getPixelRatio(),
      },
      alphaTexture: {
        value: new TextureLoader().load(
          "/texture/circle_alpha_32x32_premultiplied.png",
        ),
      },
      ...objToUniform(realParams),
    };

    super({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthTest: defines?.depthTest ?? defaultDefines.depthTest,
      defines: {
        ...defaultDefines,
        ...defines,
      },
    });
  }
}
