<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import createUsers from './utils/fn.js'
export default {
  created () {
    createUsers()
  }
}
</script>
<style>
*{
  margin:0;
  padding: 0;
  box-sizing: border-box;
}
a{
  text-decoration: none;
  color: inherit;
}
#app{
  background-color: #f0f0f0;
  width: 100vw;
  height: 100vh;
}
</style>
