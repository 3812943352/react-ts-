/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-21 17:22:34
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-18 17:03:54
 * @FilePath: src/views/login/commponents/AnimatedText.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import React, { useEffect, useRef, useState } from "react";

const AnimatedText: React.FC = () => {
  const [text, setText] = useState("");
  const fullText = "阳光数安\n数据开放平台";
  const delay = 100; // 每个字符显示的间隔时间（毫秒）
  const textRef = useRef(text);

  useEffect(() => {
    textRef.current = text; // 更新 ref 的值
  }, [text]);

  useEffect(() => {
    let index = 0;

    const intervalId = setInterval(() => {
      if (index < fullText.length) {
        const newText = textRef.current + fullText.charAt(index);
        setText(newText);
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, delay);

    return () => clearInterval(intervalId); // 清理定时器
  }, [fullText, delay]);

  return (
    <h1 className="px-8 text-5xl font-bold leading-normal">
      {text.split("\n").map((line, i) => (
        <React.Fragment key={i}>
          {line}
          {i < text.split("\n").length - 1 && <br />}
        </React.Fragment>
      ))}
    </h1>
  );
};

export default AnimatedText;
