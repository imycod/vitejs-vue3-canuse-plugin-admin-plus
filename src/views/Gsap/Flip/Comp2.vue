<!--
 * @Author: wuxs 317009160@qq.com
 * @Date: 2023-08-30 09:40:55
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-08-30 15:51:57
 * @FilePath: \vue3-plugin-effect-vite-admin-element-plus\src\views\Gsap\Flip\Index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="bd">
    <ElButton type="primary" @click="add">add</ElButton>
    <ul class="row-container">
      <li class="row bd" v-for="(f, i) in frameworks" :key="i">{{ f.name }} - {{ f.votes }}</li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { ElButton } from 'element-plus'
import { Flip } from '@/utils/domUtils'

const frameworks = ref([
  { name: '222', votes: 0 },
  { name: '333', votes: 0 },
  { name: '444', votes: 0 }
])

function add() {
  frameworks.value.unshift({
    name: '444',
    votes: 0
  })
}
</script>
<style lang="less" scoped>
.bd {
  border: 1px solid #000;
}

.bd {
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
