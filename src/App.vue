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
  background: linear-gradient(to bottom, #f4d6d6 50%, #0cc6f0 100%);
  width: 100vw;
  height: 100vh;
}
</style>
