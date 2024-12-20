/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-20 16:36:35
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-20 15:01:44
 * @FilePath: src/views/Page15/Three/script/index.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
"use client";

import * as THREE from "three";
import { ThreeHelper } from "@/views/ThreeHelper";
import { BaseParticle } from "../../../ThreeHelper/particle/base/ParticleMaterial";
import { MoveParticle } from "../../../ThreeHelper/particle/move/ParticleMaterial";

/**
 * 绘制一个粒子元素
 */
const drawParticle = () => {
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(3, 32, 32));
  sphere.position.set(0, 0, 0);
  const particle = new BaseParticle(sphere, { size: 1 });
  return particle.particle;
};

/**
 * 绘制球形粒子区域
 */
const drawSphereParticle = (pointCount = 100) => {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(pointCount * 3);
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3),
  );

  for (let index = 0; index < pointCount; index++) {
    const r3 = index * 3;
    const position = new THREE.Vector3();
    const nearRadius = 0;
    const distance = nearRadius + Math.random() * 2;
    // position.setFromCylindricalCoords(
    position.setFromSphericalCoords(
      distance,
      Math.random() * Math.PI,
      // Math.log(Math.random()) * 2 - distance / 3
      // Math.log(Math.random())
      Math.random() * 360,
    );

    positions[r3] = position.x;
    positions[r3 + 1] = position.y;
    positions[r3 + 2] = position.z;
  }

  // 更改几何 旋转中心仍为 0，0，0
  geometry.translate(-18, 3, 13);
  geometry.scale(0.2, 0.2, 0.2);

  const mesh = new THREE.Mesh(geometry);
  // 不修改集合 旋转中心为自身中心
  mesh.position.set(1, 0.5, 1);

  const pm = new BaseParticle(mesh, {
    size: 1,
    additiveBlending: true,
  });
  pm.particle.onAfterRender = () => {
    pm.particle.rotation.y += 0.01;
  };
  return pm.particle;
};

/**
 * 绘制移动的球形粒子区域
 */
const drawMoveSphereParticle = (pointCount = 1000) => {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(pointCount * 3);
  const coords = new Float32Array(pointCount * 3);
  const scales = new Float32Array(pointCount * 1);
  // 粒子的坐标
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3),
  );
  // 传递生成点相关的参数 让点绕中心旋转计算使用
  geometry.setAttribute(
    "coords",
    new THREE.BufferAttribute(coords, 3),
  );
  // 大小
  geometry.setAttribute(
    "scale",
    new THREE.BufferAttribute(scales, 1),
  );
  const _position = new THREE.Vector3();

  for (let index = 0; index < pointCount; index++) {
    const r3 = index * 3;
    const nearRadius = 0;
    const radius = nearRadius + Math.random() * 2;
    const phi = Math.random() * Math.PI;
    const theta = Math.random() * 360;

    _position.setFromSphericalCoords(radius, phi, theta);

    coords[r3] = radius;
    coords[r3 + 1] = phi;
    coords[r3 + 2] = theta;

    positions[r3] = _position.x;
    positions[r3 + 1] = _position.y;
    positions[r3 + 2] = _position.z;

    scales[index] = Math.random();
  }

  // geometry.scale(1, 1, 0.65);
  geometry.translate(0, 3, 0);

  const mesh = new THREE.Mesh(geometry);

  const pm = new MoveParticle(mesh, {
    size: 1,
    additiveBlending: true,
  });

  // 每次渲染物体的时候 更新时间
  pm.particle.onAfterRender = () => {
    pm.setTime();
  };

  return pm.particle;
};

export const init = (td: ThreeHelper) => {
  td.addAxis();
  td.frameByFrame();
  td.camera.position.set(10, 10, 10);

  const whiteParticle = drawSphereParticle(50);
  td.add(whiteParticle);
  let parent = whiteParticle;
  for (let i = 0; i < 7; i++) {
    const p = drawSphereParticle(50);
    parent.add(p);
    parent = p;
  }

  td.add(drawMoveSphereParticle(5000));
};
