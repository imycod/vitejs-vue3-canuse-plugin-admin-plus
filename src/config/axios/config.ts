type ConfigType = {
  base_url: {
    base: string
    dev: string
    pro: string
    test: string
  }
  result_code: number | string
  default_headers: AxiosHeaders
  request_timeout: number
  brand: string
  domain: string
}

const config: ConfigType = {
  /**
   * api请求基础路径
   */
  base_url: {
    // 开发环境接口前缀
    base: '',

    // 打包开发环境接口前缀
    dev: '',

    // 打包生产环境接口前缀
    pro: '',

    // 打包测试环境接口前缀
    test: ''
  },

  /**
   * 接口成功返回状态码
   */
  result_code: '0000',

  /**
   * 接口请求超时时间
   */
  request_timeout: 60000,

  /**
   * 默认接口请求类型
   * 可选值：application/x-www-form-urlencoded multipart/form-data
   */
  default_headers: 'application/json',

  /**
   * 域名,下载会跨域,需要加上域名，以及代理
   * 根据要下载的文件的域名来设置
   */
  brand: 'baidu',
  domain: 'https://www.baidu.com'
}

export { config }
