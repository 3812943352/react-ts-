/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-20 16:36:35
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-23 16:19:33
 * @FilePath: src/views/Page15/index.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import React, { FC, useEffect, useRef, useState } from "react";
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
import ToLogin from "@/views/Page15/commponents/toLogin.tsx";
import SideNav from "@/views/Page15/commponents/SideNav.tsx";
import ClearingText from "@/views/commponents/ClearingText.tsx";
import FadingText from "@/views/commponents/FadingText.tsx";
import Scroll from "@/views/Page15/commponents/scroll.tsx";
import DataBG from "@/views/Page15/commponents/dataBG.tsx";
import NewBet from "@/views/commponents/scroll.tsx";

gsap.registerPlugin(ScrollTrigger);

interface IProps {}

const destroyEvent = [] as VoidFunction[];

const Index: FC<IProps> = () => {
  const lines = ["阳光数安<", "数据开放平台"];
  const lines1 = [
    `宝鸡市阳光网络技术有限公司 `,
    ` Copyright © 2006-${new Date().getFullYear()} All Rights Reserved.`,
    `备案序号：陕ICP备17000483号-1`,
  ];
  const data1 = useRef<HTMLDivElement | null>(null);
  const data2 = useRef<HTMLDivElement | null>(null);
  const data3 = useRef<HTMLDivElement | null>(null);
  const data4 = useRef<HTMLDivElement | null>(null);
  const data5 = useRef<HTMLDivElement | null>(null);
  const data6 = useRef<HTMLDivElement | null>(null);
  const data7 = useRef<HTMLDivElement | null>(null);
  const data8 = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(300);
  const [datas1, setDatas1] = useState([
    {
      gameName: "象财神",
      player: "Dorothy MurrayDorothy Murray",
      betAmount: 4020,
      profit: -476.53,
    },
    {
      gameName: "皇上吉祥",
      player: "隐身",
      betAmount: 4020,
      profit: 516.82,
    },
    {
      gameName: "水果丛林",
      player: "Frederick Long",
      betAmount: 4020,
      profit: 809.59,
    },
    {
      gameName: "唐伯虎点秋香",
      player: "隐身",
      betAmount: 4020,
      profit: -928.13,
    },
    {
      gameName: "鼠鼠福福",
      player: "Adele Moody",
      betAmount: 4020,
      profit: -901.85,
    },
    {
      gameName: "宝石侠-1111",
      player: "Maggie Cobb",
      betAmount: 4020,
      profit: 135.91,
    },
    {
      gameName: "糖果连连爆",
      player: "Jeremiah Harran",
      betAmount: 4020,
      profit: 960.88,
    },
    {
      gameName: "艳后之迷",
      player: "Nellie Wong",
      betAmount: 4020,
      profit: 227.48,
    },
    {
      gameName: "象财神",
      player: "Dorothy MurrayDorothy Murray",
      betAmount: 4020,
      profit: -476.53,
    },
    {
      gameName: "皇上吉祥",
      player: "隐身",
      betAmount: 4020,
      profit: 516.82,
    },
    {
      gameName: "水果丛林",
      player: "Frederick Long",
      betAmount: 4020,
      profit: 809.59,
    },
    {
      gameName: "唐伯虎点秋香",
      player: "隐身",
      betAmount: 4020,
      profit: -928.13,
    },
    {
      gameName: "鼠鼠福福",
      player: "Adele Moody",
      betAmount: 4020,
      profit: -901.85,
    },
    {
      gameName: "宝石侠-1111",
      player: "Maggie Cobb",
      betAmount: 4020,
      profit: 135.91,
    },
    {
      gameName: "糖果连连爆",
      player: "Jeremiah Harran",
      betAmount: 4020,
      profit: 960.88,
    },
    {
      gameName: "艳后之迷",
      player: "Nellie Wong",
      betAmount: 4020,
      profit: 227.48,
    },
  ]);

  useEffect(() => {
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: "#root",
        start: innerHeight * 1.65, // 当行的顶部到达视窗中心时开始动画
        end: innerHeight * 1.8, // 动画结束位置，可以根据需要调整
        scrub: 1,
      },
    });
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: "#root",
        start: innerHeight * 3, // 当行的顶部到达视窗中心时开始动画
        end: innerHeight * 3.15, // 动画结束位置，可以根据需要调整
        scrub: 1,
      },
    });
    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: "#root",
        start: innerHeight * 4.95, // 当行的顶部到达视窗中心时开始动画
        end: innerHeight * 5.1, // 动画结束位置，可以根据需要调整
        scrub: 1,
      },
    });
    const tl4 = gsap.timeline({
      scrollTrigger: {
        trigger: "#root",
        start: innerHeight * 6.3, // 当行的顶部到达视窗中心时开始动画
        end: innerHeight * 6.45, // 动画结束位置，可以根据需要调整
        scrub: 1,
      },
    });
    const tl5 = gsap.timeline({
      scrollTrigger: {
        trigger: "#root",
        start: innerHeight * 8.25, // 当行的顶部到达视窗中心时开始动画
        end: innerHeight * 8.4, // 动画结束位置，可以根据需要调整
        scrub: 1,
      },
    });
    const tl6 = gsap.timeline({
      scrollTrigger: {
        trigger: "#root",
        start: innerHeight * 9.6, // 当行的顶部到达视窗中心时开始动画
        end: innerHeight * 9.75, // 动画结束位置，可以根据需要调整
        scrub: 1,
      },
    });
    const delay = 0.01;
    tl1.to(
      data1.current,
      { opacity: 1, width: "100%", duration: 1 },
      delay,
    );
    tl1.to(
      data2.current,
      { opacity: 1, width: "100%", duration: 1 },
      delay,
    );
    tl2.to(
      data1.current,
      { opacity: 0, width: "0%", duration: 1 },
      delay,
    );
    tl2.to(
      data2.current,
      { opacity: 0, width: "0%", duration: 1 },
      delay,
    );
    tl3.to(
      data3.current,
      { opacity: 1, height: "25", duration: 1 },
      delay,
    );
    tl3.to(
      data4.current,
      { opacity: 1, height: "25", duration: 1 },
      delay,
    );
    tl3.to(
      data5.current,
      { opacity: 1, height: "25", duration: 1 },
      delay,
    );
    tl4.to(
      data3.current,
      { opacity: 0, height: "0", duration: 1 },
      delay,
    );
    tl4.to(
      data4.current,
      { opacity: 0, height: "0", duration: 1 },
      delay,
    );
    tl4.to(
      data5.current,
      { opacity: 0, height: "0", duration: 1 },
      delay,
    );

    tl5.to(
      data6.current,
      { opacity: 1, height: "25", duration: 1 },
      delay,
    );
    tl5.to(
      data7.current,
      { opacity: 1, height: "25", duration: 1 },
      delay,
    );
    tl5.to(
      data8.current,
      { opacity: 1, height: "25", duration: 1 },
      delay,
    );
    tl6.to(
      data6.current,
      { opacity: 0, height: "0", duration: 1 },
      delay,
    );
    tl6.to(
      data7.current,
      { opacity: 0, height: "0", duration: 1 },
      delay,
    );
    tl6.to(
      data8.current,
      { opacity: 0, height: "0", duration: 1 },
      delay,
    );
  }, []);
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
          height: "1100vh",
          width: "100%",
        }}
      ></div>
      <div
        style={{
          height: "1100vh",
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
          <ClearingText lines={lines1}></ClearingText>
          <div
            style={{
              position: "fixed",
              top: "5%",
              height: "100vh",
            }}
          >
            <SideNav></SideNav>
          </div>
          <div style={{ position: "fixed", top: "2%", left: "91%" }}>
            <ToLogin></ToLogin>
          </div>
          <div style={{ position: "fixed", top: "93%", left: "50%" }}>
            <Scroll></Scroll>
          </div>
          <div
            ref={data1}
            style={{
              width: "0%",
              opacity: 0,
              height: "25px",
              position: "fixed",
              top: "10%",
              left: "52%",
            }}
          >
            <DataBG title={"最近更新数据"}></DataBG>
            <NewBet
              header={["1", "2", "3", "4"]}
              height={height}
              data={datas1}
            ></NewBet>
          </div>
          <div
            ref={data2}
            style={{
              width: "0%",
              opacity: 0,
              height: "25px",
              position: "fixed",
              top: "50%",
              left: "52%",
            }}
          >
            <DataBG title={"接口调用总量TOP10"}></DataBG>
            <NewBet
              header={["1", "2", "3", "4"]}
              height={height}
              data={datas1}
            ></NewBet>
          </div>
          <div
            ref={data3}
            style={{
              width: "100%",
              opacity: 0,
              height: "0px",
              position: "fixed",
              top: "35%",
              left: "-10%",
            }}
          >
            <DataBG title={"数据集下载量TOP10"}></DataBG>
            <NewBet
              header={["1", "2", "3", "4"]}
              height={height}
              data={datas1}
            ></NewBet>
          </div>
          <div
            ref={data4}
            style={{
              width: "100%",
              opacity: 0,
              height: "0px",
              position: "fixed",
              top: "35%",
              left: "16%",
            }}
          >
            <DataBG title={"数据接口调用TOP10"}></DataBG>
            <NewBet
              header={["1", "2", "3", "4"]}
              height={height}
              data={datas1}
            ></NewBet>
          </div>
          <div
            ref={data5}
            style={{
              width: "100%",
              opacity: 0,
              height: "0px",
              position: "fixed",
              top: "35%",
              left: "42%",
            }}
          >
            <DataBG title={"市级部门/区域"}></DataBG>
            <NewBet
              header={["1", "2", "3", "4"]}
              height={height}
              data={datas1}
            ></NewBet>
          </div>
          <div
            ref={data6}
            style={{
              width: "100%",
              opacity: 0,
              height: "0px",
              position: "fixed",
              top: "40%",
              left: "15%",
            }}
          >
            <DataBG title={"接口总数"}></DataBG>
          </div>
          <div
            ref={data7}
            style={{
              width: "100%",
              opacity: 0,
              height: "0px",
              position: "fixed",
              top: "50%",
              left: "15%",
            }}
          >
            <DataBG title={"接口调用量"}></DataBG>
          </div>
          <div
            ref={data8}
            style={{
              width: "100%",
              opacity: 0,
              height: "0px",
              position: "fixed",
              top: "60%",
              left: "15%",
            }}
          >
            <DataBG title={"市级部门数据TOP10"}></DataBG>
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
