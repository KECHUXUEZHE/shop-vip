<template>
  <div class="aside" :style="{minWidth:width+'px',width:width+'px'}">
    <router-link to="/home" class="logo">{{logo}}</router-link>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['logo', 'width']
}
</script>

<style scoped>
.logo{
  color: white;
  line-height: 60px;
  padding: 0 20px;
  height: 60px;
  width: 100%;
  font-size: 22px;
  font-weight: bold;
}
.aside{
  display: flex;
  height: 100vh;
  background-color: #5a5653;
  flex-direction: column;
  font-size: 17px;
}
.aside> :not(.logo){
  line-height: 50px;
  padding: 0 20px;
  color: rgba(255, 255, 255, 0.9);
}
.aside> :not(.logo):hover{
  background-color: rgba(255, 255, 255, 0.25);
}
:not(.logo) a{
  transition: all 0.3s;
}
</style>
