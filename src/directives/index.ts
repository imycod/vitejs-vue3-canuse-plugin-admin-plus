import type { App } from 'vue'
import { setupPermissionDirective } from './permission/hasPermi'
import { setupDisabledDirective } from './permission/disabled'
import { setupSkeletonDirective } from './display/skeleton'
/**
 * 导出指令：v-xxx
 * @methods hasPermi 按钮权限，用法: v-hasPermi
 */
export const setupPermission = (app: App<Element>) => {
  setupPermissionDirective(app)
  setupDisabledDirective(app)
  setupSkeletonDirective(app)
}
