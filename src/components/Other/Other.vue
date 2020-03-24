<template>
    <p>asdasd</p>
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
    methods:{
      getWeather(){
        this.getLocation()
        request({
          method: 'post',
          data: {
            ip: this.ip,
            key: 'f3209455c6a1ddb8792fee0bfed790a1'
          },
          url: '/ip/ipNew',
        })
      },
      getLocation(){
        request({
          method: 'post',
          data: {
            ip: this.ip,
            key: 'f3209455c6a1ddb8792fee0bfed790a1'
          },
          url: '/ip/ipNew',
        }).then((res)=>{
          console.log(res)
        })
        }
      },

    },
    created() {
      console.log(this.ip)
    }
  }





</script>

<style scoped>

</style>