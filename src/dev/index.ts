/**
 * @Author: wb
 * @Date: 2024-11-21 11:15:36
 * @LastEditTime: 2024-11-21 11:15:45
 * @FilePath: src/dev/index.ts
 * @Description:
 */
import React from "react";
import { useInitial } from "./useInitial";

const ComponentPreviews = React.lazy(() => import("./previews"));

export { ComponentPreviews, useInitial };
