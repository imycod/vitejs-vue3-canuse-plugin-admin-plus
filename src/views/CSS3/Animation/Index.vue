<!--
 * @Author: wuxs 317009160@qq.com
 * @Date: 2023-08-30 16:14:28
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-08-30 16:41:26
 * @FilePath: \vue3-plugin-effect-vite-admin-element-plus\src\views\CSS3\Animation\Index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div class="box"></div>
  </div>
</template>

<style lang="less" scoped>
//  document.querySelector("div").style.animationPlayState = mode;
.box {
  width: 50px;
  height: 50px;
  background-color: pink;
  animation-name: test;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  //   animation-play-state: paused;
  //   animation-timing-function: cubic-bezier(0.29, 1.69, 0.39, -0.05);
  //   animation-direction: alternate-reverse;
  //   animation-fill-mode: forwards; // 用100%的最后帧
}
@keyframes test {
  50% {
    // 中间
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
}
</style>
