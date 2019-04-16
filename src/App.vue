<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
body,html,#app{
  widows: 100%;
  height: 100%;
  -webkit-user-select:none;  
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;   /**狂点出现蓝色**/
}
#app {
  /* width: 100%;
  height: 100%; */
}
</style>
