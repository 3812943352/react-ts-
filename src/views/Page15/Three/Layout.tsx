/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-12-20 14:37:20
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-20 15:01:46
 * @FilePath: src/views/Page15/Three/Layout.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import { ThreeHelper } from "../../ThreeHelper";
import { FC } from "react";
import { Container } from ".";
import Canvas from "./Canvas";
import { css } from "styled-components";

interface IProps {
  init: (helper: ThreeHelper) => void;
  seoTitle?: string;
  destroy?: VoidFunction;
  style?: ReturnType<typeof css>;
}

const Layout: FC<IProps> = ({ init, destroy, style }) => {
  return (
    <Container>
      <Canvas style={style} init={init} destroy={destroy} />
    </Container>
  );
};

export default Layout;
