<!--
 * @Author: wuxs 317009160@qq.com
 * @Date: 2023-08-25 14:31:48
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-08-25 15:21:25
 * @FilePath: \vue3-plugin-effect-vite-admin-element-plus\src\views\Composition\select2select\componnets\demo2.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import useModel from './hooks/useModel.js'
const {
  querys: { demo2: query },
  model,
} = useModel('demo2')
</script>

<template>
  demo2
  <select
    v-model="query[select.prop]"
    v-for="(select, index) in model"
    :key="index"
  >
    <option
      v-for="option in select.options"
      :key="option.index"
      :value="option.index"
      :label="option.label"
    ></option>
  </select>
</template>
