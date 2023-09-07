<!--
 * @Author: wuxs 317009160@qq.com
 * @Date: 2023-08-30 09:40:55
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-08-30 15:31:27
 * @FilePath: \vue3-plugin-effect-vite-admin-element-plus\src\views\Gsap\Flip\Index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="bd">
    <ElButton type="primary" @click="inserBefore">insetBefore</ElButton>
    <ul class="row-container">
      <li class="row" :class="f.isActive ? 'is-active' : null" v-for="(f, i) in frameworks" :key="i"
        >{{ f.name }} - {{ f.votes }}</li
      >
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { ElButton } from 'element-plus'

const frameworks = ref([
  { name: '222', votes: 0, isActive: true },
  { name: '333', votes: 0, isActive: false },
  { name: '444', votes: 0, isActive: false }
])

const Dom = reactive({
  first: null,
  last: null,
  firstTop: 0,
  lastTop: 0,
  Container: null
})
onMounted(() => {
  Dom.first = document.querySelector('.row:first-child')
  Dom.last = document.querySelector('.row:last-child')
  Dom.Container = document.querySelector('.row-container')

  const first = Dom.first.getBoundingClientRect()
  Dom.firstTop = first.top
})
function inserBefore() {
  const last = Dom.last.getBoundingClientRect()
  Dom.Container.appendChild(Dom.first)
  Dom.lastTop = last.top

  const invert = Dom.firstTop - Dom.lastTop
  const player = Dom.first.animate(
    [{ transform: `translateY(${invert}px)` }, { transform: 'translateY(0)' }],
    {
      duration: 300,
      easing: 'cubic-bezier(0,0,0.32,1)'
    }
  )
}
</script>
<style lang="less" scoped>
.bd {
  border: 1px solid #000;
  .row {
    width: 500px;
    padding: 10px;
    border-radius: 10px;
    height: 50px;
  }

  .is-active {
    background-color: #f60;
    color: #fff;
  }
}
</style>
