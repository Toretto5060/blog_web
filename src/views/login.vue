<template>
  <div>
    <div class="bg"></div>
    <div class="col-xs-20 col-sm-12 col-md-10 login">
      <div class="col-sm-24 col-md-24 inputLogin">
        <at-card :body-style="{ padding: 0 }">
          <div>
            <at-tabs @on-change="changeTab">
              <at-tab-pane label="账号登录" name="name1">
                <div class="userTab">
                  <at-input
                    v-model="userName"
                    placeholder="手机号/邮箱/用户名"
                    :status="loginStatus"
                    :icon="loginIcon"
                  >
                    <template slot="prepend">
                      <i class="icon icon-user"></i>
                    </template>
                  </at-input>
                  <at-input
                    v-model="password"
                    placeholder="密码"
                    :type="loginEyes"
                    :status="loginStatus"
                    :icon="loginClsaa"
                  >
                    <template slot="prepend">
                      <i class="icon icon-unlock"></i>
                    </template>
                  </at-input>
                  <p class="find">忘记密码</p>
                  <template>
                    <i class="show" @click="loginChangeEyes"></i>
                  </template>
                </div>
                <div class="btn">
                  <at-button
                    type="primary"
                    :disabled="loginBtn"
                    @click="loginIn"
                  >
                    登 录
                  </at-button>
                </div>
              </at-tab-pane>
              <at-tab-pane label="注册账号" name="name2">
                <div class="userTab_rgt">
                  <at-input
                    v-model="userName_rgt"
                    placeholder="手机号/邮箱"
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
                    :icon="rgtClass"
                    @blur="cheakRgtPaw"
                    @focus="cheakRgtPaw"
                    :status="password_rgt_status"
                  >
                    <template slot="prepend">
                      <i class="icon icon-unlock"></i>
                    </template>
                  </at-input>
                  <at-input
                    v-model="password_agn_rgt"
                    placeholder="再次输入密码"
                    :type="rgtEyes"
                    :icon="rgtClass"
                    @blur="cheakRgtAgainPaw"
                    @focus="cheakRgtAgainPaw"
                    :status="password_agn_rgt_status"
                  >
                    <template slot="prepend">
                      <i class="icon icon-unlock"></i>
                    </template>
                  </at-input>
                  <template>
                    <i class="show1" @click="rgtChangeEyes"></i>
                  </template>
                  <template>
                    <i class="show2" @click="rgtChangeEyes"></i>
                  </template>
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
  </div>
</template>

<script>
import { checkUser, loginIn } from "../api/index";
export default {
  name: "home",
  data() {
    return {
      isShow: true,
      userName: "",
      password: "",
      loginEyes: "password",
      loginClsaa: "icon icon-eye-off",
      loginStatus: "",
      loginIcon: "",
      rgtEyes: "password",
      rgtClass: "icon icon-eye-off",
      loginBtn: true,
      userName_rgt: "",
      userName_rgt_isVerify: false,
      password_rgt: "",
      password_agn_rgt: "",
      rgtBtn: true,
      status: "",
      statusIcon: "",
      password_rgt_status: "",
      password_agn_rgt_status: ""
    };
  },
  components: {},
  watch: {
    userName() {
      if (this.userName != "" && this.password != "") {
        this.loginBtn = false;
      } else {
        this.loginBtn = true;
      }
      this.loginStatus = "";
      this.loginIcon = "";
    },
    password() {
      if (this.userName != "" && this.password != "") {
        this.loginBtn = false;
      } else {
        this.loginBtn = true;
      }
      this.loginStatus = "";
      this.loginIcon = "";
    },
    userName_rgt() {
      this.status = "";
      this.statusIcon = "";
      this.userName_rgt_isVerify = false;
      this.password_rgt = "";
      this.password_agn_rgt = "";
      if (this.userName_rgt == "") {
        this.rgtBtn = true;
      }
    },
    password_rgt() {
      if (this.status == "error" && this.password_rgt != "") {
        this.password_agn_rgt = "";
        this.$Message.error("请输入正确的手机号或邮箱");
        this.password_rgt = "";
        return;
      }
      if (this.password_rgt != "" && this.userName_rgt == "") {
        this.password_rgt = "";
        this.status = "error";
        this.statusIcon = "x-circle";
        this.$Message.error("请输入手机号或邮箱");
        return;
      }
      if (
        this.password_agn_rgt != "" &&
        this.password_rgt != this.password_agn_rgt
      ) {
        this.$Message.error("请输入相同的密码");
        this.password_agn_rgt_status = "error";
        this.rgtBtn = true;
      } else if (
        this.password_agn_rgt != "" &&
        this.password_rgt == this.password_agn_rgt
      ) {
        this.password_agn_rgt_status = "success";
        this.rgtBtn = false;
      }
      if (this.password_rgt == "") {
        this.rgtBtn = true;
      }
      this.password_rgt_status = "";
    },
    password_agn_rgt() {
      if (
        this.userName_rgt == "" &&
        this.password_rgt == "" &&
        this.password_agn_rgt != ""
      ) {
        this.password_agn_rgt = "";
        this.status = "error";
        this.statusIcon = "x-circle";
        this.$Message.error("请输入手机号或邮箱");
        return;
      }
      if (
        this.userName_rgt != "" &&
        this.password_rgt == "" &&
        this.password_agn_rgt != ""
      ) {
        this.password_agn_rgt = "";
        this.password_rgt_status = "error";
        this.$Message.error("请先输入密码");
        return;
      }
      if (this.password_rgt_status == "error" && this.password_rgt != "") {
        this.password_agn_rgt = "";
        this.$Message.error("请先输入正确的密码");
        return;
      }
      if (this.password_agn_rgt != "") {
        if (this.password_agn_rgt != this.password_rgt) {
          this.password_agn_rgt_status = "error";
          this.rgtBtn = true;
        } else {
          this.password_rgt_status = "success";
          this.password_agn_rgt_status = "success";
          this.rgtBtn = false;
        }
      } else {
        this.password_agn_rgt_status = "";
      }
      if (this.password_agn_rgt == "") {
        this.rgtBtn = true;
      }
    }
  },
  mounted() {},
  methods: {
    changeTab() {
      let that = this;
      that.userName = "";
      that.password = "";
      that.loginEyes = "password";
      that.loginClsaa = "icon icon-eye-off";
      that.loginStatus = "";
      that.loginIcon = "";
      that.rgtEyes = "password";
      that.rgtClass = "icon icon-eye-off";
      that.loginBtn = true;
      that.userName_rgt = "";
      that.userName_rgt_isVerify = false;
      that.password_rgt = "";
      that.password_agn_rgt = "";
      that.rgtBtn = true;
      that.status = "";
      that.statusIcon = "";
      that.password_rgt_status = "";
      that.password_agn_rgt_status = "";
    },
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
    loginIn() {
      let that = this;
      let postData = {
        user: that.userName,
        psw: that.password
      };
      loginIn(postData).then(res => {
        if (res.code == 0) {
          that.$Message.success(res.msg);
        } else {
          that.$Message.error(res.message);
          that.loginBtn = true;
          that.loginStatus = "error";
          that.loginIcon = "x-circle";
        }
      });
    },
    // 校验注册用户名格式及用户名是否可用
    cheakRgtUser() {
      let that = this;
      if (that.userName_rgt != "") {
        if (
          that.userName_rgt.indexOf("@") == -1 &&
          !/^1[34578]\d{9}$/.test(that.userName_rgt)
        ) {
          that.$Message.error("请输入正确的手机号");
          that.status = "error";
          that.statusIcon = "x-circle";
          return;
        } else if (
          that.userName_rgt.indexOf("@") > -1 &&
          !/^([a-zA-Z0-9]+[_||]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_||]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(
            that.userName_rgt
          )
        ) {
          that.status = "error";
          that.statusIcon = "x-circle";
          that.$Message.error("请输入正确的邮箱号");
          return;
        }
        let userName = {
          user: that.userName_rgt
        };
        if (that.userName_rgt_isVerify == false) {
          checkUser(userName).then(res => {
            if (res.code == 0) {
              that.status = "success";
              that.statusIcon = "check-circle";
              that.$Message.success(res.message);
            } else {
              that.status = "error";
              that.statusIcon = "x-circle";
              that.$Message.error(res.message);
            }
            that.userName_rgt_isVerify = true;
          });
        }
      } else {
        that.status = "";
        that.statusIcon = "";
      }
    },
    // 校验注册密码长度及格式
    cheakRgtPaw() {
      let that = this;
      if (that.userName_rgt == "" && that.password_rgt == "") {
        if (that.status == "error") {
          that.status = "";
          that.statusIcon = "";
        }
        return;
      }
      // var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
      if (that.password_rgt != "") {
        if (that.password_rgt.length < 6) {
          that.password_rgt_status = "error";
          that.$Message.error("长度不能小于6");
        } else if (
          !/^(?=.*?[a-z)(?=.*>[A-Z])(?=.*?[0-9])[a-zA_Z0-9]{6,10}$/.test(
            that.password_rgt
          )
        ) {
          that.password_rgt_status = "error";
          that.$Message.error("密码必须包含数字和字母且不能包含特殊字符");
        }
      }
    },
    cheakRgtAgainPaw() {
      let that = this;
      if (
        that.password_agn_rgt == "" &&
        that.userName_rgt != "" &&
        that.password_rgt == ""
      ) {
        that.password_rgt_status = "";
      } else if (
        that.password_agn_rgt == "" &&
        that.userName_rgt == "" &&
        that.password_rgt == ""
      ) {
        that.status = "";
        that.password_rgt_status = "";
      }
    }
  }
};
</script>
<style lang="less" scoped>
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: url("../assets/img/earth.png");
  background-size: 100% 100%;
  z-index: -9;
}
.login {
  /*width: 100%;*/
  height: 3rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  .icon-eye,
  .icon-eye-off {
    cursor: pointer;
  }
  .userTab {
    width: 2.75rem;
    height: 1.1rem;
    margin: auto;
    margin-top: 0.3rem;
    position: relative;
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
    .show {
      width: 0.22rem;
      height: 0.3rem;
      position: absolute;
      bottom: 0.35rem;
      right: 0;
    }
  }
  .userTab_rgt {
    width: 2.75rem;
    height: 1.4rem;
    margin: auto;
    margin-top: 0.3rem;
    position: relative;
    .at-input {
      margin-bottom: 0.15rem;
      height: 0.3rem;
    }
    .show1,
    .show2 {
      width: 0.22rem;
      height: 0.3rem;
    }
    .show1 {
      position: absolute;
      bottom: 0.2rem;
      right: 0;
    }
    .show2 {
      position: absolute;
      bottom: 0.65rem;
      right: 0;
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
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    }
  }
}
</style>
