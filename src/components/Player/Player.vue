<template>
    <v-container>
        <p class="font-weight-black text-center songs">{{name}}</p>
        <p class="font-weight-light text-center singer">{{singer}}</p>


        <v-img
                class="songs-img"
                src="../../assets/images/avatar.png"
                aspect-ratio="1"
        ></v-img>
        <div class="control">
            <v-btn class="ma-1" width="45px" height="45" icon @click="lastSong">
                <v-icon size="45">mdi-skip-previous</v-icon>
            </v-btn>
            <v-btn width="65px" height="65" class="ma-sm-1 pa-2" icon @click="playSong">
                <v-icon size="55">{{playStatus[playIcon]}}</v-icon>
            </v-btn>
            <v-btn class="ma-1" width="45px" height="45" icon @click="nextSong">
                <v-icon size="45" >mdi-skip-next</v-icon>
            </v-btn>

        </div>
        <div class="progress" >
            <div class="progress-item">
                <span style="float: left">{{songTime[0]}}</span>
                <span style="float: right">{{songTime[1]}}</span>
            </div>
            <v-progress-linear color="#9e9e9e" :value="songTime[2]"></v-progress-linear>
        </div>
    </v-container>
</template>

<script>
  let player = document.createElement('audio');
  export default {
    name: "Player",
    data() {
      return {
        name: '暂无音乐播放',
        singer: 'Mahoo12138',
        pic: '',
        link: '',
        album: '',
        songTime: ['--:--', '--:--', '0'],
        playIcon: 1,
        playStatus: ['mdi-pause-circle-outline', 'mdi-play-circle-outline']
      }
    },
    computed: {
      song: function () {
        return this.$store.state.currentSong
      },
      changeSongStatus: function () {
        return this.$store.getters.getChangeSongSwitch
      },
        playIconSet() {
            return (this.playIcon===1) ? 0: 1
        }
  },
    watch: {
      playIcon(){
        console.log("播放状态检测到变化！")
      },
      changeSongStatus(n,o) {
        console.log("检测到变化！")
        if(n === 1){
          this.playIcon = this.playIconSet
          this.name = this.song.name
          this.singer = this.song.singer
          this.pic = this.song.pic
          this.link = this.song.link
          this.$store.state.changeSongSwitch = 0
          this.playSong()
        }
      }
    },
    methods: {
      lastSong(){
        console.log("last!")
      },
      playSong(){
        this.playIcon = this.playIconSet
        let temp = this.playIcon
        console.log("开始播放")
        // console.log(this.$store.state.currentSong)
        player.src = this.link
        player.play()
      },
      nextSong(){

      }
    }
  }
</script>

<style scoped lang="less">
    .progress{
        padding: 0 1.8rem;
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