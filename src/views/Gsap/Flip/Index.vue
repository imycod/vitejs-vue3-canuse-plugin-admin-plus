<!--
 * @Author: wuxs 317009160@qq.com
 * @Date: 2023-08-30 09:40:55
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-08-30 14:22:34
 * @FilePath: \vue3-plugin-effect-vite-admin-element-plus\src\views\Gsap\Flip\Index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="my-flip-container">
    <div class="bd">
      <ElButton type="primary" @click="move">move</ElButton>
      <div class="box" ref="boxRef"></div>
    </div>
    <div class="bd">
      <Comp1 />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ElButton } from 'element-plus'
import Comp1 from './Comp1.vue'
const boxRef = ref<HTMLElement>(null)
function move() {
  const box = boxRef.value
  const firstRect = box.getBoundingClientRect()
  box.style.position = 'relative'
  box.style.left = '200px'
  const lastRect = box.getBoundingClientRect()
  const invert = firstRect.left - lastRect.left
  box.animate([{ transform: `translateX(${invert}px)` }, { transform: 'translateX(0)' }], {
    duration: 400,
    easing: 'cubic-bezier(0.68, -0.55, 0.27, 0.65)'
  })
}
</script>
<style lang="less" scoped>
.my-flip-container {
  .bd {
    border: 1px solid #000;
  }
  .box {
    background-color: #f60;
    color: #fff;
    width: 100px;
    height: 100px;
  }
}
</style>
