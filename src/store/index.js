import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    changeSongSwitch: 0,
    currentSong: {
      singer: 'null',
      name: 'null',
      album: 'null',
      pic: 'null',
      link: 'null'
    },
    currentIndex: 0,
    currentSheetIndex: 0,
    currentVolume: 100,
    lastVolume: 0
    // 0 为记忆音量
  },
  mutations: {
    changeSong(state,payload){
      state.currentSong = payload.song;
      console.log("响应点击")
      state.currentSheetIndex = payload.index[0]
      state.currentIndex = payload.index[1]
      state.changeSongSwitch = 1;
    },
    changeVolume(state,volume){
      state.lastVolume = state.currentVolume
      state.currentVolume = volume
      console.log("volume:"+state.currentVolume)
    },
    volumeOff(state){
      state.lastVolume = state.currentVolume
      console.log("之前的音量：" + state.lastVolume)
      state.currentVolume = 0
    },
    firstPlay(state,song){
      state.currentSong = song
    },
    nextSong(state,payload){
      if(payload.index === 0){
        state.currentIndex = 0
        state.currentSong = payload.song
        state.changeSongSwitch = 1;
      }else{
        console.log("正在播放下一曲中")
        state.currentSong = payload.song
        console.log(payload.song)
        state.currentSheetIndex = payload.index[0]
        state.currentIndex = payload.index[1]
        state.changeSongSwitch = 1;
      }
    },

  },
  getters: {
    getChangeSongSwitch(state){
      return state.changeSongSwitch
    },
    getCurrentIndex(state){
      return state.currentIndex
    },
    getCurrentSheetIndex(state){
      return state.currentSheetIndex
    },
    getCurrentVolume(state){
      return state.currentVolume
    },
    getLastVolume(state){
      return state.lastVolume
    }
  },

  actions: {
  },
  modules: {
  }
})
