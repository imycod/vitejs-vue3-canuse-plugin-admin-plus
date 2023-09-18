<script setup>
import useModel from './hooks/useModel.js'
const {
  querys: { demo1: query },
  model,
} = useModel('demo1')
</script>

<template>
  demo1
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
