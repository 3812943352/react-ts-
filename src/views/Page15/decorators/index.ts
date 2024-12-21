/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-20 16:36:35
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-20 16:39:03
 * @FilePath: src/views/Page15/decorators/index.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import { ThreeHelper } from "../../ThreeHelper";

/**
 * 类装饰器
 * 相机注入
 * 接收类需要声明
 * private camera!: THREE.PerspectiveCamera;
 * private cameraWrapper!: THREE.Object3D;
 */
export function CameraInject<T extends { new (...args: any[]): {} }>(
  constructor: T,
) {
  return class extends constructor {
    camera = ThreeHelper.instance.camera;
    cameraWrapper = ThreeHelper.instance.camera.parent;
  };
}

/**
 * 方法装饰器 - 基础环境参数设置
 */
export const MethodBaseSceneSet: MethodDecorator = (
  _,
  __,
  description: PropertyDescriptor,
) => {
  const prev = description.value;
  description.value = (helper: ThreeHelper) => {
    helper.addStats();
    helper.addAxis();
    helper.camera.fov = 50;
    helper.camera.position.set(0, 0, 40);
    helper.frameByFrame();
    helper.addGUI();
    // helper.initLights();
    helper.setBackground("#e2d6c8");
    helper.perspectiveCameraControl();
    prev(helper);
  };
};

/**
 * 方法装饰器 - gltf加载装饰器
 */
export const LoadGLTF = (url: string): MethodDecorator => {
  if (!url) throw new Error("url 为空");
  return (_: any, __: any, description: PropertyDescriptor) => {
    const prev = description.value;
    // 不能使用尖头函数 会导致函数内部的this偏离
    description.value = function () {
      ThreeHelper.instance.loadGltf(url).then((gltf) => {
        prev.call(this, gltf);
      });
    };
  };
};
