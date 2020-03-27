<template>
<v-container class="list">
    <v-chip
            v-for="(item,index) in sheet"
            :key="index"
            class="ma-2 list-item"
            label
            @click="changeSong(index)"
    >
        {{index+1 + '. '+ item.singer + ' - ' +  item.name}}
    </v-chip>
</v-container>
</template>


<script>
  import data from '../../common/data'
  export default {
    props:{
        sheetIndex: Number,
    },
    name: "List",
    data() {
      return{
        // 歌单序列
        index: this.sheetIndex
      }
    },
    computed:{
      sheet(){
        // 当前歌单
        return data[this.index]
      }
    },
    methods: {
      changeSong(index){
        console.log("click!");
        console.log("当前歌单序列：" + this.index)
        console.log("当前歌曲序列：" + index)
        this.$store.commit({
          type: 'changeSong',
          song: this.sheet[index],
          index: [this.index,index],
        })
      }
    }
  }
</script>

<style>
.list{
    display: flex;
    flex-wrap: wrap;
    padding: 1em 0 1em 20px;
    margin-right: -20px;
    margin-left: 10px;
}
    .list-item{
             flex: 0 0 30%;
    }

</style>