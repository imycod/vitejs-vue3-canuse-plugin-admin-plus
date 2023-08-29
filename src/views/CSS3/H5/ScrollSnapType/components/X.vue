<template>
  <div class="holster">
    <div class="container x proximity-scroll-snapping" dir="ltr">
      <div>X Prox. LTR</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="less" scoped>
/* coloration */
.holster {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-flow: column nowrap;
  font-family: monospace;
}
.container {
  display: flex;
  overflow: auto;
  outline: 1px dashed lightgray;
  flex: none;
  > div {
    text-align: center;
    scroll-snap-align: start;
    flex: none;
    &:nth-child(even) {
      background-color: #87ea87;
    }
    &:nth-child(odd) {
      background-color: #87ccea;
    }
  }
}
.container.x {
  width: 100%;
  height: 128px;
  flex-flow: row nowrap;
}
.x.proximity-scroll-snapping {
  scroll-snap-type: x mandatory;
}
.x.container {
  > div {
    line-height: 128px;
    font-size: 64px;
    width: 100%;
    height: 128px;
  }
}
</style>
