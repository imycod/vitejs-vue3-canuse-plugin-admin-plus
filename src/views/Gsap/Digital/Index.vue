<template>
  <div>
    <div v-for="(ls, index) in list" :key="index">{{ ls.count }}</div>
  </div>
</template>

<script setup>
import gsap from 'gsap'
import { onMounted } from 'vue'
const list = ref([])
let res = [
  {
    count: 1000
  },
  {
    count: 1200
  },
  {
    count: 4000
  },
  {
    count: 9000
  },
  {
    count: 2000
  },
  {
    count: 5000
  }
]
list.value = res.map((item) => {
  return {
    ...item,
    count: 0
  }
})
onMounted(() => {
  list.value.forEach((item, index) => {
    gsap.to(item, {
      duration: 2,
      count: res[index].count,
      roundProps: 'count'
      //   onUpdate: () => (item.count = item.count)
    })
  })
})
</script>
