import axios, { AxiosRequestConfig, Method } from 'axios'
import { merge } from 'lodash'

import './axiosSetting'

const request = async (_options?: AxiosRequestConfig, method: Method = 'GET') => {
  const options: AxiosRequestConfig = merge(
    { ..._options },
    {
      method,
    }
  )
  return axios(options)
}

/**
 * 封装get请求
 * @param { String } url 请求路径
 * @param { Object } 请求参数
 *  params GET请求参数
 */
const get = (url: string, params?: Object, _options?: Object) => {
  return request({ ..._options, params, url })
}
/**
   * 封装post请求
   * @param { Object } 请求参数
   *  data POST请求请求参数，对象形式
   */
const post = (url: string, data?: string | object | ArrayBuffer | ArrayBufferView | URLSearchParams, _options?: any) => {
  // if (_options.transRequest) {
  //   _options.headers = {
  //     'Content-type': 'application/x-www-form-urlencoded'
  //   }
  //   let ret = ''
  //   for (let it in data) {
  //     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  //   }
  //   url += '?' + ret
  //   console.log(_options.transformRequest)
  //   data = {}
  // }
  return request({ ..._options, data, url }, 'POST')
}

export { get, post }
export default request