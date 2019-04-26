<template>
  <div id="app">
    <div class="particles">
      <part-icles></part-icles>
    </div>
    <div class="routerView">
      <router-view />
    </div>
  </div>
</template>
<script>
import PartIcles from "./components/particles";
export default {
  name: "particles",
  data() {
    return {
      isShow: true
    };
  },
  components: {
    PartIcles
  }
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: 100px;
}
@media (min-width: 1024px) {
  html {
    font-size: 100px;
  }
}

@media (min-width: 1100px) {
  html {
    font-size: 107px;
  }
}

@media (min-width: 1280px) {
  html {
    font-size: 125px;
  }
}

@media (min-width: 1366px) {
  html {
    font-size: 133px;
  }
}

@media (min-width: 1440px) {
  html {
    font-size: 141px !important;
  }
}

@media (min-width: 1680px) {
  html {
    font-size: 164px;
  }
}

@media (min-width: 1920px) {
  html {
    font-size: 188px;
  }
}
@media screen and (min-width: 320px) and (max-width: 359px) {
  html,
  body {
    font-size: 100px;
  }
}
@media screen and (min-width: 360px) and (max-width: 374px) {
  html {
    font-size: 86.96px;
  }
}
@media screen and (min-width: 375px) and (max-width: 385px) {
  html {
    font-size: 90.58px;
  }
}
@media screen and (min-width: 386px) and (max-width: 392px) {
  html {
    font-size: 93.27px;
  }
}
@media screen and (min-width: 393px) and (max-width: 400px) {
  html {
    /* font-size: 94.92px; */
    font-size: 77.29px;
  }
}
@media screen and (min-width: 401px) and (max-width: 414px) {
  html {
    font-size: 100px;
  }
}
/* pad */
@media screen and (min-width: 640px) and (max-width: 799px) {
  html {
    font-size: 164px;
  }
}
/* pad pro */
@media screen and (min-width: 800px) and (max-width: 1023px) {
  html {
    font-size: 87px;
  }
}
#app {
  width: 100%;
  height: 100%;
  position: relative;
  .particles {
    width: 100%;
    height: 100%;
    float: left;
  }
}
</style>
