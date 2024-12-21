/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-12-21 11:16:44
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-21 11:32:20
 * @FilePath: src/views/Page15/commponents/toLogin.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import "./toLogin.css";

const ToLogin: React.FC = () => {
  return (
    <div className="TopBarCtas">
      <a
        target="_blank"
        href="/login"
        className="ButtonCta gradient arrowed"
      >
        <span className="title">登录/注册</span>
        <span className="arrow"></span>
      </a>
    </div>
  );
};

export default ToLogin;
