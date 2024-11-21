/*
 * @Author: wb
 * @Date: 2024-10-28 14:23:24
 * @LastEditors: wb
 * @LastEditTime: 2024-11-02 15:34:33
 * @FilePath: \demo\src\App.tsx
 * @Description: 请填写简介
 */
// import { useState } from 'react'
import "@/input.css";
// import Comp1 from "@/commponents/Comp1/index";
// import Comp2 from "@/commponents/Comp2/index";
// import { Button } from "antd";
// import { UpOutlined } from "@ant-design/icons";
import { useRoutes } from "react-router-dom";
import router from "./router";
const App: React.FC = () => {
  //   //   const [count, setCount] = useState(0)
  const outlet = useRoutes(router);

  return (
    <div className="App select-none bg-white">
      {/* <button

        className="w-full rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
      >
        点击
      </button> */}
      {/* <Button type="primary">按钮</Button>
      <Comp1 />
      <Comp2 />
      <UpOutlined style={{ fontSize: "20px", color: "red" }} /> */}
      {/* <Link to="/home">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/user">User</Link> */}
      {/* <Outlet></Outlet> */}
      {outlet}
    </div>
  );
};

export default App;
