<template>
  <!--
    - 粒子特效
    - npm install -- save vue-particles
    - import VueParticles from "vue-particles"
    - Vue.use(VueParticles); // 粒子效果
    - color:String类型。粒子颜色
    - linesColor: String类型。线条颜色。
    - particleOpacity:Number类型。粒子透明度
    - particlesNumber:Number类型。粒子数量
    - shapeType:String类型。粒子外观  => "circle","edge","triangle", "polygon","star"
    - particleSize: Number类型。默认80。单个粒子大小。
    - linesWidth: Number类型。默认1。线条宽度。
    - lineLinked: 布尔类型。默认true。连接线是否可用。
    - lineOpacity: Number类型。默认0.4。线条透明度。
    - linesDistance: Number类型。默认150。线条距离。
    - moveSpeed: Number类型。默认3。粒子运动速度。
    - hoverEffect: 布尔类型。默认true。是否有hover特效。
    - hoverMode: String类型。默认true。可用的hover模式有: "grab", "repulse", "bubble"。
    - clickEffect: 布尔类型。默认true。是否有click特效。
    - clickMode: String类型。默认true。可用的click模式有: "push", "remove", "repulse", "bubble"。
  -->

  <div id="particles" v-if="isShow">
    <vue-particles
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="100"
      shapeType="circle"
      :particleSize="3"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="80"
      :moveSpeed="1"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
  </div>
</template>
<script>
export default {
  name: "particles",
  data() {
    return {
      isShow: true,
      timeOut: null
    };
  },
  components: {},
  mounted() {
    let that = this;
    window.onresize = () => {
      that.isShow = false;
      that.timeOut = setTimeout(() => {
        that.isShow = true;
      }, 1);
    };
  },
  methods: {}
};
</script>
<style lang="less">
#particles {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  #particles-js {
    margin: 0;
    padding: 0;
    width: 99%;
    height: 99%;
  }
}
</style>
