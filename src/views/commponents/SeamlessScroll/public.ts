/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-12-23 11:33:14
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-23 11:33:43
 * @FilePath: src/views/commponents/SeamlessScroll/public.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
window.cancelAnimationFrame = (function () {
  return (
    window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.oCancelAnimationFrame ||
    window.msCancelAnimationFrame ||
    function (id) {
      return window.clearTimeout(id);
    }
  );
})();
window.requestAnimationFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      return window.setTimeout(callback, 1000 / 60);
    }
  );
})();

export default function dataWarm(modelValue: any) {
  if (typeof modelValue !== "boolean" && modelValue.length > 100) {
    console.warn(
      `数据达到了${modelValue.length}条有点多哦~,可能会造成部分老旧浏览器卡顿。`,
    );
  }
}
