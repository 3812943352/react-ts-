/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-20 16:36:35
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-19 09:47:01
 * @FilePath: src/shader/BaGuaMaterial/material.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
/*
 * @Author: hongbin
 * @Date: 2023-05-26 22:40:02
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-19 09:47:01
 * @Description:
 */
import { ShaderMaterial } from "three/src/materials/ShaderMaterial";
import vertexShader from "./vt.glsl";
import fragmentShader from "./fm.glsl";

export class BaGuaMaterial extends ShaderMaterial {
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
