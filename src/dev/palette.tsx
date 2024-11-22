/**
 * @Author: wb
 * @Date: 2024-11-21 11:15:35
 * @LastEditTime: 2024-11-21 11:15:45
 * @FilePath: src/dev/palette.tsx
 * @Description:
 */
import { Fragment } from "react";
import {
  Category,
  Component,
  Variant,
  Palette,
} from "@react-buddy/ide-toolbox";
import AntdPalette from "@react-buddy/palette-antd";

export const PaletteTree = () => (
  <Palette>
    <Category name="App">
      <Component name="Loader">
        <Variant>
          <ExampleLoaderComponent />
        </Variant>
      </Component>
    </Category>
  </Palette>
);

export function ExampleLoaderComponent() {
  return <Fragment>Loading...</Fragment>;
}
