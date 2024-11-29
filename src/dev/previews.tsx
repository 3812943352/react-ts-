/**
 * @Author: wb
 * @Date: 2024-11-21 11:15:36
 * @LastEditTime: 2024-11-21 11:15:45
 * @FilePath: src/dev/previews.tsx
 * @Description:
 */
import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";
import { PaletteTree } from "./palette";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/CustomModal">
        <CustomModal />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
