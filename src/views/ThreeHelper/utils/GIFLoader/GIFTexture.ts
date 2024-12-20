/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-20 16:36:35
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-18 11:11:19
 * @FilePath: src/ThreeHelper/utils/GIFLoader/GIFTexture.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
/*
 * @Author: hongbin
 * @Date: 2023-03-17 22:17:04
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-18 11:11:19
 * @Description:
 */
import {
    NearestFilter,
    LinearMipMapLinearFilter,
    sRGBEncoding,
    EquirectangularReflectionMapping,
} from "three";

import GifLoader from "./gif-loader";
import GifTexture from "./gif-texture";

export class GIFTexture extends GifLoader {
    image;

    constructor(
        path: string,
        /**
         * 自动播放gif 定时器循环执行
         */
        autoDraw?: "autoDraw",
        onLoad?: (image: GifTexture) => void
    ) {
        super();

        let image = this.load(path, onLoad);
        autoDraw && image.autoDraw();

        // options
        image.mapping = EquirectangularReflectionMapping;
        image.encoding = sRGBEncoding;
        image.magFilter = NearestFilter;
        image.minFilter = LinearMipMapLinearFilter;
        this.image = image;
    }

    draw() {
        this.image.draw();
    }
}
