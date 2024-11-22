/*
 * @Author: wb
 * @Date: 2024-11-20 10:22:50
 * @LastEditors: wb
 * @LastEditTime: 2024-11-21 17:23:23
 * @FilePath: src/views/login/index.tsx
 * @Description: 请填写简介
 */
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import fs from "./shaders/fs.glsl?raw";
import vs from "./shaders/vs.glsl?raw";
import useOnceClick from "@/commponents/clickonce";
import AudioTexture from "./commponents/audioTexture";
import "@/input.css";
import LoginForm from "@/views/login/commponents/loginForm.tsx";
import AnimatedText from "@/views/login/commponents/AnimatedText.tsx";

const View: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    80,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(0, 0, 5);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  scene.add(camera);

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  const { width, height } = renderer.getDrawingBufferSize(
    new THREE.Vector2(),
  );
  //   const controls = new OrbitControls(camera, renderer.domElement);

  const iMouse = new THREE.Vector4();
  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: {
        value: 0,
      },
      iResolution: { value: new THREE.Vector2(width, height) },
      iTime: { value: 0 },
      audioTexture: {
        value: null,
      },
      iMouse: { value: iMouse },

      iChannel0: { value: null },
    },
    side: THREE.DoubleSide,
    vertexShader: vs,
    fragmentShader: fs,
    transparent: true,
  });
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 10),
    shaderMaterial,
  );
  floor.onBeforeRender = () => {
    shaderMaterial.uniforms.iTime.value += 0.01;
  };
  scene.add(floor);

  const play = useOnceClick(() => {
    const audioTexture = new AudioTexture(
      "../../../public/music/zztdd.mp3",
    );
    shaderMaterial.uniforms.iChannel0.value = audioTexture.tAudioData;
    floor.onBeforeRender = () => {
      shaderMaterial.uniforms.iTime.value += 0.01;
      audioTexture.update();
    };
  });

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
  });

  function animate() {
    requestAnimationFrame(animate);
    // controls.update();

    renderer.render(scene, camera);
  }

  //   controls.enableDamping = true;

  function throttle<T extends (...args: any[]) => void>(
    func: T,
    limit: number,
  ): T {
    let inThrottle: boolean = false;

    return function (this: any, ...args: Parameters<T>) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    } as T;
  }

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
      animate();
      const handleMove = throttle((e: any) => {
        iMouse.x = e.pageX;
        iMouse.y = innerHeight - e.pageY;
      }, 17); // 16ms 大约等于每秒 60 次调用，适合大多数情况
      console.info(iMouse.x, iMouse.y);
      document.addEventListener("mousemove", handleMove);

      return () => {
        window.removeEventListener("resize", () => {});
        containerRef.current?.removeChild(renderer.domElement);
        document.removeEventListener("mousemove", handleMove);
      };
    }
  }, []);

  return (
    <div className="relative h-[100vh] w-[100vw]">
      <div
        ref={containerRef}
        className="absolute left-0 top-0 z-0 h-full w-full"
      />
      <div
        onClick={play}
        className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-white/90 backdrop-blur-sm"
      >
        <div className="flex w-full flex-row flex-wrap">
          <div className="hero relative mx-auto my-0 flex max-w-4xl flex-1 flex-shrink-0 px-0">
            <div>
              <AnimatedText />
              <p className="mt-6 px-12 font-mono leading-8">
                如果没有账号
                <br />
                <p className="cursor-pointer text-blue-700">
                  点击这里注册
                </p>
              </p>
            </div>
            <div className="ml-auto">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
