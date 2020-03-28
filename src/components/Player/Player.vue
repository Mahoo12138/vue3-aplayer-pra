<template>
    <v-container>
        <p class="font-weight-black text-center songs">{{music.name}}</p>
        <p class="font-weight-light text-center singer">{{music.singer}}</p>
        <v-img class="songs-img" :src="music.pic" aspect-ratio="1"></v-img>
        <div class="control">
            <div class="con-item">
                <v-btn  v-if="currentVolume===0" icon @click="volumeOn">
                    <v-icon size="30" >mdi-volume-off</v-icon>
                </v-btn>
                <v-btn v-else-if="currentVolume>=0 && currentVolume <= 30"  icon @click="volumeOff">
                    <v-icon size="30" >mdi-volume-low</v-icon>
                </v-btn>
                <v-btn v-else-if="currentVolume>30 && currentVolume <= 65"   icon @click="volumeOff">
                    <v-icon size="30" >mdi-volume-medium</v-icon>
                </v-btn>
                <v-btn v-else-if="currentVolume>65 && currentVolume <= 100"   icon @click="volumeOff">
                    <v-icon size="30" >mdi-volume-high</v-icon>
                </v-btn>
            </div>
            <div class="con-item">
                <v-btn icon @click="lastSong">
                    <v-icon size="45">mdi-skip-previous</v-icon>
                </v-btn>
            </div>

            <div class="con-item">
                <v-btn icon @click="pausePlay">
                    <v-icon size="55">{{playStatus[playIcon]}}</v-icon>
                </v-btn>
            </div>
            <div class="con-item">
                <v-btn icon @click="nextSong">
                    <v-icon size="45" >mdi-skip-next</v-icon>
                </v-btn>
            </div>
            <v-snackbar
                    v-model="snackbar"
                    :timeout="2000"
                    top
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
            <bottom-sheet class="con-item"></bottom-sheet>
        </div>
        <div class="lyric">
            <p>{{music.currentLrc}}</p>
        </div>
        <div class="progress" >
            <v-slider
                    @change="changeTime"
                    :max="music.totalTime"
                    class="progressbar"
                    v-model="music.currentTime"
                    height="25"
            >

            </v-slider>
            <div class="progress-item">
                <span id="left">{{formatTime(music.currentTime)}}</span>
                <span id="right">{{formatTime(music.totalTime)}}</span>
            </div>
        </div>
    </v-container>
</template>

<script>
  let player = document.createElement("AUDIO");
  import data from '../../common/data'
  import tips from '../../common/tips'
  import BottomSheet from "./BottomSheet";
  import {test} from "../../common/request";

  export default {
    name: "Player",
    components: {BottomSheet},
    data() {
      return{
        playIcon: 1,
        playStatus: ['mdi-pause-circle-outline', 'mdi-play-circle-outline'],
        snackbar: false,
        text: '',
        music: {
          name: '暂无音乐播放',
          singer: 'Mahoo12138',
          lrc: '',
          pic: '',
          link: '',
          album: '',
          currentLrc:'',
          currentTime: 0,
          totalTime: 0,
          progressValue: 0,
          currentIndex: 0,
          currentSheetIndex: 0,
        },
      }
    },
    computed: {
      song () {
        return this.$store.state.currentSong
      },
      changeSongStatus() {
        return this.$store.getters.getChangeSongSwitch
      },
      currentVolume(){
        return this.$store.state.currentVolume
      },
      playIconSet() {
            return (this.playIcon===1) ? 0: 1
        },
      currentSheet(){
        return data[this.music.currentSheetIndex]
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
        },
      currentVolume(n,o){
        console.log(this.currentVolume)
        player.volume = n/100
      }
    },
    methods: {
      volumeOff(){
        this.$store.commit('volumeOff')
      },
      volumeOn(){
        this.$store.commit('changeVolume',this.$store.getters.getLastVolume)
      },
      changeTime(time){
        player.currentTime = time
        // console.log(player.buffered.end(0))
      },
      lastSong(){
        console.log("last!")
      },
      playSong(){
        this.music.currentIndex = this.$store.getters.getCurrentIndex
        if(player.paused){
          if(!player.ended){
            this.playIcon = this.playIconSet
          }
          // 维护暂停键
        }
        this.refreshPage()
        console.log("刷新界面")
        // console.log("状态2： " + player.readyState)
        player.play()
        // console.log("状态3： " + player.readyState)

      },
      pausePlay(){
        if(player.src === ''){
          this.snackbar = true
          this.text = tips.firstPlay
          this.$store.commit('firstPlay',this.currentSheet[this.music.currentIndex])
          this.refreshPage()
          this.playIcon = this.playIconSet
          console.log('歌曲是否播放： '+ player.paused)
          player.play()
          console.log("开始播放")

          test({
            url: 'down.php/f1f113c2850727c605b1a5a0d186fc9a.lrc',
          }).then(res => {
            console.log(res)
             this.music.lrc = this.parseLrc(res.data)
          })



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
        console.log(this.currentSheet)
        if(this.music.currentIndex + 1 >= this.currentSheet.length){
          this.snackbar = true
          console.log("最后一首")
          this.text = tips.LastSong
          this.$store.commit("nextSong",{
            song: this.currentSheet[0],
            index: 0
          })
          console.log("最后一首的下一曲")
        }else{
          console.log("正常下一曲,第" + (this.music.currentIndex+2) + "首")
          this.music.currentIndex += 1
          this.$store.commit("nextSong",{
            song: this.currentSheet[this.music.currentIndex],
            index: [this.currentSheetIndex, this.music.currentIndex]
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
        this.music.currentSheetIndex = this.$store.getters.getCurrentSheetIndex
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
         // console.log("正在播放")
         if(player.ended){
           this.nextSong()
         }else{
           for(let i = 0; i < this.music.lrc.ms.length ; i++){
             console.log(parseFloat(this.music.lrc.ms[i].t))
             if (parseFloat(this.music.lrc.ms[i].t) <= player.currentTime && player.currentTime < parseFloat(this.music.lrc.ms[i+1].t)){
               console.log(this.music.lrc.ms[i].c)
               this.music.currentLrc = this.music.lrc.ms[i].c
             }
           }
           this.music.currentTime = player.currentTime
           this.music.totalTime = player.duration
           console.log("当前音量："+ player.volume*100);

           // console.log(player.currentTime +'/'+ player.duration)
           // this.music.progressValue = (player.currentTime / player.duration)*100
           // this.music.bufferProgressValue = (player.buffered.end(0)/player.duration)*100
         }
       }else{
         // console.log("未播放")
         if(player.ended){
           console.log("已结束播放，下一曲")
           this.nextSong()
         }

       }
      },
      parseLrc(lrc){
        const oLRC = {
          ti: "", //歌曲名
          ar: "", //演唱者
          al: "", //专辑名
          by: "", //歌词制作人
          offset: 0, //时间补偿值，单位毫秒，用于调整歌词整体位置
          ms: [] //歌词数组{t:时间,c:歌词}
        };
        if(lrc.length===0) return;
          let lrcs = lrc.split('\n');//用回车拆分成数组
          for(let i in lrcs) {//遍历歌词数组
            lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
            let t = lrcs[i].substring(lrcs[i].indexOf("[") + 1, lrcs[i].indexOf("]"));//取[]间的内容
            let s = t.split(":");//分离:前后文字
            if(isNaN(parseInt(s[0]))) { //不是数值
              for (let i in oLRC) {
                if (i !== "ms" && i === s[0].toLowerCase()) {
                  oLRC[i] = s[1];
                }
              }
            }else { //是数值
              let arr = lrcs[i].match(/\[(\d+:.+?)\]/g);//提取时间字段，可能有多个
              let start = 0;
              for(let k in arr){
                start += arr[k].length; //计算歌词位置
              }
              let content = lrcs[i].substring(start);//获取歌词内容
              for (let k in arr){
                let t = arr[k].substring(1, arr[k].length-1);//取[]间的内容
                let s = t.split(":");//分离:前后文字
                oLRC.ms.push({//对象{t:时间,c:歌词}加入ms数组
                  t: (parseFloat(s[0])*60+parseFloat(s[1])).toFixed(3),
                  c: content
                });
              }
            }
          }
          oLRC.ms.sort( (a, b) => {//按时间顺序排序
            return a.t-b.t;
          })
          // for(let i in oLRC){ //查看解析结果
          //     console.log(i,":",oLRC[i]);
          // }
        // console.log(oLRC)
        return oLRC
        }
    },
    mounted(){
        this.$nextTick(()=>{
          setInterval(this.playingMusic,500)
        })
    }
  }
</script>

<style scoped lang="less">
    .lyric{
        text-align: center;
    }
    .progress{
        padding: 0 1.8rem;
        position: relative;
        .progress-item{
            #left{
                position: absolute;
                left: 8%;
                top: 50%;
            }
            #right{
                position: absolute;
                right: 8%;
                top: 50%;
            }
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
        margin-bottom: 2em;
        text-align: center;
        line-height: 1;
        display: flex;
        position: relative;
        .volume{
            height: 20px;
        }
        .con-item{
            flex: 1;
        }
        .con-center{
            flex: 2;
        }
    }
</style>