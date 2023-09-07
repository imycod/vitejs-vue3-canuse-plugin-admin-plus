/*
 * @Author: wuxs 317009160@qq.com
 * @Date: 2023-07-31 14:29:41
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-09-03 15:11:56
 * @FilePath: \pms-pcd:\studio\vue-project\vue3-plugin-effect-vite-admin-element-plus\src\api\login\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/config/axios'
import type { UserType } from './types'

import { getRefreshToken } from '@/utils/token'

interface RoleParams {
  roleName: string
}

export const loginApi = (data: UserType): Promise<IResponse<UserType>> => {
  return request.post({ url: '/user/login', data })
}

export const loginOutApi = (): Promise<IResponse> => {
  return request.get({ url: '/user/loginOut' })
}

export const getUserListApi = ({ params }: AxiosConfig) => {
  return request.get<{
    code: string
    data: {
      list: UserType[]
      total: number
    }
  }>({ url: '/user/list', params })
}

export const getAdminRoleApi = (
  params: RoleParams
): Promise<IResponse<AppCustomRouteRecordRaw[]>> => {
  return request.get({ url: '/role/list', params })
}

export const getTestRoleApi = (params: RoleParams): Promise<IResponse<string[]>> => {
  return request.get({ url: '/role/list', params })
}

let promise
export const getRefreshTokenApi = async () => {
  if (promise) {
    return promise
  }
  promise = new Promise(async (resolve) => {
    const params = {
      headers: {
        Authorization: `Bearer ${getRefreshToken()}`
      },
      __isRefreshToken: true
    }
    const resp = await request.get('/refresh_token', params)
    resolve(resp.code === 0)
  })

  promise.finally(() => {
    promise = null
  })

  return promise
}

export function isRefreshRequest(config) {
  // 转换成boolean
  return !!config.__isRefreshToken
}
