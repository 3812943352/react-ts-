/*
 * @Author: wb
 * @Date: 2024-11-20 10:22:50
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-19 09:26:26
 * @FilePath: src/views/login/index.tsx
 * @Description: 请填写简介
 */
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import fs from "./shaders/fs.glsl?raw";
import vs from "./shaders/vs.glsl?raw";
import { gsap } from "gsap";
import {
  setOuth,
  setOuthList,
  setToken,
  setUser,
} from "@/store/user/actions.tsx";
import { useDispatch } from "react-redux";
import eventBus from "@/utils/events.ts";
import Application from "@/views/login/Application.ts";
import ForgetForm from "@/views/login/commponents/forgetForm.tsx";
import LoginForm from "@/views/login/commponents/loginForm.tsx";
import RegisterForm from "@/views/login/commponents/registerForm.tsx";
import AnimatedText from "@/views/login/commponents/AnimatedText.tsx";

const View: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isForget, setIsForget] = useState(true);
  const loginRef = useRef(null);
  const forgetRef = useRef(null);
  const registerRef = useRef(null);
  const has = useRef(null);
  const has1 = useRef(null);
  const has2 = useRef(null);
  const tl = gsap.timeline();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(setOuth(null));
    dispatch(setOuthList(null));
  }, []);

  const move = () => {
    tl.to(forgetRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "power1.inOut",
    });
    tl.to(loginRef.current, {
      x: 0,
      y: 1000,
      duration: 0.5,
      ease: "power1.inOut",
    });
    if (isLoggedIn) {
      eventBus.emit("Lgetcap");
      tl.to(registerRef.current, {
        x: 0,
        y: -900,
        duration: 0.5,
        ease: "power1.inOut",
      });
    } else {
      eventBus.emit("Rgetcap");
      tl.to(registerRef.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power1.inOut",
      });
      tl.to(loginRef.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power1.inOut",
      });
    }

    setIsLoggedIn(!isLoggedIn);
    setIsForget(true);
  };
  const forget = () => {
    tl.to(registerRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "power1.inOut",
    });
    tl.to(loginRef.current, {
      x: 0,
      y: -1000,
      duration: 0.5,
      ease: "power1.inOut",
    });
    if (isForget) {
      eventBus.emit("Fgetcap");
      tl.to(forgetRef.current, {
        x: 0,
        y: 1100,
        duration: 0.5,
        ease: "power1.inOut",
      });
    } else {
      eventBus.emit("Rgetcap");
      tl.to(forgetRef.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power1.inOut",
      });

      tl.to(loginRef.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power1.inOut",
      });
    }
    setIsForget(!isForget);
    setIsLoggedIn(true);
  };
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
      new Application();
    }

    // 清理函数，用于在组件卸载或重新渲染时清理副作用
    return () => {
      // 如果有需要清理的内容（比如事件监听器），在这里执行
    };
  }, []);
  // useEffect(() => {
  //   if (containerRef.current) {
  //     containerRef.current.appendChild(renderer.domElement);
  //
  //     animate();
  //     const handleMove = throttle((e: any) => {
  //       iMouse.x = e.pageX;
  //       iMouse.y = innerHeight - e.pageY;
  //     }, 17); // 16ms 大约等于每秒 60 次调用，适合大多数情况
  //     document.addEventListener("mousemove", handleMove);
  //
  //     return () => {
  //       window.removeEventListener("resize", () => {});
  //       containerRef.current?.removeChild(renderer.domElement);
  //       document.removeEventListener("mousemove", handleMove);
  //     };
  //   }
  // }, []);

  return (
    <div className="relative h-[100vh] w-[100vw]">
      <div
        ref={containerRef}
        className="experience absolute left-0 top-0 z-0 h-full w-full"
      />
      <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-white/0 backdrop-blur-sm">
        <div className="flex w-full flex-row flex-wrap">
          <div className="hero relative mx-auto my-0 flex max-w-4xl flex-1 flex-shrink-0 px-0">
            <div className="text-blue-100">
              <AnimatedText />
              <div
                ref={has}
                className="mt-6 px-12 font-mono leading-8"
              >
                {isLoggedIn ? "如果没有账号" : "已有账号"}

                <br />
                <div
                  ref={has1}
                  onClick={move}
                  className="cursor-pointer text-blue-300"
                >
                  {isLoggedIn ? "点击这里注册" : "返回登录"}
                </div>
                <div
                  ref={has2}
                  onClick={forget}
                  className="cursor-pointer text-blue-300"
                >
                  {isForget ? "忘记密码？" : "返回登录"}
                </div>
              </div>
            </div>
            <div className="ml-auto">
              <ForgetForm ref={forgetRef} />
              <LoginForm ref={loginRef} />

              <RegisterForm ref={registerRef} />

              {/*{isLoggedIn ? <LoginForm /> : }*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
