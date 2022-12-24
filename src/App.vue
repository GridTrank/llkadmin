<template>
    <div id="app">
      <commonHeadVue  v-if="$route.name!='Login'"></commonHeadVue>
      <div class="container">
        <router-view ></router-view>
      </div>
      <commonFootVue  v-if="$route.name!='Login'"></commonFootVue>
    </div>
</template>

<script>
import commonHeadVue from './components/commonHead.vue'
import commonFootVue from './components/commonFoot.vue'
export default {
  name: 'App',
  components:{
    commonHeadVue,
    commonFootVue
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-width: 1200px;
  .container{
    // min-height: 700px;
  }
}
</style>
