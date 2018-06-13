/**
 * Created by Administrator on 2018/4/20.
 */

import {commonParams} from './config'
import axios from 'axios'
export function getLyric(mid) {
  const url = '/api/lyric'

  const data = Object.assign({}, commonParams, {
   songmid: mid,
    platform: 'yqq',
    loginUin: 0,
    hostUin: 0,
    pcachetime:+new Date(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
