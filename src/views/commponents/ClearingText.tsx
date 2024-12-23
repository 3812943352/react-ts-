/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-12-22 10:01:31
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-23 15:47:43
 * @FilePath: src/views/commponents/ClearingText.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 确保 GSAP 和 ScrollTrigger 插件已加载
gsap.registerPlugin(ScrollTrigger);

interface MultiLineFadingTextProps {
  lines: string[];
}

const MultiLineFadingText: React.FC<MultiLineFadingTextProps> = ({
  lines,
}) => {
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Initialize GSAP timelines for each line after the spans are rendered by React
    lines.forEach((_, index) => {
      if (containerRefs.current[index]) {
        const chars = Array.from(
          containerRefs.current[index].querySelectorAll(".clear"),
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRefs.current[index],
            start: innerHeight * 9.9, // 当行的顶部到达视窗中心时开始动画
            end: innerHeight * 10, // 动画结束位置，可以根据需要调整
            scrub: 1,
          },
        });

        // Animate each character's blur and opacity within the line
        chars.forEach((char, charIndex) => {
          const delay =
            Math.abs(charIndex - lines[index].length / 2) * 0.05;

          tl.to(
            char,
            {
              filter: `blur(0px)`,
              opacity: 1,
              duration: 3,
              ease: "none",
              delay: delay,
            },
            "<",
          );
        });
      }
    });

    // Cleanup on unmount or when lines change
    return () => {
      lines.forEach((_, index) => {
        if (containerRefs.current[index]) {
          const triggers = ScrollTrigger.getAll();
          triggers.forEach((trigger) => {
            if (trigger.trigger === containerRefs.current[index]) {
              trigger.kill();
            }
          });
        }
      });
    };
  }, [lines]);

  // Create a span for each character in each line to apply individual transformations
  const renderLines = lines.map((line, index) => (
    <div
      key={index}
      ref={(el) => (containerRefs.current[index] = el)}
      className="line-container"
    >
      {line.split("").map((char, charIndex) => {
        let style = {
          filter: `blur(${Math.floor(Math.random() * (15 - 3 + 1)) + 3}px)`,
          opacity: 0,
          fontSize: ".6em",
          textAlign: "center",
        };

        if (char === " ") {
          // Handle spaces
          style = { ...style, display: "inline-block", width: "1em" };
        }

        if (char === "<") {
          // Handle superscript
          return (
            <>
              <span
                key={`${charIndex}-sup`}
                className="clear"
                style={{
                  ...style,
                  verticalAlign: "super",
                  fontSize: "0.7em",
                }}
              >
                {"®"}
              </span>
            </>
          );
        }

        return (
          <span key={charIndex} className="clear" style={style}>
            {char}
          </span>
        );
      })}
    </div>
  ));

  return (
    <div className="multi-line-container">
      {/* Render the lines directly */}
      {renderLines}
    </div>
  );
};

export default MultiLineFadingText;

// Styles can be placed in a separate CSS file or styled-components.
// Here we use inline styles for simplicity.
const styles = `
  .multi-line-container {
  
    font-size: 2em;
    text-align: left;
    white-space: nowrap;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }

  .line-container {
    color: white;
    font-family: "Courier New", Courier, monospace;
    text-align:center;
    text-shadow:
    0 0 1px #dbeafe,   /* 较近的内发光 */
    0 0 1px #dbeafe,  /* 中等距离的发光 */
    0 0 1px #dbeafe,  /* 更远一点的发光 */
    0 0 4px #dbeafe,  /* 较远的发光 */
    0 0 4px #dbeafe,  /* 更远的发光 */
    0 0 4px #dbeafe;  /* 最远的发光 */
    margin-bottom: 5px;
  }

  .line-container .clear {
    display: inline-block;
  }

  @keyframes fadeOutText {
    0% {
      filter: blur(0px);
      opacity: 1;
    }
    100% {
      filter: blur(0px);
      opacity: 0;
    }
  }
`;

// To include the styles, you might want to add them to your global stylesheet or use a style tag:
if (typeof document !== "undefined") {
  const styleTag = document.createElement("style");
  styleTag.type = "text/css";
  styleTag.appendChild(document.createTextNode(styles));
  document.head.appendChild(styleTag);
}
