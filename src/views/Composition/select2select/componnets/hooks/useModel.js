/*
 * @Author: wuxs 317009160@qq.com
 * @Date: 2023-08-25 14:27:49
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-08-25 15:19:11
 * @FilePath: \vue3-plugin-effect-vite-admin-element-plus\src\views\Composition\select2select\hooks\model.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { reactive } from 'vue'
import useAssessCycle from './useAssessCycle'
import useQuarterOptions from './useQuarter'

const { basCycleOptions } = useAssessCycle()
const { getBasQuarters } = useQuarterOptions()

export default function useModel(moduleName) {
  // 放在全局的就是全局变量，所以你有几个vue要用到的地方，独立的话，你就要创建几个
  const querys = {
    demo1: reactive({
      assessCycle: 0,
      quarter: 0,
    }),
    demo2: reactive({
      assessCycle: 0,
      quarter: 0,
    }),
  }

  const model = reactive([
    {
      type: 'select',
      prop: 'assessCycle',
      options: basCycleOptions,
      label: '考核周期',
    },
    {
      type: 'select',
      prop: 'quarter',
      options: getBasQuarters(querys[moduleName]),
      label: '考核时间',
    },
  ])
  return {
    querys,
    model,
  }
}
