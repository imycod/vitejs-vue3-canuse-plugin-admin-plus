<!--
 * @Author: wuxs 317009160@qq.com
 * @Date: 2023-08-10 12:57:27
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-08-29 16:42:50
 * @FilePath: \ehr-console-pcd:\studio\vue-project\vue3-plugin-effect-vite-admin-element-plus\src\views\Directive\Disabled.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { ElTabs, ElTabPane, ElButton } from 'element-plus'
import {
  setContentFull,
  getViewportOffset,
  toggleClass,
} from '@/utils/domUtils'
import { getTestFiles } from '@/api/files'
import { downloadFile } from '@/api/common'
import gsap from 'gsap'
import { downloadZip } from '@/utils/download'
const tabList = [
  {
    label: '项目概览',
    compName: 'ProjectOverview',
    value: '0',
  },
  {
    label: '基本信息',
    compName: 'ProjectBasicInfo',
    value: '1',
  },
  {
    label: '项目干系人',
    compName: 'ProjectRelaPeople',
    value: '2',
  },
  {
    label: '工时统计',
    compName: 'ProjectHourStatistics',
    value: '3',
  },
  {
    label: '项目周报',
    compName: 'ProjectWeek',
    value: '4',
  },
  {
    label: '会议纪要',
    compName: 'ProjectMeeting',
    value: '5',
  },
  {
    label: '项目风险',
    compName: 'ProjectRisk',
    value: '6',
  },
  {
    label: '项目任务',
    compName: 'ProjectTask',
    value: '7',
  },
  {
    label: '财务数据',
    compName: 'ProjectFinancial',
    value: '8',
  },
  {
    label: '项目合同',
    compName: 'ProjectContract',
    value: '9',
  },
]
const activeName = ref('0')
async function tabClick(event) {
  // event.stopPropagation()
  // event.preventDefault()
  animateTo()
}

function animateTo() {
  gsap.fromTo(
    `#pane-${activeName.value}`,
    { x: -100, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.5 }
  )
}

const files = ref([])
function download() {
  downloadZip(files.value, 'url', 'aaa', downloadFile)
}
onMounted(async () => {
  const res = await getTestFiles()
  files.value = res.data

  gsap.fromTo(
    '.el-tabs__item:first-child',
    { x: -100, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.5 }
  )
  const elContainer = document.querySelector('.el-card')
  setContentFull(elContainer)
  console.log(getViewportOffset(elContainer))
})

function favHeartClick() {
  toggleClass(document.querySelector('.js-fav > .heart'), 'is-active')
}
</script>

<template>
  <ContentWrap>
    <div class="el-tab">
      <ElTabs v-model="activeName" @tab-click="tabClick">
        <ElTabPane v-for="tab in tabList" :key="tab.value" :label="tab.label">
          <div class="card">
            <ul>
              <li v-for="(file, index) in files" :key="index">
                {{ file.url }}
              </li>
              <ElButton type="primary" @click="download">download zip</ElButton>
            </ul>
          </div>

          <button class="product-slider__fav js-fav" @click="favHeartClick">
            <span class="heart"></span>
            ADD TO WISHLIST
          </button>
        </ElTabPane>
      </ElTabs>
    </div>
  </ContentWrap>
</template>

<style lang="less" scoped>
.product-slider {
  text-align: center;
  &__fav {
    color: #888e94;
    background: none;
    border: none;
    position: relative;
    padding-left: 25px;
    left: 0px;
    outline: none;
    cursor: pointer;

    &:focus {
      outline: none;
    }

    .heart {
      display: block;
      position: absolute;
      left: 0;
      transform: translate(-50%, -50%) scale(0.7);
      top: 50%;
      pointer-events: none;
      width: 100px;
      height: 100px;
      background: url('https://res.cloudinary.com/muhammederdem/image/upload/v1536405215/starwars/heart.png')
        no-repeat;
      background-position: 0 0;
      cursor: pointer;
      transition: background-position 1s steps(28);
      transition-duration: 0s;

      &.is-active {
        transition-duration: 1s;
        background-position: -2800px 0;
      }
    }
  }
}
</style>
