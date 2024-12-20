/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-12-20 14:37:20
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-20 14:57:21
 * @FilePath: src/views/Page15/Three/Canvas.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
"use client";
/*
 * @Author: hongbin
 * @Date: 2023-01-15 17:30:45
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-20 14:57:21
 * @Description: three
 */
import { FC, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { ThreeHelper } from "../../ThreeHelper";

interface IProps {
  init: (helper: ThreeHelper) => void;
  destroy?: VoidFunction;
  style?: ReturnType<typeof css>;
}

const Canvas: FC<IProps> = ({ style, init, destroy }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (ref.current) {
      const helper = new ThreeHelper({
        antialias: true,
        canvas: ref.current,
      });
      init(helper);
      helper.listenResize();

      return () => {
        destroy && destroy();
        helper.clearScene();
        helper.stopFrame();
        helper.removeResizeListen();
        helper.removeKeyBoardListen();
      };
    }
  }, [destroy, init]);

  return (
    <Container css={style}>
      <CanvasWrap>
        <canvas ref={ref}></canvas>
      </CanvasWrap>
    </Container>
  );
};

export default Canvas;

const CanvasWrap = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div<{ css?: ReturnType<typeof css> }>`
  height: 100vh;
  width: 100vw;
  ${(props) => props.css}
`;
