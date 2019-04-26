<template>
  <div class="col-xs-20 col-sm-12 col-md-10 login">
    <div class="col-sm-24 col-md-24 inputLogin">
      <at-card :body-style="{ padding: 0 }">
        <div>
          <at-tabs>
            <at-tab-pane label="账号登录" name="name1">
              <div class="userTab">
                <at-input v-model="userName" placeholder="手机号/邮箱/用户名">
                  <template slot="prepend">
                    <i class="icon icon-user"></i>
                  </template>
                </at-input>
                <at-input
                  v-model="password"
                  placeholder="密码"
                  :type="loginEyes"
                >
                  <template slot="prepend">
                    <i class="icon icon-unlock"></i>
                  </template>
                  <template slot="append">
                    <i :class="loginClsaa" @click="loginChangeEyes"></i>
                  </template>
                </at-input>
                <p class="find">忘记密码</p>
              </div>
              <div class="btn">
                <at-button type="primary" :disabled="loginBtn">登录</at-button>
              </div>
            </at-tab-pane>
            <at-tab-pane label="注册账号" name="name2">
              <div class="userTab_rgt">
                <at-input
                  v-model="userName_rgt"
                  placeholder="手机号/邮箱/用户名"
                  @blur="cheakRgtUser"
                  :status="status"
                  :icon="statusIcon"
                >
                  <template slot="prepend">
                    <i class="icon icon-user"></i>
                  </template>
                </at-input>
                <at-input
                  v-model="password_rgt"
                  placeholder="密码"
                  :type="rgtEyes"
                >
                  <template slot="prepend">
                    <i class="icon icon-unlock"></i>
                  </template>
                  <template slot="append">
                    <i :class="rgtClass" @click="rgtChangeEyes"></i>
                  </template>
                </at-input>
                <at-input
                  v-model="password_agn_rgt"
                  placeholder="再次输入密码"
                  :type="rgtEyes"
                >
                  <template slot="prepend">
                    <i class="icon icon-unlock"></i>
                  </template>
                  <template slot="append">
                    <i :class="rgtClass" @click="rgtChangeEyes"></i>
                  </template>
                </at-input>
              </div>
              <div class="btn">
                <at-button type="primary" :disabled="rgtBtn">注册</at-button>
              </div>
            </at-tab-pane>
          </at-tabs>
          <div style="padding: 14px;">
            <p>AT-UI</p>
          </div>
        </div>
      </at-card>
    </div>
  </div>
</template>

<script>
import { checkUser } from "../api/index";
export default {
  name: "home",
  data() {
    return {
      isShow: true,
      userName: "",
      password: "",
      loginEyes: "password",
      loginClsaa: "icon icon-eye-off",
      rgtEyes: "password",
      rgtClass: "icon icon-eye-off",
      loginBtn: true,
      userName_rgt: "",
      password_rgt: "",
      password_agn_rgt: "",
      rgtBtn: true,
      status: "",
      statusIcon: ""
    };
  },
  components: {},
  mounted() {},
  methods: {
    loginChangeEyes() {
      let that = this;
      if (that.loginClsaa == "icon icon-eye-off") {
        that.loginEyes = "";
        that.loginClsaa = "icon icon-eye";
      } else {
        that.loginEyes = "password";
        that.loginClsaa = "icon icon-eye-off";
      }
    },
    rgtChangeEyes() {
      let that = this;
      if (that.rgtClass == "icon icon-eye-off") {
        that.rgtEyes = "";
        that.rgtClass = "icon icon-eye";
      } else {
        that.rgtEyes = "password";
        that.rgtClass = "icon icon-eye-off";
      }
    },
    cheakRgtUser() {
      let that = this;
      if (that.userName_rgt != "") {
        checkUser().then(res => {
          if (res.code == 0) {
            that.status = "success";
            that.statusIcon = "check-circle";
            that.$Message.success(res.message);
          } else {
            that.status = "error";
            that.statusIcon = "x-circle";
          }
        });
      } else {
        that.status = "";
        that.statusIcon = "";
      }
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  /*width: 100%;*/
  height: 3rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  .icon-eye,
  .icon-eye-off {
    cursor: pointer;
  }
  .userTab {
    width: 2.75rem;
    height: 1.1rem;
    margin: auto;
    margin-top: 0.3rem;
    .at-input {
      margin-bottom: 0.15rem;
      height: 0.3rem;
    }
    .at-input:nth-child(2) {
      margin-bottom: 0.1rem;
    }
    .find {
      width: 0.6rem;
      float: right;
      text-align: right;
      cursor: pointer;
      font-size: 0.12rem;
    }
  }
  .userTab_rgt {
    width: 2.75rem;
    height: 1.4rem;
    margin: auto;
    margin-top: 0.3rem;
    .at-input {
      margin-bottom: 0.15rem;
      height: 0.3rem;
    }
  }
  .btn {
    width: 2.75rem;
    height: 0.3rem;
    margin: auto;
    .at-btn {
      width: 2.75rem;
      height: 0.3rem;
    }
  }
}
</style>
<style lang="less">
.login {
  .at-tabs {
    .at-tabs__header {
      width: 2.75rem;
      margin: auto;
      padding-top: 0.2rem;
      .at-tabs-nav__item {
        width: 1.25rem;
        text-align: center;
        font-size: 0.14rem;
      }
    }
  }
}
</style>
