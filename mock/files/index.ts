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
                        "name": "迈普与国科人力外包合作协议",
                        // "url": "https://oa.goktech.cn/weaver/weaver.file.FileDownload?fileid=a8ac229844fb089092b825fa85fe61bbc96856bdd427fbfeb2b906dfbd22cc246463f3fb4e654a080e52f3f466f015ec56689739497e2a443&download=1&requestid=&ddcode=2937a7ad32eb3d01",
                        "url": 'https://www.baidu.com/img/flexible/logo/pc/result.png'
                    },
                    {
                        "name": "20201215人力外包服务合作协议（迈普）",
                        // "url": "https://oa.goktech.cn/weaver/weaver.file.FileDownload?fileid=a1b1cb57a049ca1933ff0fd0a14d1fc596f58949de41703253fa552e7b90ea5287c18c9b4f23c5ea8e52f3f466f015ec56689739497e2a443&download=1&requestid=&ddcode=d115e0ab9d976dfd",
                        "url": 'https://www.baidu.com/img/flexible/logo/pc/result.png'
                    }
                ]
            }
        }
    }
]               
