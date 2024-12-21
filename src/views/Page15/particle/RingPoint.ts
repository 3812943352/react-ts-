/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-20 16:36:35
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-20 17:22:30
 * @FilePath: src/views/Page15/particle/RingPoint.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
// 从本地路径导入自定义材质DotMaterial
import { DotMaterial } from "../../shader/DotMaterial"; // 导入Three.js库的所有内容，并挂载到THREE命名空间下
import * as THREE from "three"; // 定义RingPoint类，用于创建一个环形点群对象

// 定义RingPoint类，用于创建一个环形点群对象
export class RingPoint {
  // 定义math属性，它是一个使用自定义材质DotMaterial的Points对象
  math: THREE.Points<
    THREE.BufferGeometry<THREE.NormalBufferAttributes>,
    DotMaterial
  >;
  // 定义每帧旋转的速度
  private rotationSpeed = 0.01;
  // 当前累积的旋转角度
  private currentRotation = 0;

  // 构造函数，初始化RingPoint实例
  constructor(
    radius = 11, // 环的半径，默认值为11
    count = 90, // 环上的点数量，默认值为90
    private color = new THREE.Color("#ffffff"), // 点的颜色，默认值为#A69D98
  ) {
    // 创建一个CircleGeometry几何体，作为环的基础形状
    const circleGeometry = new THREE.CircleGeometry(radius, count);

    // 获取原始位置属性的数据数组，并转换为JSON格式（为了获取数组副本）
    const { array } = (
      circleGeometry.getAttribute("position") as THREE.BufferAttribute
    ).toJSON();

    // 移除中心点坐标，因为我们只需要环上的点
    array.shift();
    array.shift();
    array.shift();

    // 创建一个新的BufferGeometry来存储处理后的数据
    const geometry = new THREE.BufferGeometry();

    // 设置新的位置属性到geometry中
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(array, 3),
    );

    // 调用setSizeAttr方法，设置每个点的大小和颜色属性
    this.setSizeAttr(geometry);

    // 创建Points对象，使用上面准备好的geometry和自定义材质DotMaterial
    this.math = new THREE.Points(
      geometry,
      new DotMaterial(
        {
          near: 30, // 材质参数：近裁剪面距离
          far: -5, // 材质参数：远裁剪面距离（负值可能表示反转）
          maxOpacity: 0.6, // 材质参数：最大不透明度
          fadeDistance: 5, // 材质参数：淡出距离
        },
        {
          USE_ACOLOR: true, // 自定义材质选项：启用aColor属性
          depthTest: false, // 自定义材质选项：禁用深度测试
        },
      ),
    );

    // 开始旋转动画
    this.startRotation();
  }

  // setSizeAttr方法：为几何体设置点大小和颜色属性
  setSizeAttr(geometry: THREE.BufferGeometry) {
    // 计算点的数量
    const pointCount = geometry.getAttribute("position").count;

    // 初始化大小数组，每个点一个浮点数
    const size = new Float32Array(pointCount);
    // 初始化颜色数组，每个点三个浮点数（RGB）
    const aColor = new Float32Array(pointCount * 3);

    // 遍历所有点，随机分配大小，并根据构造函数中的color属性赋值颜色
    for (let i = 0; i < pointCount; i++) {
      size[i] = (Math.random() * 0.5 + 0.5) * 1.5; // 随机生成点的大小
      const i3 = i * 3;
      aColor[i3] = this.color.r; // 设置红色分量
      aColor[i3 + 1] = this.color.g; // 设置绿色分量
      aColor[i3 + 2] = this.color.b; // 设置蓝色分量
    }

    // 将大小数组封装成BufferAttribute并添加到几何体
    geometry.setAttribute("size", new THREE.BufferAttribute(size, 1));

    // 将颜色数组封装成BufferAttribute并添加到几何体
    geometry.setAttribute(
      "aColor",
      new THREE.BufferAttribute(aColor, 3),
    );
  }

  // rotate方法：更新当前旋转角度，并应用到math对象上
  rotate(deltaTime: number) {
    // 根据时间差调整旋转角度（负号表示逆时针旋转）
    this.currentRotation -= this.rotationSpeed * (deltaTime * 2);

    // 更新math对象在Z轴上的旋转角度
    this.math.rotation.z = this.currentRotation;
  }

  // startRotation方法：启动一个动画循环来不断调用rotate方法
  startRotation() {
    const animate = () => {
      // 假设每帧的时间差为 deltaTime（通常应该从实际渲染循环中获取）
      const deltaTime = 1 / 60; // 模拟每秒60帧

      // 调用rotate方法，传入时间差
      this.rotate(deltaTime);

      // 请求下一帧动画
      requestAnimationFrame(animate);
    };

    // 启动动画循环
    requestAnimationFrame(animate);
  }
}
