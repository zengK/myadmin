<template>
  <div class="login">
    <h1 class="headertitle">商家后台管理系统</h1>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-position="left"
      label-width="100px"
      class="demo-ruleForm login-container"
    >
      <h3 class="title">系统登录</h3>
      <el-form-item prop="mobile" label="手机号">
        <el-input type="text" v-model.number="ruleForm.mobile" auto-complete="off" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item prop="smsNumber" label="验证码">
        <el-input
          type="password"
          style="width:140px"
          v-model.number="ruleForm.smsNumber"
          auto-complete="off"
          placeholder="验证码"
        ></el-input>
        <el-button
          style="width:100px"
          type="primary"
          :disabled="isdisable"
          @click="getCode()"
        >{{this.btnmsg}}</el-button>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleSubmit2"
          :loading="logining"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { requestLogin } from "../api/api";
import { apisms, login } from "../api/index";
//import NProgress from 'nprogress'
export default {
  data() {
    return {
      logining: false,
      isdisable: false,
      numberCode: 60,
      btnmsg: "发送验证码",
      ruleForm: {
        mobile: "",   
        smsNumber: ""
      },
      rules: {
        mobile:[
          {type:'number',required:true,message: '请输入正确的手机号', trigger: 'blur'}
        ],
        smsNumber:[
          {type:'number',required:true,message: '请输入验证码', trigger: 'blur'}
        ]
      },
      checked: true
    };
  },
  methods: {
    handleReset2() {
      this.$refs.ruleForm.resetFields();
    },
    handleSubmit2(ev) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.logining = true;
          login({mobile:this.ruleForm.mobile}).then(res => {
            if (res.code !== 200) {
              this.$message({
                message: res.msg,
                type: "error"
              });
            } else {
              if (info) {
                this.$router.push({ path: "/main" });
              } else {
                this.$router.push({ path: "/form" });
              }
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getCode() {
      apisms({ mobile: this.ruleForm.mobile }).then(res => {
        alert(res)
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "发送成功"
          });
        }
      });
      this.isdisable = true;

      this.sendCode();
    },
    sendCode() {
      // var timer_num = 60;
      var timeClock = setInterval(() => {
        this.numberCode--;
        this.btnmsg = this.numberCode + "秒";
        if (this.numberCode == 0) {
          clearInterval(timeClock);
          this.numberCode = 60;
          this.isdisable = false;
          this.btnmsg = "重新发送";
        }
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: skyblue;
  .headertitle {
    margin-top: 100px;
    text-align: center;
    font-size: 40px;
    line-height: 100px;
    color: white;
  }
}
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 50px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>