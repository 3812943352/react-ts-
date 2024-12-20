/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-20 16:36:35
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-20 15:44:20
 * @FilePath: src/views/Page15/RingPoint.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import { FC } from "react";
import { ThreeHelper } from "../ThreeHelper";
import Layout from "./Three/Layout";
import { RingPoint } from "./particle/RingPoint";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

interface IProps {}

const Index: FC<IProps> = () => {
  return (
    <Layout
      seoTitle={"Ring Point"}
      init={init}
      destroy={Main.destroy}
    />
  );
};

export default Index;

function init(helper: ThreeHelper) {
  // helper.addAxis();
  // helper.frameByFrame();
  // helper.camera.position.set(0, 0, 30);
  // helper.useRoomEnvironment();

  // const ringPoint = new RingPoint();
  // helper.add(ringPoint.math);
  Main.init(helper);
}

class Main {
  static init(helper: ThreeHelper) {
    helper.addAxis();
    helper.frameByFrame();
    helper.camera.position.set(0, 0, 30);
    helper.useRoomEnvironment();
    window.document.body.style.height = "300vh";
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const ringConfig = [{ z: 0 }, { z: 7 }, { z: 12 }, { z: 15 }];
    const pos: Vector3[] = [];

    for (const { z } of ringConfig) {
      const ringPoint = new RingPoint();
      ringPoint.math.position.z = z;
      helper.add(ringPoint.math);
      pos.unshift(ringPoint.math.position);
    }
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: window,
        start: 0,
        end: 300,
        scrub: 1,
        onUpdate: ({ progress }) => {},
      },
    });
    timeline.to(pos, {
      z: 30,
      // yoyo: true,
      // repeat: -1,
      ease: "power3.inOut",
      duration: 2,
      stagger: {
        each: 0.2,
      },
    });
  }

  static destroy() {
    //  destroyEvent.forEach((destroy) => destroy())
  }
}
