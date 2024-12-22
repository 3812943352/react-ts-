/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-20 16:36:35
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-22 12:00:58
 * @FilePath: src/views/Page15/particle/Station.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import { ThreeHelper } from "../../ThreeHelper";
import { DotMaterial } from "../../shader/DotMaterial";
import * as THREE from "three";
import { Points } from "three";
import { gsap } from "gsap";
import { CameraInject } from "@/views/Page15/decorators";

@(CameraInject<typeof Station>)
export class Station {
  particle?: THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>;
  private camera!: THREE.PerspectiveCamera;
  private cameraWrapper!: THREE.Object3D;

  constructor() {
    this.loadModel();
  }

  loadModel() {
    ThreeHelper.instance
      .loadDrc("/models/station.drc")
      .then((geo) => {
        if (!geo) {
          console.error("加载的几何体无效");
          return;
        }
        // geo.deleteAttribute("color");
        geo.setAttribute("aColor", geo.attributes.color);

        geo.center();
        geo.rotateY(Math.PI / 2);
        this.particle = new Points(
          geo,
          new DotMaterial(
            {
              near: 20,
              far: -30,
              fadeDistance: 10,
              blur: 0,
              minOpacity: 0,
              maxOpacity: 0,
            },
            {
              USE_ACOLOR: true,
            },
          ),
        );

        ThreeHelper.instance.add(this.particle);
        this.setAnimation();
      });
  }

  setAnimation() {
    const particle = this.particle;
    if (!particle) return;
    // particle.position.y = 8;
    // particle.position.x = -18;
    particle.position.z = -60;
    particle.scale.set(-1, 1, 1);
    particle.rotation.x = 0.35;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#container",
        start: 0,
        end: innerHeight * 1.5,
        scrub: 1,
      },
    });

    const delay = 0.03;
    tl.to(particle.position, { z: 50, y: -15 }, delay);
    tl.to(particle.rotation, { y: 0.5 }, delay);
    tl.to(
      particle.material.uniforms.minOpacity,
      { value: 0.2, duration: 0.1 },
      delay,
    );

    tl.to(
      particle.material.uniforms.maxOpacity,
      { value: 0.23, duration: 0.2 },
      delay,
    );

    tl.to(
      particle.material.uniforms.fadeDistance,
      { value: 7, duration: 0.05 },
      delay + 0.15,
    );
    tl.to(
      particle.material.uniforms.minOpacity,
      { value: 0, duration: 0.1 },
      delay + 0.1,
    );
    tl.to(
      particle.material.uniforms.blur,
      { value: 8, duration: 0.05 },
      delay + 0.15,
    );
  }
}
