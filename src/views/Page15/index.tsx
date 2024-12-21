/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-20 16:36:35
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-21 15:56:34
 * @FilePath: src/views/Page15/index.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import { FC } from "react";
import * as THREE from "three";
import { ThreeHelper } from "../ThreeHelper";
import Layout from "./Three/Layout";
import { gsap } from "gsap";
import { Planet } from "./particle/Planet";
import { Aircraft } from "./particle/Aircraft";
import { Station } from "./particle/Station";
import {
  BlendFunction,
  EffectComposer,
  EffectPass,
  NoiseEffect,
  RenderPass,
} from "postprocessing";
import { NoiseBg } from "./noiseBg";
import { RandomPoint } from "./particle/RandomPoint";
import { RingPoint } from "./particle/RingPoint";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import FadingText from "@/views/commponents/FadingText.tsx";
import ToLogin from "@/views/Page15/commponents/toLogin.tsx";
import SideNav from "@/views/Page15/commponents/SideNav.tsx";

interface IProps {}

const destroyEvent = [] as VoidFunction[];

const Index: FC<IProps> = () => {
  const lines = ["阳光数安", "数据开放平台"];
  return (
    <>
      <Layout
        seoTitle={"星图"}
        init={Main.init}
        destroy={() => destroyEvent.forEach((destroy) => destroy())}
      />
      <div
        id="container"
        style={{
          height: "380vh",
          width: "100%",
        }}
      ></div>
      <div
        style={{
          height: "370vh",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
          background: "rgba(0,0,0,0)",
          // background: "linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%)",
        }}
      >
        <div>
          <FadingText lines={lines}></FadingText>
          <div
            style={{
              position: "fixed",
              top: "5%",
              height: "100vh",
            }}
          >
            <SideNav></SideNav>
          </div>
          <div style={{ position: "fixed", top: "5%", left: "91%" }}>
            <ToLogin></ToLogin>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;

class Main {
  static init(helper: ThreeHelper) {
    helper.camera.fov = 50;
    helper.camera.position.set(0, 0, 40);
    helper.frameByFrame();
    // helper.initLights();
    helper.setBackground("#000023");
    helper.perspectiveCameraControl();
    helper.controls.enableZoom = false;
    const cameraWrap = new THREE.Object3D();
    helper.add(cameraWrap);
    cameraWrap.add(helper.camera);

    const composer = new EffectComposer(helper.renderer);
    const renderPass = new RenderPass(helper.scene, helper.camera);
    renderPass.renderToScreen = false;
    composer.addPass(renderPass);

    const noiseEffect = new NoiseEffect({
      blendFunction: BlendFunction.ADD,
    });
    noiseEffect.blendMode.opacity.value = 0.1;

    const standardPass = new EffectPass(helper.camera, noiseEffect);
    composer.addPass(standardPass);

    const noiseBg = new NoiseBg(helper.camera);
    helper.add(noiseBg.mesh);

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#container",
        start: 0,
        end: innerHeight,
        scrub: 1,
      },
    });

    function setRingPoint(timeline: gsap.core.Timeline) {
      const ringConfig = [{ z: -3 }, { z: 3 }, { z: 7 }, { z: 11 }];
      const pos: Vector3[] = [];
      const opacity: THREE.IUniform[] = [];

      for (const { z } of ringConfig) {
        const ringPoint = new RingPoint();
        ringPoint.math.position.z = z;
        ThreeHelper.instance.add(ringPoint.math);
        pos.push(ringPoint.math.position);
        ringPoint.math.material.uniforms.maxOpacity.value = 0.6;
        opacity.unshift(ringPoint.math.material.uniforms.maxOpacity);
      }

      const ringPoint = new RingPoint();
      ringPoint.math.position.z = -10;
      ThreeHelper.instance.add(ringPoint.math);

      timeline.to(
        pos,
        {
          ease: "power3.inOut",
          duration: 0.02,
          z: (i) => ringConfig[i].z,
          stagger: {
            each: 0.002,
          },
        },
        0,
      );
      timeline
        .to(
          opacity,
          {
            ease: "power3.inOut",
            duration: 0.03,
            value: 0.6,
            stagger: {
              each: 0.002,
            },
          },
          0,
        )
        .to(
          [...pos].reverse(),
          {
            z: 40,
            ease: "power3.inOut",
            duration: 0.2,
            stagger: {
              each: 0.02,
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
    setRingPoint(tl);
    new RandomPoint();
    new Station();
    new Planet();
    new Aircraft();
  }
}
