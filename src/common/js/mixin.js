/**
 * Created by Administrator on 2018/4/23.
 */
import {mapGetters,mapMutations,mapActions} from 'vuex'
import {shuffle} from 'common/js/util'
import {playMode} from 'common/js/config'
export const playlistMixin={
  computed:{
  ...mapGetters(['playlist'])
},
  mounted(){
    this.handlePlaylist(this.playlist)
  },
  activated(){
  this.handlePlaylist(this.playlist)
  },
   watch:{
  playlist(newVal){
    this.handlePlaylist(newVal)
  }
},
   methods:{
  handlePlaylist(){
    throw new Error('component must implement handlePlaylist method')
  }
}
}

export const playerMixin={
  computed:{
    iconMode(){
      return this.mode===playMode.sequence?'icon-sequence':this.mode===playMode.loop?'icon-loop':'icon-random'
    },
    ...mapGetters([
    'sequenceList',
    'currentSong',
    'playlist',
    'mode',
    'favoriteList'

  ])
  },
  methods:{
    changeMode(){
      const mode=(this.mode+1)%3
      this.setPlayMode(mode)
      let list=null
      if(mode===playMode.random){
        list=shuffle(this.sequenceList)
      }else{
        list=this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlaylist(list)
    },
    resetCurrentIndex(list){
      let index=list.findIndex((item)=>{
      return item.id===this.currentSong.id
     })
      this.setCurrentIndex(index)
    },
    toggleFavorite(song){
      if(this.isFavorite(song)){
        console.log('1')
        this.deleteFavoriteList(song)
      }
      else{
        console.log('2')
        this.saveFavoriteList(song)
      }
    },
    getFavoriteIcon(song){
       if(this.isFavorite(song)){
       return 'icon-favorite'
       }else{
         return 'icon-not-favorite'
     }
    },
    isFavorite(song){
       const index=this.favoriteList.findIndex((item)=>{
         return item.id===song.id
       })
  return index>-1
    },

...mapMutations({
  setCurrentIndex:'SET_CURRENT_INDEX',
  setPlayingState:'SET_PLAYING_STATE',
  setPlayMode:'SET_PLAY_MODE',
  setPlaylist:'SET_PLAYLIST'
}),
  ...mapActions([
  'saveFavoriteList',
  'deleteFavoriteList'
])
  }
}

export const searchMinxin={
  data(){
    return {
      query:'',
      refreshDelay:100
    }
  },
  computed:{
    ...mapGetters([
    'searchHistory'
  ])
  },
methods:{
  onQueryChange(query){
    this.query=query
  },
  blurInput(){
    this.$refs.searchBox.blur()
  },
  addQuery(query){
    this.$refs.searchBox.setQuery(query)
  },
  saveSearch(){
    this.saveSearchHistory(this.query)
  },
...mapActions([
    'saveSearchHistory',
    'deleteSearchHistory',
  ])
}

}
