/**
 * @Author: wb
 * @Date: 2024-11-21 11:15:36
 * @LastEditTime: 2024-11-21 11:15:45
 * @FilePath: src/dev/previews.tsx
 * @Description:
 */
import { Previews } from "@react-buddy/ide-toolbox";
import { PaletteTree } from "./palette";

const ComponentPreviews = () => {
  return <Previews palette={<PaletteTree />}></Previews>;
};

export default ComponentPreviews;
