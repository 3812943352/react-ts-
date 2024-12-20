/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-20 16:36:35
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-20 16:19:44
 * @FilePath: src/views/Page15/particle/RandomPoint.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
// 从本地路径导入自定义材质DotMaterial

// 从本地路径导入自定义材质DotMaterial
import * as THREE from "three";
import { ThreeHelper } from "../../ThreeHelper";
import { DotMaterial } from "../../shader/DotMaterial";
import { CameraInject } from "@/views/Page15/decorators";
// import { GUIControl } from "@/ThreeHelper/utils/GUIControl";
// import { GUIControl } from "@/ThreeHelper/utils/GUIControl";

@(CameraInject<typeof RandomPoint>)
export class RandomPoint {
  camera = ThreeHelper.instance.camera;
  cameraWrapper = ThreeHelper.instance.camera.parent;
  particle?: THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>;
  private count: number;

  constructor(
    count = 300,
    name = "漂浮点",
    color = new THREE.Color("#A69D98"),
  ) {
    this.count = count;

    const geometry = new THREE.BufferGeometry();

    const vertices = new Float32Array(this.count * 3); // 每个顶点有x、y、z三个坐标
    const colors = new Float32Array(this.count * 3);
    const sizes = new Float32Array(this.count);
    const randomDirections = new Float32Array(this.count * 3);
    const randomSpeeds = new Float32Array(this.count);

    let radius = 5;
    console.time("generatePoints");
    for (let i = 0; i < this.count; i++) {
      // 随机生成x、y、z坐标，范围在0到5之间
      vertices[i * 3] = radius * (Math.random() - 0.5) * 10; // x
      vertices[i * 3 + 1] = 0.5 * radius * (Math.random() - 0.5) * 10; // y
      vertices[i * 3 + 2] =
        0.5 * radius * (Math.random() - 0.5) * 60 - 10; // z

      colors[i * 3] = Math.random() * 0.5;
      colors[i * 3 + 1] = Math.random() * 0.5;
      colors[i * 3 + 2] = Math.random() * 0.5 + 0.5;

      sizes[i] = (Math.random() * 0.5 + 0.5) * 2; // 随机生成点的大小
      randomSpeeds[i] = (Math.random() * 0.5 + 0.1) * 1.5;
      let randomDirection = new THREE.Vector3(
        Math.random() * 4 - 1, // X 方向 -1 到 1 之间的随机数
        Math.random() * 4 - 1, // Y 方向 -1 到 1 之间的随机数
        Math.random() * 4 - 1, // Z 方向 -1 到 1 之间的随机数
      ).normalize();
      randomDirections[i * 3] = randomDirection.x * 5; // 归一化以确保方向一致
      randomDirections[i * 3 + 1] = randomDirection.y * 5;
      randomDirections[i * 3 + 2] = randomDirection.z * 5;
    }
    console.timeEnd("generatePoints");

    // 设置顶点到几何体
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(vertices, 3),
    );
    geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3),
    );
    geometry.setAttribute(
      "size",
      new THREE.BufferAttribute(sizes, 1),
    );
    geometry.setAttribute(
      "randomDirection",
      new THREE.BufferAttribute(randomDirections, 3),
    );
    geometry.setAttribute(
      "randomSpeed",
      new THREE.BufferAttribute(randomSpeeds, 1),
    );

    this.particle = new THREE.Points(
      geometry,
      new DotMaterial(
        {
          near: 20, // 调整near和far值
          far: -5,
          maxOpacity: 0.4,
          fadeDistance: 20,
          blur: 4,
          minOpacity: 0,
        },
        {
          USE_ACOLOR: true,
        },
      ),
    );
    this.particle.name = name;
    // 如果ThreeHelper正确添加粒子到场景中
    ThreeHelper.instance.add(this.particle);
    this.startRotation();
  }

  // 更新粒子位置的方法
  updateParticles(deltaTime: number) {
    if (!this.particle) return;
    let radius = 5;
    const positions = this.particle.geometry.getAttribute(
      "position",
    ) as THREE.BufferAttribute;
    const posArray = positions.array as Float32Array;

    for (let i = 0; i < this.count * 3; i += 3) {
      const particlePos = new THREE.Vector3(
        posArray[i],
        posArray[i + 1],
        posArray[i + 2],
      );
      const directionToCamera = new THREE.Vector3(0, 0, 60)
        .clone()
        .sub(particlePos)
        .normalize();
      const speed = 0.05; // 根据时间间隔调整速度

      // 移动粒子朝向摄像机
      particlePos.add(directionToCamera.multiplyScalar(speed));
      // 如果粒子超出一定范围，则重置到摄像机前方

      const distanceToCamera = particlePos.distanceTo(
        new THREE.Vector3(0, 0, 60),
      );
      if (distanceToCamera < 1) {
        // 设置一个最大距离
        particlePos.set(0, 0, -30); // 固定位置重置

        // 添加一些随机分布

        particlePos.x = radius * (Math.random() - 0.5) * 10; // x
        particlePos.y = 0.5 * radius * (Math.random() - 0.5) * 10; // y
        particlePos.z = 0.5 * radius * (Math.random() - 0.5) * 60; // z
      }

      posArray[i] = particlePos.x;
      posArray[i + 1] = particlePos.y;
      posArray[i + 2] = particlePos.z;
    }

    // 更新几何体中的位置数据
    positions.needsUpdate = true;
  }
  startRotation() {
    const animate = () => {
      // 假设每帧的时间差为 deltaTime（通常应该从实际渲染循环中获取）
      const deltaTime = 1 / 60; // 模拟每秒60帧

      // 调用rotate方法，传入时间差
      this.updateParticles(deltaTime);

      // 请求下一帧动画
      requestAnimationFrame(animate);
    };

    // 启动动画循环
    requestAnimationFrame(animate);
  }
}
