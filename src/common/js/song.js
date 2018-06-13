/**
 * Created by Administrator on 2018/4/12.
 */
  import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'
export default class Song{
  constructor({id,mid,singer,name,album,duration,image,url}){
    this.id=id,
      this.mid=mid,
      this.singer=singer,
      this.name=name,
      this.album=album,
      this.duration=duration,
      this.image=image,
      this.url=url
  }
  getLyric(){
    if(this.lyric){
      return Promise.resolve('this.lyric')
    }
    return new Promise((resolve,reject)=>{
      getLyric(this.mid).then((res)=>{
        if(res.retcode===ERR_OK){
          this.lyric=Base64.decode(res.lyric)
          resolve(this.lyric)
        }else{
          reject('no lyric')
        }
      })
    })


  }
}

export function createSong(musicData){
  return new Song({
    id:musicData.songid,
    mid:musicData.songmid,
    singer:filterSinger(musicData.singer),
    name:musicData.songname,
    album:musicData.albumname,
    duration:musicData.interval,
    image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://dl.stream.qqmusic.qq.com/C400003baW852UMpHC.m4a?vkey=44D7C71182B8D505DB88EB4D715D73D11BCAE5ABB9C2B391FD399432B47FE1EBECA16E1B938B085ECA3886E1D680E0847602F3955E1A2764&guid=5013618820&uin=0&fromtag=66`
  })
}

//function url(songmid){
//  //var vkey='B6AB496C4D316FE3608E66F6A5EC2EF20C727D3428DEC5CC3389B0AE22E7BCC818AC622824C7C6E2F565A2EAC000B21C117F1AECF90E275C'
//  var vkey=(function(){
//    SongDetail(songmid).then((res)=>{
//      console.log(res)
//      if(res.code===ERR_OK){
//        console.log(res.data)
//       //return res.data.items[0].vkey
//        return 'B6AB496C4D316FE3608E66F6A5EC2EF20C727D3428DEC5CC3389B0AE22E7BCC818AC622824C7C6E2F565A2EAC000B21C117F1AECF90E275C'
//      }
//    })
//
//  })()
//  return 'http://dl.stream.qqmusic.qq.com/C400'+songmid+'.m4a?vkey='+vkey+'&guid=5013618820&uin=0&fromtag=66'
//}



function filterSinger(singer){
  let ret=[]
  if(!singer){
    return ""
  }
  singer.forEach((s)=>{
    ret.push(s.name)
  })
   return ret.join('/')
}
