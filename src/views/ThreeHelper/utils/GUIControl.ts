/*
 * @Author: hongbin
 * @Date: 2023-05-29 15:32:30
 * @LastEditors: hongbin
 * @LastEditTime: 2023-07-14 13:28:08
 * @Description:GUIControl基类 提供基本的参数调试
 */
import { GUI } from "dat.gui";

export class GUIControl {
    folder: GUI;
    static index = 0;
    static functionIndex = 0;

    constructor(
        public gui: GUI,
        private mesh: THREE.Object3D,
        /**
         * @description 参数调整范围大小
         * @default 1
         */
        private size: number,
        private name?: string,
        private open = false
    ) {
        const folderName = name || mesh.name || mesh.type + ++GUIControl.index;
        this.folder = gui.addFolder(folderName);
        open && this.folder.open();
        this.createTransFormControl(mesh.position, "position");
        this.createTransFormControl(mesh.scale, "scale");
        this.createTransFormControl(mesh.rotation, "rotate", Math.PI * 2);

        this.folder.add({ log: () => console.log(mesh) }, "log");
    }

    createTransFormControl(
        vector3: { x: number; y: number; z: number },
        name: string,
        size?: number
    ) {
        const folder = this.folder.addFolder(name);

        if (name == "position") folder.open();

        const min = -(size || this.size);
        const max = size || this.size;

        folder.add(vector3, "x", min, max).step(0.01);
        folder.add(vector3, "y", min, max).step(0.01);
        folder.add(vector3, "z", min, max).step(0.01);
    }

    addFunction(func: VoidFunction, name?: string) {
        this.folder
            .add({ f: func }, "f")
            .name(name || "函数" + GUIControl.functionIndex++);
    }

    addValue(val: number, min?: number, max?: number) {
        const guiItem = this.folder.add({ v: val }, "v", min, max);
        return guiItem;
    }
}
