/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-12-22 13:19:47
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-23 16:24:15
 * @FilePath: src/views/Page15/commponents/scroll.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Scroll: React.FC = () => {
  const scr = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#root",
        start: 0, // 当行的顶部到达视窗中心时开始动画
        end: innerHeight * 0.2, // 动画结束位置，可以根据需要调整
        scrub: 1,
      },
    });
    tl.to(
      scr.current,
      { opacity: 0, scaleX: 0.7, duration: 1, delay: 0.5 },
      "<",
    );
  }, []);
  return (
    <div
      ref={scr}
      className="ScrollHelpIndicator"
      style={{
        textAlign: "center",
        color: "#ffffff",
        fontWeight: 100,
        fontSize: "14px",
        opacity: 1,
        textShadow:
          "0 0 1px #dbeafe,0 0 1px #dbeafe,0 0 1px #dbeafe,0 0 2px #dbeafe,0 0 2px #dbeafe,0 0 2px #dbeafe ",
        translate: "none",
        rotate: "none",
        scale: "none",
        transform: "translate(0px, 0px)",
      }}
    >
      下划
      <svg
        width="40"
        height="40"
        viewBox="0 12 40 40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" fill-rule="evenodd">
          <g stroke="#00ffff">
            <path d="M24.187 29.177l-4.243-4.243-4.242 4.243 4.242 4.242z"></path>
            <path
              opacity=".2"
              d="M24.187 34.177l-4.243-4.243-4.242 4.243 4.242 4.242z"
            ></path>
          </g>
          <path fill="#00ffff" d="M20.45 25V13h-1v12z"></path>
          <path fill="#00ffff" d="M1 12.817h38v1H1z"></path>
        </g>
      </svg>
    </div>
  );
};

export default Scroll;
