/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-20 16:36:35
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-20 16:19:43
 * @FilePath: src/views/Page15/particle/Planet.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import { ThreeHelper } from "../../ThreeHelper";
import { DotMaterial } from "../../shader/DotMaterial";
import * as THREE from "three";
import { Points } from "three";
import { gsap } from "gsap";
import { CameraInject } from "@/views/Page15/decorators";

@(CameraInject<typeof Planet>)
export class Planet {
  camera = ThreeHelper.instance.camera;
  cameraWrapper = ThreeHelper.instance.camera.parent;
  particle?: THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>;

  constructor() {
    this.loadModel();
  }

  loadModel() {
    ThreeHelper.instance.loadDrc("/models/planet.drc").then((geo) => {
      console.log(geo);
      geo.setAttribute("aColor", geo.attributes.color);
      geo.deleteAttribute("color");
      geo.center();
      geo.rotateY(1.2);
      this.particle = new Points(
        geo,
        new DotMaterial(
          {
            near: 17,
            far: -15,
            fadeDistance: 4,
            blur: 3,
            baseParticleSize: 3,
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
    particle.position.y = 8;
    particle.position.x = -18;
    particle.position.z = -37;
    particle.scale.set(-1, 1, 1);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#container",
        start: innerHeight * 0.8,
        end: innerHeight * 1.8,
        scrub: 1,
      },
    });

    tl.to(particle.position, { z: 20, y: 5 }, 0).to(
      particle.position,
      {
        z: 30,
      },
    );
    tl.to(
      this.cameraWrapper.position,
      { z: -20, duration: 1 - 0.17 - 0.1 },
      0.17,
    );
    tl.to(
      this.camera,
      {
        duration: 1 - 0.17 - 0.1,
        fov: 50,
        onUpdate: () => this.camera.updateProjectionMatrix(),
      },
      0.17,
    );

    tl.to(
      this.camera,
      {
        duration: 0.1,
        fov: 50,
        onUpdate: () => this.camera.updateProjectionMatrix(),
      },
      0.9,
    );
    tl.to(particle.position, { x: -40, duration: 0.1 }, 0.9);
  }
}
