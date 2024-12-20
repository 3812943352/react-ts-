/*
 * @Author: hongbin
 * @Date: 2023-05-26 22:40:02
 * @LastEditors: hongbin
 * @LastEditTime: 2023-06-11 23:18:16
 * @Description:
 */
import { ShaderMaterial } from "three/src/materials/ShaderMaterial";
import vertexShader from "./vt.glsl";
import fragmentShader from "./fm.glsl";

export class TaiJiMaterial extends ShaderMaterial {
    constructor(params: {}) {
        const uniforms = {
            iTime: { value: 0 },
        };

        super({
            vertexShader,
            fragmentShader,
            uniforms,
        });
    }
}
