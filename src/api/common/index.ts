/*
 * @Author: wuxs 317009160@qq.com
 * @Date: 2023-07-31 14:29:40
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-08-29 11:13:13
 * @FilePath: \vue3-plugin-effect-vite-admin-element-plus\src\api\common\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/config/axios'

// 获取所有字典
export const getDictApi = (): Promise<IResponse> => {
  return request.get({ url: '/dict/list' })
}

// 模拟获取某个字典
export const getDictOneApi = async (): Promise<IResponse> => {
  return request.get({ url: '/dict/one' })
}

// 下载文件
export const downloadFile = (url: string): Promise<IResponse> => {
  return request.get({ url, responseType: 'blob' })
}
