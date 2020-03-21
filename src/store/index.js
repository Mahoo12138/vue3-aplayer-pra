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
    }
  },
  mutations: {
    changeSong(state,song){
      state.currentSong = song;
      console.log("响应点击")
      state.changeSongSwitch = 1;
    }
  },
  getters: {
    getChangeSongSwitch(state){
      return state.changeSongSwitch
    }
  },

  actions: {
  },
  modules: {
  }
})
