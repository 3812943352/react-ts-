/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-20 16:36:35
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-20 16:19:42
 * @FilePath: src/views/Page15/particle/Aircraft.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
// 从本地路径导入ThreeHelper辅助工具类
import { ThreeHelper } from "../../ThreeHelper"; // 导入自定义装饰器CameraInject和LoadGLTF，用于注入相机和加载GLTF模型
import { LoadGLTF } from "../decorators"; // 从本地路径导入自定义材质DotMaterial
import { DotMaterial } from "../../shader/DotMaterial"; // 从three库中导入BufferAttribute和Points类
import * as THREE from "three";
import { BufferAttribute, Points } from "three"; // 导入GSAP动画库
import { gsap } from "gsap"; // 从three的GLTFLoader模块中导入GLTF接口
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader"; // 从本地路径导入GUIControl类，用于创建图形用户界面控件
import { RingPoint } from "./RingPoint";

export class Aircraft {
  // 定义particle属性，它是一个使用自定义材质DotMaterial的Points对象
  particle?: THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>;
  // 定义camera属性，表示场景中的透视相机
  camera = ThreeHelper.instance.camera;
  cameraWrapper = ThreeHelper.instance.camera.parent;

  // 构造函数，初始化Aircraft实例时调用
  constructor() {
    // 调用loadModel方法加载模型
    this.loadModel();
  }

  // 使用LoadGLTF装饰器加载指定路径下的GLB模型文件，并自动注入到此方法的参数gltf中
  @LoadGLTF("/models/particle3.glb")
  loadModel(gltf?: GLTF) {
    // 如果没有成功加载GLTF模型，则直接返回
    if (!gltf) return;

    // 获取GLTF场景中类型为Mesh的第一个对象
    const mesh = gltf.scene.getObjectByProperty(
      "type",
      "Mesh",
    ) as THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>;
    // 缩放mesh几何体，使粒子效果更大
    mesh.geometry.scale(2, 3, 3);
    // 旋转mesh几何体，使粒子效果面向正确的方向（这里选择不启用）
    // mesh.geometry.rotateX(Math.PI / -2);
    // 旋转mesh几何体，在Z轴上旋转180度
    mesh.geometry.rotateZ(Math.PI);

    // 调用setSizeAttr方法设置每个点的大小属性
    this.setSizeAttr(mesh.geometry);

    // 创建一个新的Points对象，使用上面准备好的geometry和自定义材质DotMaterial
    this.particle = new Points(
      mesh.geometry,
      new DotMaterial(
        {
          near: 10, // 材质参数：近裁剪面距离
          far: -60, // 材质参数：远裁剪面距离
          fadeDistance: 0, // 材质参数：淡出距离
          blur: 5, // 材质参数：模糊程度
          map: mesh.material.map, // 使用原始mesh材质的地图纹理
          baseParticleSize: 2, // 材质参数：基本粒子大小
        },
        {
          depthTest: false, // 自定义材质选项：禁用深度测试
        },
      ),
    );

    console.log(this.camera.fov, this.camera.position);
    // 将粒子系统添加到ThreeHelper管理的场景中
    ThreeHelper.instance.add(this.particle);
    // 设置粒子系统的动画
    this.setAnimation();
  }

  // setSizeAttr方法：为几何体设置点大小属性
  setSizeAttr(geometry: THREE.BufferGeometry) {
    // 计算点的数量
    const pointCount = geometry.getAttribute("position").count;

    // 初始化大小数组，每个点一个浮点数
    const size = new Float32Array(pointCount);

    // 遍历所有点，随机分配大小
    for (let i = 0; i < pointCount; i++) {
      size[i] = (Math.random() + 0.1) * 2.3; // 粒子大小范围在0.23到2.53之间
    }

    // 将大小数组封装成BufferAttribute并添加到几何体
    const bufferAttr = new BufferAttribute(size, 1);
    geometry.setAttribute("size", bufferAttr);
  }

  // setAnimation方法：设置粒子系统的动画效果
  setAnimation() {
    const particle = this.particle;
    // 如果粒子系统不存在，则直接返回
    if (!particle) return;

    // 设置粒子系统的初始位置
    particle.position.set(30, 20, 55);
    // 创建GUIControl控件，允许通过GUI调整粒子系统的位置
    // 创建GSAP时间线，结合ScrollTrigger实现基于滚动的动画效果
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#container", // 滚动触发元素
        start: innerHeight * 1.9, // 开始滚动触发的位置
        end: innerHeight * 3.5, // 结束滚动触发的位置
        scrub: 1, // 滚动与动画同步
      },
    });

    // 定义一系列动画动作，包括粒子位置、旋转、相机视角等的变化
    tl.to(particle.position, { z: -50, y: -15, duration: 0.3 }, 0); // 移动粒子位置
    tl.to(
      particle.position,
      { z: -110, y: 15, x: 0, duration: 0.4 },
      0.2,
    ); // 继续移动粒子位置
    tl.to(particle.rotation, { x: Math.PI, duration: 0.2 }, 0.6); // 旋转粒子系统
    tl.to(
      particle.position,
      { z: 20, y: 5, x: -10, duration: 0.4 },
      0.8,
    ); // 更改粒子位置
    tl.to(particle.rotation, { x: Math.PI, duration: 0.1 }, 1.2); // 再次旋转粒子系统
    tl.to(
      this.camera,
      {
        duration: 1,
        fov: 50, // 改变相机视场角
        onUpdate: () => this.camera.updateProjectionMatrix(), // 更新相机投影矩阵
      },
      0,
    );
    tl.to(this.cameraWrapper.position, { z: -20, duration: 0.5 }, 0); // 移动相机包装对象
    // 动态修改粒子材质的uniforms属性，实现动态效果
    tl.to(particle.material.uniforms.near, { value: 10 }, 0.3);
    tl.to(
      particle.material.uniforms.baseParticleSize,
      { value: 2 },
      0.5,
    );
    tl.to(
      particle.material.uniforms.fadeDistance,
      { value: 1, duration: 0.3 },
      0.5,
    );
    // 再次调整相机包装对象和相机视场角的位置
    // tl.to(this.cameraWrapper.position, { z: -20 }, 0.17);
    // tl.to(
    //     this.camera,
    //     { fov: 90, onUpdate: () => this.camera.updateProjectionMatrix() },
    //     0.17
    // );
    this.setRingPoint(tl);
  }

  setRingPoint(timeline: gsap.core.Timeline) {
    const ringConfig = [{ z: -9 }, { z: -6 }, { z: -3 }, { z: 0 }];
    const pos: Vector3[] = [];
    const opacity: THREE.IUniform[] = [];

    for (const { z } of ringConfig) {
      const ringPoint = new RingPoint();
      ringPoint.math.position.z = z - 15;
      ThreeHelper.instance.add(ringPoint.math);
      pos.push(ringPoint.math.position);
      ringPoint.math.material.uniforms.maxOpacity.value = 0;
      opacity.unshift(ringPoint.math.material.uniforms.maxOpacity);
    }

    const ringPoint = new RingPoint();
    ringPoint.math.position.z = -10;
    ThreeHelper.instance.add(ringPoint.math);

    timeline.to(
      pos,
      {
        ease: "power3.inOut",
        duration: 0.2,
        z: (i) => ringConfig[i].z,
        stagger: {
          each: 0.02,
        },
      },
      0,
    );
    timeline
      .to(
        opacity,
        {
          ease: "power3.inOut",
          duration: 0.3,
          value: 0.6,
          stagger: {
            each: 0.02,
          },
        },
        0,
      )
      .to(
        [...pos].reverse(),
        {
          z: 40,
          ease: "power3.inOut",
          duration: 2,
          stagger: {
            each: 0.2,
          },
        },
        0.03,
      )
      .to(
        ringPoint.math.position,
        {
          z: 40,
          ease: "power3.inOut",
          duration: 0.2,
        },
        0.2,
      );
  }
}
