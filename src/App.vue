<template>
  <v-app id="inspire">
    <v-app-bar app clipped-left dense>
      <v-toolbar-title>黄同学的音乐空间</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="githubSwitch">
        <v-icon>mdi-github</v-icon>
      </v-btn>
      <v-btn icon @click="aboutSwitch">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-dialog
            fullscreen
            v-model="dialog1"
            width="300"
    >
      <v-card>
        <v-card-title
                class="headline blue-grey darken-4"
                primary-title
        >
          温馨提醒
        </v-card-title>
        <v-card-text class="pa-5">

          <p style="font-size: 18px">当前音乐播放器暂不支持移动端！</p>
          该播放器专为解决作者在PC端听歌难的问题，由于电脑内存有一丢丢小，很多歌曲网页在线打开播放，
          都需要官方的客户端，而且每次听歌都是一时兴起，如果下载存储歌曲简直太浪费存储空间，于是，临时起意
          决定学一点H5和js，来编写一个浏览器端的播放器，毕竟使用电脑时，60%以上的时间都花在浏览器上，移动端可以是
          可以适配的，不过没必要，以后有时间看着办吧。
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
                  color="red darken-1"
                  @click="backPage"
          >
            了解
          </v-btn>
        </v-card-actions>
        <v-subheader>
          其他网站
        </v-subheader>
           <v-container>
             <v-chip
                     class="ma-2"
                     label
             >
               博客： <a href="https://www.mahoo12138.cn/" style="color: #64B5F6">https://www.mahoo12138.cn/</a>
             </v-chip>
             <v-chip
                     class="ma-2"
                     label
             >
               文档库： <a href="https://docs.mahoo12138.cn/" style="color: #64B5F6">https://docs.mahoo12138.cn/</a>
             </v-chip>
           </v-container>
      </v-card>
    </v-dialog>
    <v-dialog
            v-model="dialog2"
            width="500"
    >
      <v-card>
        <v-card-title
                class="headline grey darken-4"
                primary-title
        >
          关于
        </v-card-title>
        <v-card-text class="pa-5">

          <p style="font-size: 18px">黄同学的音乐空间</p>
          本程序使用 Vue 全家桶以及 Vuetify UI 组件构建而成，利用H5的Audio标签与原生JavaScript的DOM操作， 基本实现简单可用的音乐播放功能，只支持本地定制歌单，个人使用良好，在单页面其他可用空间，加入了天气和新闻组件， 相关API已列出，学习练手项目，代码和设计不当之处，欢迎指出！
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
        <v-container>
          <v-row justify="center">
            <v-chip
                    class="ma-2"
                    label
            >
              <v-icon>mdi-vuejs</v-icon>
              <a href="https://cn.vuejs.org/" style="color: #64B5F6">Vuejs</a>
            </v-chip>
            <v-chip
                    class="ma-2"
                    label
            >
              <v-icon>mdi-vuetify</v-icon>
              <a href="https://vuetify.com/" style="color: #64B5F6">Vuetify</a>
            </v-chip>
            <v-chip
                    class="ma-2"
                    label
            >
              <v-icon>mdi-web</v-icon>
              <a href="https://www.juhe.cn/" style="color: #64B5F6">聚合数据</a>
            </v-chip>
            <v-chip
                    class="ma-2"
                    label
            >
              <v-icon>mdi-web</v-icon>
              <a href="https://api.isoyu.com/" style="color: #64B5F6">姬长信API</a>
            </v-chip>
          </v-row>

          <v-row justify="center">
            <v-btn
                    class="ma-3"
                  color="red darken-1"
                  @click="dialog2 = !dialog2"
          >
            关闭
          </v-btn>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>

    <v-content>
      <div style="display: flex;height: 100%;width: 100%">
                <v-card  class="item1">
                  <tab :sheets="sheets">

                    <template v-slot:item0>
                      <list :sheet-index="0"></list>
                    </template>

                    <template v-slot:item1>
                      <list :sheet-index="1"></list>
                    </template>

                    <template v-slot:item2>
                      <list :sheet-index="2"></list>
                    </template>

                  </tab>
                  <other/>
                </v-card>
                <v-card  class="item2">
                    <player></player>
                </v-card>
              </div>
    </v-content>

    <v-footer app>
      <span>&copy; 2019 - 2020 Mahoo12138</span>
    </v-footer>
  </v-app>
</template>

<script>
  import Other from "./components/Other/Other";
  import List from './components/List/List'
  import Player from "./components/Player/Player"
  import Tab from './components/List/Tab'
  export default {
    components: {
      List,
      Player,
      Tab,
      Other
    },
    methods:{
      aboutSwitch(){
        this.dialog2 = true
      },
      githubSwitch(){
        window.open('https://github.com/Mahoo12138/vue3-aplayer-pra')
      },
      backPage(){
        window.location.href = document.referrer;
        window.history.back(-1);
      }
    },
    data: () => ({
      sheets: ['歌单一','歌单二','歌单三'],
      dialog1: false,
      dialog2: false

    }),
    created () {
      this.$vuetify.theme.dark = true
      if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)){
        this.dialogSwitch()
      }else {

      }
    },
    mounted() {

    }
  }
</script>
<style>
  @import "assets/css/base.css";
  .item1{
    flex: 2.5;
    margin: 20px 10px 20px 30px;
  }
  .item2{
    padding-top: 10px;
    flex: 1;
    margin: 20px 30px 20px 10px;
  }
</style>