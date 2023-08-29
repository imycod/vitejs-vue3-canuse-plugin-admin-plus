<!--
 * @Author: wuxs 317009160@qq.com
 * @Date: 2023-08-28 10:01:14
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-08-28 16:19:08
 * @FilePath: \vue3-plugin-effect-vite-admin-element-plus\src\views\Gsap\Starter\Index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    comp1
    {{ obj.prop }}
    <div id="ball" :style="{ '--radius': '50%' }"></div>
  </div>
</template>

<script setup>
import gsap from 'gsap'

let ballWidth = '50px'
let ballHeight = '50px'

const obj = reactive({
  myProp: 100,
  prop: 0
})
gsap.to(obj, 5, {
  prop: obj.myProp,
  roundProps: 'prop',
  onUpdate: () => {
    console.log(obj.prop)
  }
})
onMounted(() => {
  gsap.to('#ball', 2, {
    x: '100px',
    delay: 1
  })
})
</script>

<style lang="less" scoped>
#ball {
  background-color: red;
  width: v-bind(ballWidth);
  height: v-bind(ballHeight);
  border-radius: var(--radius);
}
</style>
