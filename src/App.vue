<template>
  <v-app id="inspire">

    <v-app-bar app clipped-left>

      <v-toolbar-title>黄同学的音乐空间</v-toolbar-title>
    </v-app-bar>

    <v-content>
              <div style="display: flex;height: 100%;width: 100%">
                <v-card color="#212121" class="item1">
                  <list></list>
                </v-card>
                <v-card color="#212121" class="item2">
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
  import List from './components/List/List'
  import Player from "./components/Player/Player";
  export default {
    components: {
      List,
      Player
    },
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
    created () {
      this.$vuetify.theme.dark = true
    },
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