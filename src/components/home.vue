<template>
  <div class="hello">
    <h1>建设中</h1>
  </div>
</template>

<script>
import {loginIn,registerUser,tast} from '../api/index.js';
import store from '../vuex/store'

export default {
  name: 'home',
  data () {
    return {
      loginPost:{
        user:"",
        psw:""
      },
      reqPost:{
        user:"",
        psw:""
      }
    }
  },
  mounted () {

  },
  watch:{

  },
  beforeRouteLeave(to, from, next){
    if(to.name ==='login' ){
      window.opener=null;
      window.close();
      window.open('',self);
    }
  },
  methods:{
    btnLogin(){
      let that = this;
      loginIn(that.loginPost).then(res=>{
        if(res.code == 0){
          localStorage.setItem('token',res.token);
          store.state.token = localStorage.getItem('token');
          console.log(res)
          // console.log(store.state.token)
        }else{
          console.log(res.message)
        }

      })
    },
    btnReq(){
      let that = this;
      registerUser(that.reqPost).then(res=>{
        console.log(res)
      })
    },
    getToken(){
      let that = this;
      tast().then(res=>{
        console.log(res)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
