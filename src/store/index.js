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
  },
  mutations: {
    changeSong(state,payload){
      state.currentSong = payload.song;
      console.log("响应点击")
      state.currentIndex = payload.index
      console.log("歌曲数据为:"+payload.index)
      state.changeSongSwitch = 1;
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
        state.currentSong = payload.song
        state.currentIndex = payload.index
        state.changeSongSwitch = 1;
      }

    }
  },
  getters: {
    getChangeSongSwitch(state){
      return state.changeSongSwitch
    },
    getCurrentIndex(state){
      return state.currentIndex
    }
  },

  actions: {
  },
  modules: {
  }
})
