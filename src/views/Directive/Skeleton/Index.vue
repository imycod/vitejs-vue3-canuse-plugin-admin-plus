<!--
 * @Author: wuxs 317009160@qq.com
 * @Date: 2023-08-11 11:56:02
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-08-11 11:56:16
 * @FilePath: \ehr-console-pcd:\studio\vue-project\vue3-plugin-effect-vite-admin-element-plus\src\views\Directive\Skeleton\Index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="v_-skeleton-container">
    <div class="container-box" v-skeleton-style></div>
    <div class="box" v-skeleton-item-style></div>
    <div class="container-box" v-skeleton="{ count: 18, loading: loading }">
      <div class="box" v-skeleton-item v-for="(item, index) in list" :key="index">
        {{ item }} - {{ index }}
      </div>
    </div>
    <button @click="loadmore">加载更多</button>
  </div>
</template>

<script lang="ts" setup>
import gsap from 'gsap'

const list = ref(null)
const loading = ref(true)

function animation(config) {
  const { target, direction } = config
  nextTick(() => {
    const x = -10
    const y = 10

    const option = {
      duration: 0.5,
      opacity: 0,
      stagger: 0.1,
      ease: 'back.in'
    }
    direction === 'x' ? (option.x = x) : (option.y = y)
    gsap.from(target, option)
  })
}

function initAnimate() {
  const newItems = document.querySelectorAll('.box:not(.animated)')
  newItems.forEach((item) => {
    item.classList.add('animated')
    animation({
      target: item,
      direction: 'y'
    })
  })
}

function getList(init = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      init
        ? resolve([
            'item1',
            'item2',
            'item3',
            'item1',
            'item2',
            'item3',
            'item1',
            'item2',
            'item3',
            'item1',
            'item2',
            'item3',
            'item1',
            'item2',
            'item3',
            'item1',
            'item2',
            'item3'
          ])
        : resolve([...list.value, 'item2', 'item3', 'item1', 'item2', 'item3', 'item1'])
    }, 500)
  })
}

onMounted(async () => {
  loading.value = true
  const result = await getList(true).finally(() => {
    loading.value = false
  })
  list.value = result
  nextTick(() => {
    initAnimate()
  })
})
async function loadmore() {
  const result = await getList()
  list.value = result
  nextTick(() => {
    initAnimate()
  })
}
</script>

<style lang="less">
.v_-skeleton-container {
  width: 1024px;
  margin: 0 auto;
  flex-wrap: wrap;
}

.container-box {
  display: flex;
  flex-wrap: wrap;
}

.box {
  width: 300px;
  height: 50px;
  margin-bottom: 10px;
  margin-right: 10px;
  border: 1px solid #000;
}

.sk-hidden {
  visibility: hidden;
}
</style>
