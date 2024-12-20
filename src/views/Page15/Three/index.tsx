/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-20 16:36:35
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-19 10:16:36
 * @FilePath: src/components/Three/index.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
"use client";
/*
 * @Author: hongbin
 * @Date: 2023-01-15 14:29:08
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-19 10:16:36
 * @Description: 新版本使用第三方包需要作为客户端组件渲染
 */
import styled from "styled-components";

export const Container = styled.main`
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background: #000;
`;

export const Title = styled.h1`
    color: #fff;
    font-weight: bold;
    height: 10vh;
    line-height: 10vh;
    text-align: center;
    letter-spacing: 2px;
    text-decoration: underline;
`;

export const Desc = styled.h6`
    color: #ccc;
    font-weight: bold;
    text-align: center;
    letter-spacing: 2px;
`;
