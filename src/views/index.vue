<template>
  <div id="index">
    
  </div>
</template>
<script>
import { contList } from "../api/index"
export default {
  name: "index",
  data() {
    return {};
  },
  components: {},
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      contList().then(res => {
        console.log(res)
      })
    }
  }
};
</script>
<style lang="less">
</style>
