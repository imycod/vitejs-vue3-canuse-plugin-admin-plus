/*
 * @Author: wuxs 317009160@qq.com
 * @Date: 2023-08-25 14:28:03
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-08-25 15:17:09
 * @FilePath: \vue3-plugin-effect-vite-admin-element-plus\src\views\Composition\select2select\hooks\useAssessCycle.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { watch } from 'vue'
import useQuarterOptions from './useQuarter'

export default function useAssessCycle() {
  const basCycleOptions = [
    { index: 0, label: '季度考核' },
    { index: 1, label: '月度考核' },
    { index: 2, label: '半年度考核' },
    { index: 3, label: '年度考核' },
  ]

  return {
    basCycleOptions,
  }
}
