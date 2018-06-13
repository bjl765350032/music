/**
 * Created by Administrator on 2018/4/8.
 */
import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

export function getSingerList(){
  const url='https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data=Object.assign({},commonParams,{
    channel: 'singer',
    page: 'list',
    key:'all_all_all' ,
    pagesize: 100,
    pagenum: 1,
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0
  })

  return jsonp(url,data,options)
}

export function getSingerDetail(singerId){
  const url='https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data=Object.assign({},commonParams,{
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    singermid: singerId,
    order: 'listen',
    begin: 0,
    num: 30,
    songstatus: 1
  })
  return jsonp(url,data,options)
}

//export function SongDetail(songmid){
//  const url='https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
//
//  const data=Object.assign({},commonParams,{
//    loginUin: 0,
//    hostUin: 0,
//    platform: 'yqq',
//    needNewCode: 0,
//    cid: 205361747,
//    uin: 0,
//    songmid: songmid,
//    filename: 'C40'+songmid,
//    guid: 5013618820
//  })
//  return jsonp(url,data,options)
//}
