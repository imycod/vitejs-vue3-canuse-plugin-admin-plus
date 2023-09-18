/*
 * @Author: wuxs 317009160@qq.com
 * @Date: 2023-07-31 14:29:41
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-09-05 00:25:01
 * @FilePath: \vue3-plugin-effect-vite-admin-element-plus\src\config\axios\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { service } from './service'

import { config } from './config'

const { default_headers } = config

const request = (option: any) => {
  console.log('option---', option)

  const { url, method, params, data, headersType, responseType, headers } =
    option
  return service({
    url: url,
    method,
    params,
    data,
    responseType: responseType,
    headers: {
      'Content-Type': headersType || default_headers,
      Authorization: headers?.Authorization || '',
    },
  })
}
export default {
  get: <T = any>(option: any) => {
    return request({ method: 'get', ...option }) as unknown as T
  },
  post: <T = any>(option: any) => {
    return request({ method: 'post', ...option }) as unknown as T
  },
  delete: <T = any>(option: any) => {
    return request({ method: 'delete', ...option }) as unknown as T
  },
  put: <T = any>(option: any) => {
    return request({ method: 'put', ...option }) as unknown as T
  },
}
