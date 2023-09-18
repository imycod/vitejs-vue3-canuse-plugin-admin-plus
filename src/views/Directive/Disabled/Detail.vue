<!--
 * @Author: wuxs 317009160@qq.com
 * @Date: 2023-08-11 11:38:50
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-08-18 14:23:08
 * @FilePath: \vue3-plugin-effect-vite-admin-element-plus\src\views\Directive\Disabled\Detail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>{{ x }} - {{ y }}</div>
</template>

<script lang="ts" setup>
import { useMouse } from '@vueuse/core'

const { x, y } = useMouse()
</script>
