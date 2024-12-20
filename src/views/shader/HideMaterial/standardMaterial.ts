/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-12-20 14:36:03
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-20 15:01:46
 * @FilePath: src/views/shader/HideMaterial/standardMaterial.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
/*
 * @Author: hongbin
 * @Date: 2023-06-11 21:57:27
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-20 15:01:46
 * @Description: 继承 standard
 */
import { MeshPhysicalMaterial } from "three";

/**
 * 基于MeshStandardMaterial的自定义shader
 */
export class HideMaterial extends MeshPhysicalMaterial {
  uniforms: {
    axis: { value: number };
    axisLength: { value: number };
    process: { value: number };
    reverse: { value: number };
  };

  constructor(params: {
    axis: number;
    axisLength: number;
    process: number;
    color: THREE.Color;
    reverse?: number;
  }) {
    super({
      color: params.color,
      metalness: 1,
      thickness: 1,
      iridescence: 2,
      iridescenceIOR: 1.2,
    });

    const uniforms = {
      axis: { value: params.axis },
      axisLength: { value: params.axisLength },
      process: { value: params.process },
      reverse: { value: params.reverse || 0 },
    };

    this.uniforms = uniforms;

    this.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, uniforms);

      shader.vertexShader = shader.vertexShader.replace(
        "#include <common>",
        `
                #include <common>
                uniform float axis;
                uniform float axisLength;
                uniform float process;
                uniform float reverse;

                varying float hide;
            `,
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <fog_vertex>",
        `
                #include <fog_vertex>
               
                float dis = 0.;
                float l = axisLength * process;

                if(axis == 0.) {
                    dis = distance(position.x + axisLength, l);
                } else if(axis == 1.) {
                    dis = distance(position.y + axisLength, l);
                } else {
                    dis = distance(position.z + axisLength, l);
                }

                hide = dis > l ? 0.0 : 1.0;
            `,
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "uniform float opacity;",
        `
                uniform float opacity;
                varying float hide;
            `,
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <dithering_fragment>",
        `
                #include <dithering_fragment>
                if(hide == 0.0) {
                    discard;
                }
            `,
      );
    };
  }
}
