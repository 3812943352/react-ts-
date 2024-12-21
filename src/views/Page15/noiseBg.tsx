/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-20 16:36:35
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-20 17:27:40
 * @FilePath: src/views/Page15/noiseBg.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import { FC } from "react";
import * as THREE from "three";
import { ThreeHelper } from "../ThreeHelper";
import Layout from "./Three/Layout";

interface IProps {}

const destroyEvent = [] as VoidFunction[];

const Index: FC<IProps> = () => {
  return (
    <Layout
      seoTitle={"噪音背景"}
      init={init}
      destroy={() => destroyEvent.forEach((destroy) => destroy())}
    />
  );
};

export default Index;

async function init(helper: ThreeHelper) {
  helper.addStats();
  helper.frameByFrame();
  helper.addGUI();
  helper.addAxis();
  helper.useRoomEnvironment();
  helper.setBackground("#ffffff");

  helper.camera.position.set(0, 0, 10);

  const noiseBg = new NoiseBg(helper.camera);
  helper.add(noiseBg.mesh);

  // const angle = (helper.camera.fov / 2) * (Math.PI / 180);
  // const angle = THREE.MathUtils.degToRad(helper.camera.fov / 2);
  // const height = 2 * Math.tan(angle) * helper.camera.position.z;
  // const width = height * helper.camera.aspect;

  const box = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshStandardMaterial(),
  );

  helper.add(box);
}

export class NoiseBg {
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
  private angle = 0;
  constructor(camera: THREE.PerspectiveCamera) {
    const material = this.material();
    const angle = THREE.MathUtils.degToRad(camera.fov / 2);
    const height = 2 * Math.tan(angle) * camera.position.z;
    const width = height * camera.aspect;

    this.mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      material,
    );

    this.mesh.onAfterRender = () => {
      material.uniforms.iTime.value += 0.01;
    };
  }

  material() {
    return new THREE.ShaderMaterial({
      uniforms: { iTime: { value: 1 } },
      transparent: true,
      vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                vec4 viewPosition = vec4(position, 1.0);
                gl_Position =  viewPosition;
            }`,
      fragmentShader: `
            uniform float iTime;
            varying vec2 vUv;
            #include <common>           
            void main() {
                vec3 color = vec3(rand(vUv * iTime));
                gl_FragColor = vec4(color, 0.1);
            }`,
    });
  }
}
