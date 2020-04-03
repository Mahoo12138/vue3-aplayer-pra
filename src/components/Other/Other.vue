<template>
   <v-container>
    <!--       <v-btn color="red" @click="getWeather">test</v-btn>-->
<v-row>
    <v-col cols="5">
        <v-card height="230px" class="weather">
            <div class="weatherTitle">
                <v-list-item two-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline">{{city}}</v-list-item-title>
                        <v-list-item-subtitle>{{getDate}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </div>
            <v-img :aspect-ratio="7/4" src="../../assets/images/weather.jpg" class="newsImg" ></v-img>
            <div class="weatherContent">
                <p class="content">{{weather.temperature}}&deg;C
                    <span class="iconfont">{{getWeatherIcon}}</span>
                </p>
                <div class="infom">
                    <div class="weather-item1">
                        <i class="iconfont" >&#xe606;</i>
                        <span style="padding-left: 1em">{{weather.humidity}}%</span>

                    </div>
                    <div class="weather-item2">
                        <span class="iconfont">&#xe618;</span>
                        <span style="padding-left: 1em">{{weather.direct + ' '+  weather.power}}</span>
                    </div>
                    <div class="weather-item3">
                        <span class="iconfont">&#xe625;</span>
                        <span style="padding-left: 1em">{{weather.aqi}}</span>
                    </div>
                </div>
            </div>
        </v-card>
    </v-col>
    <v-col cols="7">
        <v-card max-height="230px" >
            <v-carousel
                    cycle
                    height="230px"
                    show-arrows-on-hover
                    hide-delimiters
                    interval="8000"
            >
                    <v-carousel-item
                            v-for="(news, i) in news"
                            :key="i"
                            @click="openNews(news.url)"
                    >
                        <div class="newItem">
                            <v-img :aspect-ratio="12/5" :src="news.imgsrc" class="newsImg"></v-img>
                            <p class="newTitle" style="z-index: 9">{{news.title}}</p>
                        </div>
                    </v-carousel-item>
            </v-carousel>
        </v-card>
    </v-col>
</v-row>
</v-container>
</template>

<script>
    import {request,test} from '../../common/request'
    import {week,month,weather} from "../../common/daily";

    export default {
    name: "Other",
    data(){
        return {
          // ip: returnCitySN["cip"],
          // city: '',
          // weather: {},
          city: '永州',
          weather: {"temperature":"23","humidity":"80","info":"阴","wid":"02","direct":"南风","power":"3级","aqi":"32"},
          date: new Date(),
          news: [
            {
          "sourceId": "T1348647909107",
          "template": "normal1",
          "lmodify": "2020-03-27 16:26:04",
          "source": "澎湃新闻",
          "postid": "F8O5P1TB00019B3E",
          "title": "美国通过所谓\"2019年台北法案\" 外交部：坚决反对",
          "mtime": "2020-03-27 16:26:04",
          "hasImg": 1,
          "topic_background": "http://img2.cache.netease.com/m/newsapp/reading/cover1/C1348646712614.jpg",
          "digest": "3月27日，外交部发言人耿爽主持例行记者会。有记者就美方签署通过“2019年台北法案”相关内容提问。耿爽表示，美方所谓“2019年台北法案”严重违反了一个中国原",
          "boardid": "news2_bbs",
          "alias": "Top News",
          "hasAD": 1,
          "imgsrc": "http://cms-bucket.ws.126.net/2020/0327/7c6247b2p00q7ufa800hec000s600e3c.png",
          "ptime": "2020-03-27 16:23:00",
          "daynum": "18348",
          "hasHead": 1,
          "order": 1,
          "votecount": 0,
          "hasCover": false,
          "docid": "F8O5P1TB00019B3E",
          "tname": "头条",
          "url_3w": "",
          "priority": 70,
          "url": "https://3g.163.com/news/20/0327/16/F8O5P1TB00019B3E.html",
          "quality": 80,
          "commentStatus": 1,
          "ads": [
            {
              "subtitle": "",
              "skipType": "photoset",
              "skipID": "00AP0001|2307616",
              "tag": "photoset",
              "title": "按下重启键！返城乘客有序进入武汉",
              "imgsrc": "bigimg",
              "url": "00AP0001|2307616"
            },
            {
              "subtitle": "",
              "skipType": "photoset",
              "skipID": "00AP0001|2307608",
              "tag": "photoset",
              "title": "武汉地铁即将“重启”6条线全面消杀",
              "imgsrc": "bigimg",
              "url": "00AP0001|2307608"
            },
            {
              "subtitle": "",
              "skipType": "photoset",
              "skipID": "00AP0001|2307606",
              "tag": "photoset",
              "title": "清明将至 广西南宁推\"代客祭扫\"服务",
              "imgsrc": "bigimg",
              "url": "00AP0001|2307606"
            },
            {
              "subtitle": "",
              "skipType": "photoset",
              "skipID": "00AO0001|2307605",
              "tag": "photoset",
              "title": "德国建方舱医院 市政大厅变医疗中心",
              "imgsrc": "bigimg",
              "url": "00AO0001|2307605"
            },
            {
              "subtitle": "",
              "skipType": "photoset",
              "skipID": "00AO0001|2307609",
              "tag": "photoset",
              "title": "澳大利亚山火中获救考拉重回森林",
              "imgsrc": "bigimg",
              "url": "00AO0001|2307609"
            }
          ],
          "ename": "androidnews",
          "replyCount": 0,
          "ltitle": "美国通过所谓\"2019年台北法案\" 外交部：坚决反对",
          "hasIcon": false,
          "subtitle": "",
          "cid": "C1348646712614"
        },
            {
              "sourceId": "T1348647909107",
              "votecount": 0,
              "docid": "F8O5NFHQ00019B3E",
              "lmodify": "2020-03-27 16:26:04",
              "url_3w": "",
              "source": "新华社",
              "postid": "F8O5NFHQ00019B3E",
              "priority": 70,
              "title": "北京检方依法对隐瞒武汉居住史嫌疑人批准逮捕",
              "mtime": "2020-03-27 16:26:04",
              "url": "https://3g.163.com/news/20/0327/16/F8O5NFHQ00019B3E.html",
              "quality": 80,
              "commentStatus": 1,
              "replyCount": 0,
              "ltitle": "北京检方依法对隐瞒武汉居住史嫌疑人批准逮捕",
              "subtitle": "",
              "digest": "【#北京检方依法对隐瞒武汉居住史的犯罪嫌疑人常某批准逮捕#】北京市人民检察院27日发布，2020年3月26日，北京市房山区人民检察院依法对犯罪嫌疑人常某以涉嫌妨",
              "boardid": "news2_bbs",
              "imgsrc": "http://cms-bucket.ws.126.net/2020/0327/352a4f38p00q7uf8q00byc000s600e3c.png",
              "ptime": "2020-03-27 16:22:08",
              "daynum": "18348"
            },
            {
              "sourceId": "T1348647909107",
              "votecount": 28,
              "docid": "F8O526JC00019B3E",
              "lmodify": "2020-03-27 16:18:22",
              "url_3w": "",
              "source": "封面新闻",
              "postid": "F8O526JC00019B3E",
              "priority": 70,
              "title": "意大利护士接连自杀 医护对医疗体系有多失望?",
              "mtime": "2020-03-27 16:18:22",
              "url": "https://3g.163.com/news/20/0327/16/F8O526JC00019B3E.html",
              "quality": 80,
              "commentStatus": 1,
              "replyCount": 33,
              "ltitle": "意大利护士接连自杀 医护对医疗体系有多失望?",
              "subtitle": "",
              "digest": "近日，一名感染新冠肺炎病毒的意大利护士在担心自己会将病毒传播给他人后自杀。这也是意大利爆发新冠肺炎疫情以来，第二名自杀的护士。护士达妮埃拉·特雷齐3月25日，意",
              "boardid": "news2_bbs",
              "imgsrc": "http://cms-bucket.ws.126.net/2020/0327/29a2c5bap00q7ueol00l9c000s600e3c.png",
              "ptime": "2020-03-27 16:10:31",
              "daynum": "18348"
            },
            {
              "sourceId": "T1348647909107",
              "votecount": 0,
              "docid": "F8O51M0B0001899O",
              "lmodify": "2020-03-27 16:17:55",
              "url_3w": "",
              "source": "央视新闻客户端",
              "postid": "F8O51M0B0001899O",
              "priority": 70,
              "title": "内蒙古锡林郭勒盟 苏尼特左旗发生3.2级地震",
              "mtime": "2020-03-27 16:17:55",
              "url": "https://3g.163.com/news/20/0327/16/F8O51M0B0001899O.html",
              "quality": 80,
              "commentStatus": 1,
              "replyCount": 0,
              "ltitle": "内蒙古锡林郭勒盟 苏尼特左旗发生3.2级地震",
              "subtitle": "",
              "digest": "记者从内蒙古锡林郭勒盟地震局了解到，3月27日14时14分，在内蒙古锡林郭勒盟苏尼特左旗（北纬44.41度，东经112.9度）发生3.2级地震，震源深度15公里",
              "boardid": "news2_bbs",
              "imgsrc": "http://cms-bucket.ws.126.net/2020/0327/1bbbb6c5p00q7ueoo006rc000s600e3c.png",
              "ptime": "2020-03-27 16:10:14",
              "daynum": "18348"
            },
            {
              "sourceId": "T1348647909107",
              "votecount": 0,
              "docid": "F8O4P1CM0001899O",
              "lmodify": "2020-03-27 16:17:55",
              "url_3w": "",
              "source": "中央纪委国家监委网站",
              "postid": "F8O4P1CM0001899O",
              "priority": 70,
              "title": "黑龙江省哈尔滨市委原常委被开除党籍和公职",
              "mtime": "2020-03-27 16:17:55",
              "url": "https://3g.163.com/news/20/0327/16/F8O4P1CM0001899O.html",
              "quality": 80,
              "commentStatus": 1,
              "replyCount": 0,
              "ltitle": "黑龙江省哈尔滨市委原常委被开除党籍和公职",
              "subtitle": "",
              "digest": "据黑龙江省纪委监委消息：日前，经黑龙江省委批准，黑龙江省纪委监委对哈尔滨市委原常委、政法委原书记任锐忱严重违纪违法问题进行了立案审查调查。经查，任锐忱违反政治纪",
              "boardid": "news2_bbs",
              "imgsrc": "http://cms-bucket.ws.126.net/2020/0327/0f114c99p00q7uek200huc000s600e3c.png",
              "ptime": "2020-03-27 16:05:31",
              "daynum": "18348"
            }
          ]
        }
    },
    computed: {
      getIPUrl(){
        return '/ip/ipNew?ip='+ this.ip + '&key=f3209455c6a1ddb8792fee0bfed790a1'
      },
      getDate(){
        return week[this.date.getDay()] + ' ' + this.date.getHours() + ':' + this.date.getMinutes() + ' ' +  this.weather.info
      },
      getWeatherIcon(){
        return weather[this.weather.wid][(this.date.getHours() >= 6 && this.date.getHours() <= 18)? 0 : 1]
      }
    },
    methods:{
      openNews(url){
        console.log(url)
        window.open(url);
      },
      getWeather(){
        request({
          method: 'get',
          url: this.getIPUrl,
        }).then((res)=>{
          // console.log(res.data.result)
          let city = res.data.result.City
          this.city = city
          return request({
            method: 'get',
            url: this.getWUrl(city)
          })
        }).then(res => {
          this.weather = res.data.result.realtime
        })
      },
      getWUrl(city){
        let key = '市'
        console.log("city_:"+city)
        let index = city.indexOf(key)
        return '/simpleWeather/query?city=' + city.substring(0,index) +'&key=b248d173e67960b90e422e2d16cd5f9c'
      }
    },
    created() {
      // this.getWeather()
      console.log(this.weather)
    }
  }
</script>

<style scoped lang="less">
.newsImg{
    // 添加图片遮罩
    opacity:0.2; filter: alpha(opacity=60);
    border-radius: 4px;
}
.weather{
    position: relative;
    .weatherContent{
        position: absolute;
        top: 35%;
        left: 0;
        right: 0;
        .content{
            font-size: 3rem;text-align: center;
            span{
                font-size: 3rem;
            }
        }
        .infom{
            font-size: 1em;
            position: absolute;
            top: 85%;
            width: 100%;
            display: flex;
            padding: 1em .5em 1em 1.2em;
            .weather-item1{
                flex: 1.5;
                padding-top: 1rem;
            }
            .weather-item2{
                flex: 1.9;
                padding-top: 1rem;
            }
            .weather-item3{
                flex: 1;
                padding-top: 1rem;
            }
        }

    }
    .weatherTitle{
        position: absolute;
        padding-left: 0.5em;
        top: .4em;
    }
}
.newItem{
    position: relative;
    .newTitle{
        text-align: center;
        position: absolute;
        width: 100%;
        top: 82%;
        left: 0;
        right: 0;
    }

}
</style>