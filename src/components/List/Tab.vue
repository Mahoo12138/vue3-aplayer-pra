<template>
    <v-card>
        <v-toolbar flat color="blue-grey darken-4" dark>
            <v-toolbar-title>我的歌单</v-toolbar-title>
        </v-toolbar>
        <v-tabs vertical>
            <v-tab>
                <v-icon left>mdi-account</v-icon>
                 {{ sheetsName[0] }}
            </v-tab>
            <v-tab>
                <v-icon left>mdi-lock</v-icon>
               {{ sheetsName[1] }}
            </v-tab>
            <v-tab>
                <v-icon left>mdi-access-point</v-icon>
               {{ sheetsName[2] }}
            </v-tab>

            <v-tab-item>
                <v-card flat>
                <slot name="item0"></slot>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <slot name="item1"></slot>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <slot name="item2"></slot>
            </v-tab-item>
        </v-tabs>
    </v-card>
</template>

<script>
  import List from "./List";
  export default {
    props: {
      sheets: Array
    },
    data(){
      return{
        sheetsName: this.sheets
      }
    },
    name: "Tab",
    components: {
      List
    }
  }
</script>

<style scoped>

</style>