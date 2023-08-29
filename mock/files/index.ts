import { config } from '@/config/axios/config'

const { result_code } = config

const timeout = 1000

export default [
    {
        url: '/file/list',
        method: 'get',
        timeout,
        response: () => {
            return {
                code: result_code,
                data: [
                    {
                        url: 'https://www.baidu.com/img/flexible/logo/pc/result.png'
                    },
                    {
                        url: 'https://www.baidu.com/img/flexible/logo/pc/result.png'
                    },
                ]
            }
        }
    }
]

