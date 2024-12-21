/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-12-21 15:39:19
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-21 17:06:49
 * @FilePath: src/views/Page15/commponents/SideNav.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FC } from "react";
import "./sideNav.css";

gsap.registerPlugin(ScrollTrigger);

interface SideNavProps {
  title?: string[];
}
const t = 0.1;
const tt = `translate3d(0px, 0px, 0px) scale(1,${t})`;
const SideNav: FC<SideNavProps> = ({ title }) => {
  return (
    <div
      className="ExploreNav"
      style={{ opacity: 1, visibility: "inherit" }}
    >
      <div className="ExploreNav-inner">
        <a href="">
          <div
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
            <div className="highlightDiamond"></div>
            <div
              className="highlightDiamondOuter"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 0,
                transform: " scale(0.8, 0.8)",
              }}
            ></div>
            <span>1</span>
            <div className="innerDiamond"></div>
          </div>
          <span>home</span>
        </a>
        <a href="">
          <div
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
          <div className="ExploreNav-lineProgress"></div>
          <div className="ExploreNav-diamond">
            <div className="outerDiamond"></div>
            <div className="highlightDiamond"></div>
            <div
              className="highlightDiamondOuter"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 0,
                transform: " scale(0.8, 0.8)",
              }}
            ></div>
            <span>2</span>
            <div className="innerDiamond"></div>
          </div>
          <span>数据集</span>
        </a>
        <a href="">
          <div
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
            <div className="highlightDiamond"></div>
            <div
              className="highlightDiamondOuter"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: 0,
                transform: "scale(0.8, 0.8)",
              }}
            ></div>
            <span>3</span>
            <div className="innerDiamond"></div>
          </div>
          <span>开放统计</span>
        </a>
      </div>
    </div>
  );
};
export default SideNav;
