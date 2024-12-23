/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-12-21 15:39:19
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-23 16:56:18
 * @FilePath: src/views/Page15/commponents/SideNav.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FC, useEffect, useRef } from "react";
import "./sideNav.css";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface SideNavProps {
  title?: string[];
}

const SideNav: FC<SideNavProps> = ({ title }) => {
  const outDiamond1 = useRef<HTMLDivElement | null>(null);
  const Diamond1 = useRef<HTMLDivElement | null>(null);
  const progress1 = useRef<HTMLDivElement | null>(null);
  const innerDiamond1 = useRef<HTMLDivElement | null>(null);
  const index1 = useRef<HTMLDivElement | null>(null);
  const a1 = useRef<HTMLAnchorElement | null>(null);
  const line1 = useRef<HTMLDivElement | null>(null);
  const outDiamond2 = useRef<HTMLDivElement | null>(null);
  const Diamond2 = useRef<HTMLDivElement | null>(null);
  const progress2 = useRef<HTMLDivElement | null>(null);
  const innerDiamond2 = useRef<HTMLDivElement | null>(null);
  const index2 = useRef<HTMLDivElement | null>(null);
  const a2 = useRef<HTMLAnchorElement | null>(null);
  const line2 = useRef<HTMLDivElement | null>(null);
  const outDiamond3 = useRef<HTMLDivElement | null>(null);
  const Diamond3 = useRef<HTMLDivElement | null>(null);
  const progress3 = useRef<HTMLDivElement | null>(null);
  const innerDiamond3 = useRef<HTMLDivElement | null>(null);
  const index3 = useRef<HTMLDivElement | null>(null);
  const a3 = useRef<HTMLAnchorElement | null>(null);
  const line3 = useRef<HTMLDivElement | null>(null);
  const outDiamond4 = useRef<HTMLDivElement | null>(null);
  const Diamond4 = useRef<HTMLDivElement | null>(null);
  ScrollTrigger.create({
    onUpdate: (self) => {
      console.info(self);
    },
  });
  useEffect(() => {
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: "#root",
        start: 0, // 当行的顶部到达视窗中心时开始动画
        end: innerHeight * 0.05, // 动画结束位置，可以根据需要调整
        scrub: 1,
      },
    });
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: "#root",
        start: innerHeight * 0.15, // 当行的顶部到达视窗中心时开始动画
        end: innerHeight * 3.15, // 动画结束位置，可以根据需要调整
        scrub: 1,
      },
    });
    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: "#root",
        start: innerHeight * 3.15,
        end: innerHeight * 3.2,
        scrub: 1,
      },
    });
    const tl4 = gsap.timeline({
      scrollTrigger: {
        trigger: "#root",
        start: innerHeight * 3.3, // 当行的顶部到达视窗中心时开始动画
        end: innerHeight * 3.35, // 动画结束位置，可以根据需要调整
        scrub: 1,
      },
    });
    const tl5 = gsap.timeline({
      scrollTrigger: {
        trigger: "#root",
        start: innerHeight * 3.45, // 当行的顶部到达视窗中心时开始动画
        end: innerHeight * 6.45, // 动画结束位置，可以根据需要调整
        scrub: 1,
      },
    });
    const tl6 = gsap.timeline({
      scrollTrigger: {
        trigger: "#root",
        start: innerHeight * 6.45, // 当行的顶部到达视窗中心时开始动画
        end: innerHeight * 6.5, // 动画结束位置，可以根据需要调整
        scrub: 1,
      },
    });
    const tl7 = gsap.timeline({
      scrollTrigger: {
        trigger: "#root",
        start: innerHeight * 6.6, // 当行的顶部到达视窗中心时开始动画
        end: innerHeight * 6.65, // 动画结束位置，可以根据需要调整
        scrub: 1,
      },
    });
    const tl8 = gsap.timeline({
      scrollTrigger: {
        trigger: "#root",
        start: innerHeight * 6.75, // 当行的顶部到达视窗中心时开始动画
        end: innerHeight * 9.75, // 动画结束位置，可以根据需要调整
        scrub: 1,
      },
    });
    const tl9 = gsap.timeline({
      scrollTrigger: {
        trigger: "#root",
        start: innerHeight * 9.75, // 当行的顶部到达视窗中心时开始动画
        end: innerHeight * 9.8, // 动画结束位置，可以根据需要调整
        scrub: 1,
      },
    });
    const tl10 = gsap.timeline({
      scrollTrigger: {
        trigger: "#root",
        start: innerHeight * 9.9, // 当行的顶部到达视窗中心时开始动画
        end: innerHeight * 10, // 动画结束位置，可以根据需要调整
        scrub: 1,
      },
    });

    const delay = 0.03;

    //第一幕
    tl1.to(outDiamond1.current, { opacity: 1, duration: 1 }, delay);
    tl1.to(Diamond1.current, { opacity: 1, duration: 1 }, delay);
    tl1.to(index1.current, { opacity: 1, duration: 0.5 }, delay);
    tl1.to(
      innerDiamond1.current,
      { opacity: 0, duration: 0.5 },
      delay,
    );
    tl1.to(a1.current, { marginBottom: 120, duration: 1 }, delay);
    tl1.to(line1.current, { height: 120, duration: 1 }, delay);
    tl2.to(
      progress1.current,
      {
        height: 126,
        scaleY: 1,
        duration: 0.1,
      },
      delay,
    );
    tl3.to(
      progress1.current,
      {
        height: 68,
        scaleY: 0,
        duration: 2,
      },
      delay,
    );
    tl3.to(line1.current, { height: 60, duration: 2 }, delay);
    tl3.to(a1.current, { marginBottom: 60, duration: 2 }, delay);

    tl3.to(outDiamond1.current, { opacity: 0, duration: 2 }, delay);
    tl3.to(Diamond1.current, { opacity: 0, duration: 2 }, delay);
    tl3.to(index1.current, { opacity: 0, duration: 1 }, delay);
    tl3.to(innerDiamond1.current, { opacity: 1, duration: 1 }, delay);

    //第二幕
    tl4.to(outDiamond2.current, { opacity: 1, duration: 1 }, delay);
    tl4.to(Diamond2.current, { opacity: 1, duration: 1 }, delay);
    tl4.to(index2.current, { opacity: 1, duration: 0.5 }, delay);
    tl4.to(
      innerDiamond2.current,
      { opacity: 0, duration: 0.5 },
      delay,
    );
    tl4.to(a2.current, { marginBottom: 120, duration: 1 }, delay);
    tl4.to(line2.current, { height: 120, duration: 1 }, delay);
    tl5.to(
      progress2.current,
      {
        height: 126,
        scaleY: 1,
        duration: 0.1,
      },
      delay,
    );
    tl6.to(
      progress2.current,
      {
        height: 68,
        scaleY: 0,
        duration: 2,
      },
      delay,
    );
    tl6.to(line2.current, { height: 60, duration: 2 }, delay);
    tl6.to(a2.current, { marginBottom: 60, duration: 2 }, delay);

    tl6.to(outDiamond2.current, { opacity: 0, duration: 2 }, delay);
    tl6.to(Diamond2.current, { opacity: 0, duration: 2 }, delay);
    tl6.to(index2.current, { opacity: 0, duration: 1 }, delay);
    tl6.to(innerDiamond2.current, { opacity: 1, duration: 1 }, delay);
    //第三幕
    tl7.to(outDiamond3.current, { opacity: 1, duration: 1 }, delay);
    tl7.to(Diamond3.current, { opacity: 1, duration: 1 }, delay);
    tl7.to(index3.current, { opacity: 1, duration: 0.5 }, delay);
    tl7.to(
      innerDiamond3.current,
      { opacity: 0, duration: 0.5 },
      delay,
    );
    tl7.to(a3.current, { marginBottom: 120, duration: 1 }, delay);
    tl7.to(line3.current, { height: 120, duration: 1 }, delay);
    tl8.to(
      progress3.current,
      {
        height: 126,
        scaleY: 1,
        duration: 0.1,
      },
      delay,
    );
    tl9.to(
      progress3.current,
      {
        height: 68,
        scaleY: 0,
        duration: 2,
      },
      delay,
    );
    tl9.to(line3.current, { height: 60, duration: 2 }, delay);
    tl9.to(a3.current, { marginBottom: 60, duration: 2 }, delay);

    tl9.to(outDiamond3.current, { opacity: 0, duration: 2 }, delay);
    tl9.to(Diamond3.current, { opacity: 0, duration: 2 }, delay);
    tl9.to(index3.current, { opacity: 0, duration: 1 }, delay);
    tl9.to(innerDiamond3.current, { opacity: 1, duration: 1 }, delay);
    //第四幕
    tl10.to(outDiamond4.current, { opacity: 1, duration: 1 }, delay);
    tl10.to(Diamond4.current, { opacity: 1, duration: 1 }, delay);
  }, []);
  const toData1 = () => {
    gsap.to(window, {
      duration: 2,
      scrollTo: { y: innerHeight * 2.4 },
      ease: "none",
    });
  };
  const toData2 = () => {
    gsap.to(window, {
      duration: 2,
      scrollTo: { y: innerHeight * 5.6 },
      ease: "none",
    });
  };
  const toData3 = () => {
    gsap.to(window, {
      duration: 2,
      scrollTo: { y: innerHeight * 9 },
      ease: "none",
    });
  };
  const toData4 = () => {
    gsap.to(window, {
      duration: 2,
      scrollTo: { y: innerHeight * 10 },
      ease: "none",
    });
  };
  return (
    <div
      className="ExploreNav"
      style={{ opacity: 1, visibility: "inherit" }}
    >
      <div className="ExploreNav-inner">
        <a ref={a1}>
          <div
            ref={line1}
            className="ExploreNav-line"
            style={{
              translate: "none",
              rotate: "none",
              scale: "none",
              transform: "translate(0%, 0%)",
            }}
          >
            <div
              className="ExploreNav-lineInner"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: " translate(0px, 0px)",
                opacity: 1,
              }}
            ></div>
          </div>
          <div
            ref={progress1}
            className="ExploreNav-lineProgress"
            style={{
              translate: "none",
              rotate: "none",
              scale: "none",
              transform: "translate3d(0px, 0px, 0px) scale(1, 0)",
              opacity: 1,
            }}
          ></div>
          <div className="ExploreNav-diamond">
            <div className="outerDiamond"></div>
            <div className="highlightDiamond" ref={Diamond1}></div>
            <div
              ref={outDiamond1}
              className="highlightDiamondOuter"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 0,
                transform: " scale(0.8, 0.8)",
              }}
            ></div>
            <span ref={index1}>1</span>
            <div ref={innerDiamond1} className="innerDiamond"></div>
          </div>
          <span style={{ cursor: "pointer" }} onClick={toData1}>
            home
          </span>
        </a>
        <a ref={a2}>
          <div
            ref={line2}
            className="ExploreNav-line"
            style={{
              translate: "none",
              rotate: "none",
              scale: "none",
              transform: "translate(0%, 0%)",
            }}
          >
            <div
              className="ExploreNav-lineInner"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: " translate(0px, 0px)",
                opacity: 1,
              }}
            ></div>
          </div>
          <div
            ref={progress2}
            className="ExploreNav-lineProgress"
          ></div>
          <div className="ExploreNav-diamond">
            <div className="outerDiamond"></div>
            <div className="highlightDiamond" ref={Diamond2}></div>
            <div
              ref={outDiamond2}
              className="highlightDiamondOuter"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 0,
                transform: " scale(0.8, 0.8)",
              }}
            ></div>
            <span ref={index2}>2</span>
            <div ref={innerDiamond2} className="innerDiamond"></div>
          </div>
          <span style={{ cursor: "pointer" }} onClick={toData2}>
            数据集
          </span>
        </a>
        <a ref={a3}>
          <div
            ref={line3}
            className="ExploreNav-line"
            style={{
              translate: "none",
              rotate: "none",
              scale: "none",
              transform: "translate(0%, 0%)",
            }}
          >
            <div
              className="ExploreNav-lineInner"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: " translate(0px, 0px)",
                opacity: 1,
              }}
            ></div>
          </div>
          <div
            ref={progress3}
            className="ExploreNav-lineProgress"
            style={{
              translate: "none",
              rotate: "none",
              scale: "none",
              transform: "translate3d(0px, 0px, 0px) scale(1, 0)",
              opacity: 1,
            }}
          ></div>
          <div className="ExploreNav-diamond">
            <div className="outerDiamond"></div>
            <div className="highlightDiamond" ref={Diamond3}></div>
            <div
              ref={outDiamond3}
              className="highlightDiamondOuter"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 0,
                transform: "scale(0.8, 0.8)",
              }}
            ></div>
            <span ref={index3}>3</span>
            <div ref={innerDiamond3} className="innerDiamond"></div>
          </div>
          <span style={{ cursor: "pointer" }} onClick={toData3}>
            开放统计
          </span>
        </a>
        <a>
          <div className="ExploreNav-diamond end">
            <div className="highlightDiamond" ref={Diamond4}></div>
            <div
              ref={outDiamond4}
              className="highlightDiamondOuter"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 0,
                transform: "scale(0.8, 0.8)",
              }}
            ></div>
            <div className="innerDiamond"></div>
          </div>
          <span style={{ cursor: "pointer" }} onClick={toData4}>
            end
          </span>
        </a>
      </div>
    </div>
  );
};
export default SideNav;
