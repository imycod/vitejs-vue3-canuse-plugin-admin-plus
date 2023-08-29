<template>
  <div class="y--container">
    <div class="y--container__item" :class="`item--${num}`" v-for="num in 3" :key="num">
      {{ num }}
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="less" scoped>
.y--container {
  scroll-snap-type: y mandatory;
  width: 100%;
  height: 300px;
  overflow: auto;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;

  &__item {
    width: 100%;
    height: 300px;
    text-align: center;
    line-height: 300px;
    scroll-snap-align: start;
  }
  .item--1 {
    background-color: rgb(255, 170, 170);
  }
  .item--2 {
    background-color: aquamarine;
  }
  .item--3 {
    background-color: #0f0;
  }
  /* 滚动条样式 */
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
}
</style>
