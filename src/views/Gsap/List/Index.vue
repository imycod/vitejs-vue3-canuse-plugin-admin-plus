<!--
 * @Author: wuxs 317009160@qq.com
 * @Date: 2023-08-25 18:03:36
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-08-28 17:09:13
 * @FilePath: \vue3-plugin-effect-vite-admin-element-plus\src\views\Gsap\List\Index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- 列表 -->
<template>
  <div id="papa">
    <div class="papa" v-for="(ls, index) in list" :key="index">
      {{ index }}.{{ ls.papa }}
    </div>
  </div>
</template>

<script setup>
import gsap from 'gsap'

const list = [
  {
    title: '随机生成一些',
    papa: '这是一个段落，这是一个段落，这是一个段落，这是一个段落，这是一个段落，这是一个段落，这是一个段落。这是一个段落，这是一个段落，这是一个段落，这是一个段落，这是一个段落，这是一个段落，这是一个段落。',
  },
  {
    title: '随机生成一些',
    papa: '这是一个段落，这是一个段落，这是一个段落。',
  },
  {
    title: '随机生成一些',
    papa: '这是一个段落，这是一个段落，这是一个段落，这是一个段落，这是一个段落，这是一个段落，这是一个段落。这是一个段落，这是一个段落，这是一个段落，这是一个段落，这是一个段落，这是一个段落，这是一个段落。',
  },
  {
    title: '随机生成一些',
    papa: '这是一个段落，这是一个段落，这是一个段落。',
  },
  {
    title: '随机生成一些',
    papa: '这是一个段落，这是一个段落，这是一个段落，这是一个段落，这是一个段落，这是一个段落，这是一个段落。这是一个段落，这是一个段落，这是一个段落，这是一个段落，这是一个段落，这是一个段落，这是一个段落。',
  },
  {
    title: '随机生成一些',
    papa: '这是一个段落，这是一个段落，这是一个段落。',
  },
  {
    title: '随机生成一些',
    papa: '这是一个段落，这是一个段落，这是一个段落，这是一个段落，这是一个段落，这是一个段落，这是一个段落。这是一个段落，这是一个段落，这是一个段落，这是一个段落，这是一个段落，这是一个段落，这是一个段落。',
  },
  {
    title: '随机生成一些',
    papa: '这是一个段落，这是一个段落，这是一个段落。',
  },
]

onMounted(() => {
  const papaContainer = document.getElementById('papa')
  console.log('papaContainer.children---', papaContainer.children)
  gsap.from(papaContainer.children, {
    duration: 1,
    opacity: 0,
    y: 100,
    stagger: 0.2,
  })
  console.log(papaContainer)
})
</script>

<style lang="less" scoped>
.papa {
  padding: 20px;
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  color: #000;
  margin-bottom: 10px;
}
</style>
