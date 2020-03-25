<template>
   <v-container>
       <v-btn color="red" @click="getWeather">test</v-btn>
   </v-container>
</template>

<script>
    import {request} from '../../common/request'
  export default {
    name: "Other",
    data(){
        return {
          ip: returnCitySN["cip"],
          weather: {}
        }
    },
    computed: {
      getIPUrl(){
        return '/ip/ipNew?ip='+ this.ip + '&key=f3209455c6a1ddb8792fee0bfed790a1'
      },

    },
    methods:{
      getWeather(){
        request({
          method: 'get',
          url: this.getIPUrl,
        }).then((res)=>{
          // console.log(res.data.result)
          let city = res.data.result.City
          return request({
            method: 'get',
            url: this.getWUrl(city)
          })
        }).then(res => {
          console.log(res)
          this.weather = res.data.result
        })



      },
      getWUrl(city){
        let key = '市'
        console.log("city_:"+city)
        let index = city.indexOf(key)
        return '/simpleWeather/query?city=' + city.substring(0,index) +'&key=b248d173e67960b90e422e2d16cd5f9c'
      }
    },
  }





</script>

<style scoped>

</style>