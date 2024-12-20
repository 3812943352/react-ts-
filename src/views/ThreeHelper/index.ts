/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-20 16:36:35
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-20 15:42:29
 * @FilePath: src/views/ThreeHelper/index.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
/*
 * @Author: hongbin
 * @Date: 2022-12-10 08:23:15
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-20 15:42:29
 * @Description:Three.js 包装类
 */
import * as THREE from "three";
import { Mesh } from "three";
import { AnimationPlayer } from "./utils/AnimationPlayer";
import { BaseEnvironment } from "./utils/BaseEnvironment";
import { initGUI } from "./helper/gui";
import { stats } from "./helper/stats";
import { LinearAnimation } from "./utils/LinearAnimation";
import { GlbMesh, IBoxGeometry } from "./types/types";
import { RandomColor } from "./utils";
import { SkeletonAnimation } from "./utils/SkeletonAnimation";

/**
 * 继承的类构造函数参数类型[数组]
 */
type InheritClassParams = ConstructorParameters<
  typeof BaseEnvironment
>;

export class ThreeHelper extends BaseEnvironment {
  frameHandle: number = 0;
  framing: boolean = false;
  protected _animation: VoidFunction = () => {};
  AnimationPlayer = AnimationPlayer;
  SkeletonAnimation = SkeletonAnimation;
  LinearAnimation = LinearAnimation;
  RandomColor = RandomColor;
  stats = stats;
  gui?: ReturnType<typeof initGUI>;
  clock = new THREE.Clock();
  static instance: ThreeHelper;
  runAnimate = true;

  constructor(params: InheritClassParams[0]) {
    super(params);
    if (ThreeHelper.instance) return ThreeHelper.instance;
    ThreeHelper.instance = this;
  }

  /**
   * 添加性能指示器
   */
  addStats() {
    this.stats.init();
  }

  /**
   * 添加gui调试工具
   */
  addGUI(guiName?: string) {
    this.gui = initGUI(guiName);
  }

  /**
   * 向环境中添加物体
   */
  add(...object: THREE.Object3D<THREE.Event>[]) {
    this.scene.add(...object);
  }

  /**
   * 生成矩形 Generate Rectangle
   */
  static generateRect(
    geometryParams: IBoxGeometry,
    parameters?: THREE.MeshPhysicalMaterialParameters,
  ) {
    const geometry = new THREE.BoxGeometry(
      ...Object.values(geometryParams),
    );
    // const material = new THREE.MeshPhysicalMaterial(parameters);
    const material = new THREE.MeshStandardMaterial(parameters);
    const box = new THREE.Mesh(geometry, material);
    return box;
  }

  generateRect = ThreeHelper.generateRect;

  /**
   * 创建矩形
   */
  addRect(
    geometryParams: IBoxGeometry,
    parameters?: THREE.MeshPhysicalMaterialParameters,
  ) {
    const box = ThreeHelper.generateRect(geometryParams, parameters);
    this.add(box);
    //默认物体中心在世界坐标轴上 调整到下方对齐世界坐标轴
    box.position.y += geometryParams.height / 2;
    this.expandBoxTexture(box);
    return box;
  }

  createSphere = ThreeHelper.createSphere;

  /**
   * 创建球形
   */
  static createSphere(
    {
      radius,
      widthSegments,
      heightSegments,
    }: {
      radius: number;
      widthSegments?: number;
      heightSegments?: number;
    },
    parameters?: THREE.MeshStandardMaterialParameters | undefined,
  ) {
    const geometry = new THREE.SphereGeometry(
      radius,
      widthSegments,
      heightSegments,
    );
    const material = new THREE.MeshStandardMaterial(parameters);
    const mesh = new Mesh(geometry, material);
    return mesh;
  }

  /**
   *拓展
   */
  expandBoxTexture(box: Mesh) {
    box.setBoxTexture = (...texts: string[]) => {
      const materials = texts.map(
        (t) =>
          new THREE.MeshStandardMaterial({
            map: this.loadTexture(t),
          }),
      );
      box.material = materials;
      materials.forEach((m) => {
        if (m.map) {
          m.map.encoding = THREE.sRGBEncoding;
        }
      });
    };
  }

  /**
   * 向物体上增加贴图
   */
  setMaterialMap(mesh: GlbMesh, map: string, onload?: VoidFunction) {
    if (mesh && !Array.isArray(mesh.material) && mesh.material) {
      mesh.material.map = this.loadTexture(map, (texture) => {
        texture.flipY = false;
        texture.colorSpace = THREE.SRGBColorSpace;
        onload && onload();
      });
    } else {
      console.log(mesh);
    }
  }

  /**
   * @description: 向物体上增加贴图
   * @param {THREE} scene 模型组
   * @param {string} childName 要设置贴图的子集name
   * @param {string} map 贴图url
   * @param {VoidFunction} onload 纹理加载贴图完毕的回调
   * @return {*}
   */
  setMaterialMapOnChild(
    scene: THREE.Object3D,
    childName: string,
    map: string,
    onload?: VoidFunction,
  ) {
    const bottle = scene.getObjectByName(childName) as GlbMesh;
    if (bottle) this.setMaterialMap(bottle, map, onload);
    else return new Error(`未获取到模型中有 ${childName} 子集`);
  }

  /**
   * 镜头自动旋转
   */
  autoRotate() {
    if (this.controls) {
      this.controls.autoRotate = true;
      this.controls.enableRotate = true;
    }
  }

  /**
   * 设置每帧渲染执行的操作
   */
  animation(call: VoidFunction) {
    this._animation = call;
  }

  /**
   * 逐帧渲染 frame(帧)
   */
  frameByFrame() {
    this.frameHandle = requestAnimationFrame(() =>
      this.frameByFrame(),
    );
    this.controls?.update();
    this.runAnimate && this._animation();
    this.render();
    this.stats.update();
  }

  /**
   *  停止逐帧渲染
   */
  stopFrame() {
    cancelAnimationFrame(this.frameHandle);
    this.frameHandle = 0;
  }

  /**
   * fov — 摄像机视锥体垂直视野角度
   * aspect — 摄像机视锥体长宽比
   * near — 摄像机视锥体近端面
   * far — 摄像机视锥体远端面
   */
  perspectiveCameraControl() {
    if (this.gui) {
      // const folder = this.gui.addFolder("camera");
      // gui 不能识别PerspectiveCamera类型对象 为了让ts支持camera属性 遂将其转换
      // const tsTsCamera = this.camera as Record<
      //     keyof THREE.PerspectiveCamera,
      //     any
      // >;
      // folder.add(
      //     {
      //         log: () => {
      //             console.log(this.camera);
      //         },
      //     },
      //     "log"
      // );
      // folder.add(tsTsCamera, "fov", 0, 130).onChange((v) => {
      //     this.camera.fov = v;
      //     this.camera.updateProjectionMatrix();
      //     this.camera.updateMatrixWorld();
      //     this.camera.position.z = 450 / v;
      // });
      // folder.add(tsTsCamera, "aspect", 0, 5).onChange((v) => {
      //     tsTsCamera.aspect = v;
      //     this.camera.updateProjectionMatrix();
      // });
      // folder
      //     .add({ zoom: this.camera.zoom }, "zoom", 0, 5)
      //     .onChange((v) => {
      //         tsTsCamera.zoom = v;
      //         this.camera.updateProjectionMatrix();
      //     });
      // folder
      //     .add(
      //         tsTsCamera,
      //         "far",
      //         tsTsCamera.far - tsTsCamera.far / 2,
      //         tsTsCamera.far + tsTsCamera.far / 2
      //     )
      //     .onChange((v) => {
      //         this.camera.far = v;
      //         this.camera.updateProjectionMatrix();
      //     });
      // folder.add(tsTsCamera, "near").onChange((v) => {
      //     this.camera.near = v;
      //     this.camera.updateProjectionMatrix();
      // });
    }
  }
}
