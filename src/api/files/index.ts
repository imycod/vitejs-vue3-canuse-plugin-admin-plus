import request from '@/config/axios'

export const getTestFiles = (): Promise<IResponse> => {
  return request.get({ url: '/file/list' })
}
