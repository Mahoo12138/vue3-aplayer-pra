<template>
    <v-container>
        <p class="font-weight-black text-center songs">{{music.name}}</p>
        <p class="font-weight-light text-center singer">{{music.singer}}</p>
        <v-img
                class="songs-img"
                src="../../assets/images/avatar.png"
                aspect-ratio="1"
        ></v-img>
        <div class="control">
            <v-btn class="ma-1" width="45px" height="45" icon @click="lastSong">
                <v-icon size="45">mdi-skip-previous</v-icon>
            </v-btn>
            <v-btn width="65px" height="65" class="ma-sm-1 pa-2" icon @click="pausePlay">
                <v-icon size="55">{{playStatus[playIcon]}}</v-icon>
            </v-btn>

            <v-snackbar
                    v-model="snackbar"
                    :timeout="2000"
            >
                {{ text }}
                <v-btn
                        color="pink"
                        text
                        @click="snackbar = false"
                >
                    Close
                </v-btn>
            </v-snackbar>

            <v-btn class="ma-1" width="45px" height="45" icon @click="nextSong">
                <v-icon size="45" >mdi-skip-next</v-icon>
            </v-btn>

        </div>
        <div class="progress" >
            <div class="progress-item">
                <span style="float: left">{{formatTime(music.currentTime)}}</span>
                <span style="float: right">{{formatTime(music.totalTime)}}</span>
            </div>
<!--            <v-progress-linear-->
<!--                    rounded-->
<!--                    color="#9e9e9e"-->
<!--                    class="progressbar"-->
<!--                    height="6"-->
<!--                    background-color="blue-grey lighten-2"-->
<!--                    :background-opacity="0.8"-->
<!--                    :value="music.progressValue"-->
<!--                    :buffer-value="music.bufferProgressValue"-->
<!--            ></v-progress-linear>-->
            <v-slider
                    @change="changeTime"
                    :max="music.totalTime"
                    v-model="music.currentTime"
            >

            </v-slider>
        </div>

    </v-container>
</template>

<script>
  let player = document.createElement("AUDIO");
  import data from '../../common/data'
  import tips from '../../common/tips'
  export default {
    name: "Player",
    data() {
      return{
        playIcon: 1,
        playStatus: ['mdi-pause-circle-outline', 'mdi-play-circle-outline'],
        snackbar: false,
        text: '',
        music: {
          name: '暂无音乐播放',
          singer: 'Mahoo12138',
          pic: '',
          link: '',
          album: '',
          currentTime: 0,
          totalTime: 0,
          progressValue: 0,
          currentIndex: 0,
          bufferProgressValue: 0
        }
      }
    },
    computed: {
      song () {
        return this.$store.state.currentSong
      },
      changeSongStatus() {
        return this.$store.getters.getChangeSongSwitch
      },
      playIconSet() {
            return (this.playIcon===1) ? 0: 1
        },
  },
    watch: {
      changeSongStatus(n,o) {
        console.log("检测到开关发生变化！")
        // 1 表示开关已打开
        if(n === 1){
          this.playSong()
          this.$store.state.changeSongSwitch = 0
          // 开关打开后调用函数，即可关闭开关
        }
        }
    },
    methods: {
      changeTime(time){
        player.currentTime = time
      },
      lastSong(){
        console.log("last!")
      },
      playSong(){
        this.music.currentIndex = this.$store.getters.getCurrentIndex
        console.log("状态1： " + player.readyState)
        if(player.readyState === 0 || player.paused){
          this.playIcon = this.playIconSet
          // 维护暂停键
        }
        this.refreshPage()
        console.log("刷新界面")
        console.log("状态2： " + player.readyState)
        player.play()
        console.log("状态3： " + player.readyState)

      },
      pausePlay(){
        if(player.src === ''){
          this.snackbar = true
          this.text = tips.firstPlay
          this.$store.commit('firstPlay',data[this.music.currentIndex])
          this.refreshPage()
          this.playIcon = this.playIconSet
          console.log('歌曲是否播放： '+ player.paused)
          player.play()
          console.log("开始播放")

        }else{
          this.playIcon = this.playIconSet
          if(player.paused){
            console.log(player.currentTime)

            player.play()
          }else{
            player.pause()
            console.log("暂停播放")
            console.log("状态2： " + player.readyState)
          }
        }
      },
      nextSong(){
        console.log(data.length + '/' + this.music.currentIndex)
        if(this.music.currentIndex + 1 >= data.length){
          this.snackbar = true
          console.log("最后一首")
          this.text = tips.LastSong
          this.$store.commit("nextSong",{
            song: data[0],
            index: 0
          })
          console.log("最后一首的下一曲")
        }else{
          console.log("正常下一曲,第" + (this.music.currentIndex+1) + "首")
          this.music.currentIndex += 1
          this.$store.commit("nextSong",{
            song: data[this.music.currentIndex],
            index: this.music.currentIndex
          })
        }
      },
      refreshPage(){
        console.log("刷新数据")
        this.music.name = this.song.name
        this.music.singer = this.song.singer
        this.music.pic = this.song.pic
        this.music.link = this.song.link
        this.music.currentIndex = this.$store.getters.getCurrentIndex
        player.src = this.music.link
      },
      formatTime (second) {
        let min = parseInt(second / 60)
        let sec = parseInt(second % 60)
        if(sec < 10){
          sec = '0' + sec
        }
        return '0' + min + ':' + sec
      },
      playingMusic() {
       if(player.readyState===4 && !player.paused){
         console.log("正在播放")
         if(player.ended){
           this.nextSong()
         }else{
           this.music.currentTime = player.currentTime
           this.music.totalTime = player.duration
           // console.log(player.currentTime +'/'+ player.duration)
           // this.music.progressValue = (player.currentTime / player.duration)*100
           // this.music.bufferProgressValue = (player.buffered.end(0)/player.duration)*100
         }
       }else{
         console.log("未播放")
       }
      },
    },
    mounted(){
        this.$nextTick(()=>{
          setInterval(this.playingMusic,500)
        })
    }
  }
</script>

<style scoped lang="less">
    .progress{
        padding: 0 1.8rem;
        .progressbar{
            border: solid .5px #757575;
        }
    }
    .songs{
      margin: 0;
      font-size: 1.3rem;
    }
    .singer{
        margin: 0;
    }
    .songs-img{
        margin: 1.3rem auto;
        width: 15rem;
        border-radius: 4px;
    }
    .control{
        width: 100%;
        height: 50px;
        margin-top: 2.5em;
        margin-bottom: 3em;
        text-align: center;
        line-height: 1;
    }
</style>