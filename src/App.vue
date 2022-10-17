<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
  <div class="app-main">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
$font-color-gray: rgb(16, 219, 50);
$_active_color: #409eff;
$_base_bg: #313e52;
$_base_bg_1: rgb(32, 39, 53);
$_base_color: #99a5be;

#app {
  font-family: webfont, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $font-color-gray;
  line-height: 1;
  .app-main {
    font-family: webfont, Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: rgb(24, 31, 41);
    width: 100vw;
    height: 100vh;
    color: $_base_color;
    background-color: rgb(24, 31, 41);
    .full-screen {
      height: 100%;
      display: block;
      .flex-box {
        display: flex;
        span.block {
          display: inline-block;
          width: 50px;
          height: 50px;
          margin: 20px;
        }
      }
      
    }
  }
}
</style>
