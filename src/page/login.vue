<template>
  <div class="hello" v-if="loginShow">
     <vue-particles
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="180"
        shapeType="circle"
        :particleSize="3"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="80"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles>
    <div class="login"  v-loading=loading  @dblclick="getToken()">
      <el-form :inline="true" label-position="left" label-width="65px"  :model="input" status-icon :rules="rules" ref="input" class="demo-form-inline">
        <h2>{{title}}</h2>
        <el-form-item label="账号:" prop='user' :class="dataClass">
          <el-input v-model="input.user" placeholder="请输入用户名或者昵称"></el-input>
        </el-form-item>

        <el-form-item label="密码:" prop='psw'>
          <el-input type="password"  v-model="input.psw" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item label="确认密码:" prop='checkPsw' v-if = isRegister>
          <el-input type="password" v-model="input.checkPsw" placeholder="请再次输入密码"></el-input>
        </el-form-item>

        <el-button :class="dataButton" @click="loginOrRegs('input')">{{title}}</el-button>
        <span :class="dataSpan" @click="loginMessages()">{{loginMessage}}</span>
      </el-form>

    </div>

  </div>
</template>

<script>
import {loginIn,checkUser,registerUser,tast,checkLogin} from '../api/index.js';

export default {
  name: 'login',
  data () {
      var checkUserName =(rule, value, callback)=>{
        if (value === "") {
          callback(new Error('用户名不能为空'));
        }else{
          if(this.isRegister==true){
            checkUser(this.input).then(res=>{
              if (this.isRegister == false) {
                this.$refs.input.resetFields();  //移除表单内容及校验值
              }
              if(res.code < 0 ){
                callback(new Error('用户名已被占用'));
              }else{
                callback();
              }
            })
          }else{
            callback();
          }
        }

      }
      var pswRule = (rule, value, callback) => {
        if (value === "") {
          callback(new Error('密码不能为空'));
        }
        else {
          if (this.input.psw !== '' && this.isRegister == true) {
            this.$refs.input.validateField('checkPsw');
          }
          callback();
        }
      };
      var pswRule2 = (rule, value, callback) => {
        if(this.isRegister != true){
          return;
        }
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.input.psw) {
          callback(new Error('两次输入密码不一致!'));
        } else{
          callback();
        }
    };
    return {
      dataClass:'maT',
      dataButton:'loginBut',
      dataSpan:'loginSp',
      loginMessage:'还没有账号?马上注册!',
      loading:false,
      // isLogin:true,
      isRegister:false,
      title:'登录',
      lgnOrRgst:'',
      input:{
        user:"",
        psw:"",
        checkPsw:""
      },
      rules: {
        user:[{validator:checkUserName,trigger: 'blur'}],
        psw:[{validator: pswRule, trigger: 'blur'}],
        checkPsw:[{validator: pswRule2, trigger: 'change'}]
      },
      loginShow:false
    }
  },
  watch:{
    "isRegister"(){
      if(this.isRegister == true){
        this.title="注册"
        this.dataClass=""
        this.dataButton='',
        this.dataSpan='',
        this.loginMessage = "已有账号!马上登录"
      }else{
        this.title="登录"
        this.dataClass="maT",
        this.dataButton='loginBut',
        this.dataSpan='loginSp',
        this.loginMessage = "还没有账号?马上注册!"
      }
    }
  },
  mounted () {
    this.checkLogin()
  },
  methods:{
    loginMessages(){
      let that = this;
      if(that.isRegister == true){
        that.isRegister = false;
        that.$refs.input.resetFields();  //移除表单内容及校验值
      }else{
        that.isRegister = true;
        that.$refs.input.resetFields();  //移除表单内容及校验值
      }
    },
    loginOrRegs(data){
      let that = this;
      if(that.isRegister == false){
        that.btnLogin(data);
      }else if(that.isRegister){
        that.btnReq(data);
      }
    },
    checkLogin(){
      let that = this
      if (localStorage.getItem('token') != '' && localStorage.getItem('token') != null) {
        checkLogin().then(res=>{
          if (res.code > -1) {
            that.loginShow = false
            that.$router.push({path:'/home'})
          }
        })
      } else {
        that.loginShow = true
      }
    },
    btnLogin(formData){
      let that = this;
      that.$refs[formData].validate((valid) => {
        that.loading = false;
        if (valid) {
          loginIn(that.input).then(res=>{
            if(res.code == 0){
              // that.$store.state.token = res.data.token
              // that.$store.state.user_id = res.data.id
              localStorage.setItem('token',res.data.token)
              localStorage.setItem('user_id',res.data.id)
              if (res.data.post_position == '' && res.data.area == '') {
                that.$router.push({path:'/editUserDetails'})
              } else {
                that.$router.push({path:'/home'})
              }
            }else{
              console.log(res.message)
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      // if(that.input.user == "" || that.input.psw == ""){
      //   return;
      // }
      // loginIn(that.input).then(res=>{
      //   if(res.code == 0){
      //     localStorage.setItem('token',res.token);
      //     store.state.token = localStorage.getItem('token');
      //     console.log(res)
      //     // console.log(store.state.token)
      //   }else{
      //     console.log(res.message)
      //   }
      // })
    },
    btnReq(formData){
      let that = this;
      // that.loading = true;
      that.$refs[formData].validate((valid) => {
        that.loading = false;
        if (valid) {
            that.loading = false;
            registerUser(that.input).then(res=>{
              that.loading = false;
              if(res.status == 200){
                that.isRegister = false;
                that.$message.success(res.message)
                console.log(res)
              }else{
                that.$message.error(res.message)
              }
            }).catch( error =>{
              that.loading = false;
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });


    },
    getToken(){
      let that = this;
      tast().then(res=>{
        alert(res.msg)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .hello{
    width: 100%;
    height: 100%;
    background-image: url('../assets/bgColor.jpg');
    position: relative;
    #particles-js{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 99%;
    }
    .login{
      position: absolute;
      background-color: #fff;
      border-radius: 5px;
      width: 355px;
      height: 280px;
      margin: auto;
      top: 0; left: 0; bottom: 0; right: 0;
      z-index: 9999;
      .maT{
        margin-top: 20px;
      }
      button{
        margin-left: 37px;
      }
      .loginBut{
        display: block;
        width: 78%;
        margin: auto;
      }
      .demo-form-inline{
        padding-top:25px;
        .el-form-item{
          margin-bottom:15px;
          padding-left: 37px;
        }
        h2{
          padding-left: 37px;
        }

      }
      span{
        display: inline-block;
        height: 40px;
        line-height: 40px;
        font-size: 12px;
        float: right;
        padding-right: 37px;

      }
      .loginSp{
        display: block;
        width: 78%;
        margin:10px auto;
        text-align: right;
        line-height: 20px;
        // padding-right: 0;
      }
    }
  }



</style>

<style lang="less">
.login{
  .el-input__inner{
      width:215px;
      height: 35px;
  }
  .el-form-item__error{
    padding-top: 0px;
  }
  .el-form-item__label{
    padding:0;
  }
}
</style>

