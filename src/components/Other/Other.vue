<template>
   <v-container>
    <!--       <v-btn color="red" @click="getWeather">test</v-btn>-->
<v-row>
    <v-col cols="5" >
        <v-card hover>
            <v-list-item two-line>
                <v-list-item-content>
                    <v-list-item-title class="headline">{{city}}</v-list-item-title>
                    <v-list-item-subtitle>{{getDate}}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-card-text>
                <v-row align="center" justify="center"  style="font-size: 3rem;">

                        <v-col cols="4">{{weather.temperature}}&deg;C</v-col>
                        <v-col cols="3">
                            <i class="iconfont text-center"  style="font-size: 3rem;text-align: center">{{getWeatherIcon}}</i>
                        </v-col>
                </v-row>

                <div class="weather">
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
            </v-card-text>
        </v-card>
    </v-col>
    <v-col cols="7">
        <v-card>
            <v-subheader>天气</v-subheader>
        </v-card>
    </v-col>
</v-row>
</v-container>
</template>

<script>
    import {request} from '../../common/request'
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
          date: new Date()
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
.weather{
    display: flex;
    padding-top: 2em;
    .weather-item1{
        flex: 1.4;
        padding-top: 1rem;
    }
    .weather-item2{
        flex: 1.8;
        padding-top: 1rem;
    }
    .weather-item3{
        flex: 1;
        padding-top: 1rem;
    }
}
</style>