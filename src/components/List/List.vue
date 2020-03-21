<template>
<div class="list">
    <v-chip
            v-for="(item,index) in items"
            :key="item"
            class="ma-2 list-item"
            label
            @click="changeSong(index)"
    >
        {{index+1 + '. '+ item.singer + ' - ' +  item.name}}
    </v-chip>
</div>
</template>


<script>
  import data from '../../common/data'
  export default {
    name: "List",
    data() {
      return{
        items: data,
      }
    },
    methods: {
      changeSong(index){
        console.log("click!");
        // console.log(index)
        this.$store.commit('changeSong',data[index])
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