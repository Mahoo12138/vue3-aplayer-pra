<template>
    <div class="text-center" style="display: inline">
        <v-btn icon @click="sheetSwitch = !sheetSwitch">
            <v-icon size="30" >mdi-dots-vertical</v-icon>
        </v-btn>
        <v-bottom-sheet v-model="sheetSwitch">
            <v-sheet class="text-center" height="200px">
                <v-btn
                        class="mt-6"
                        text
                        color="red"
                        @click="sheetSwitch = !sheetSwitch"
                >关闭</v-btn>
                <div class="py-3" style="width: 80%;margin: 0 auto">
                    <v-subheader>媒体音量</v-subheader>
                    <v-card-text>
                        <v-slider
                                max="100"
                                min="0"
                                @change="changeVolume"
                                v-model="this.$store.getters.getCurrentVolume"
                                prepend-icon="volume_up"
                        ></v-slider>
                    </v-card-text>
                </div>
            </v-sheet>
        </v-bottom-sheet>
    </div>
</template>

<script>
  export default {
    name: "BottomSheet",
    data(){
      return{
        volume: 0,
        sheetSwitch: false,
      }
    },

    methods: {
       changeVolume(volume){
         console.log("音量改变")
         console.log(volume);
         this.$store.commit('changeVolume',volume)
         console.log(this.$store.getters.getCurrentVolume)
        }

    },

  }
</script>

<style scoped>

</style>