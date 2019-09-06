<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-tabs
        :activeKey="customActiveKey"
        :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick"
      >
        <a-tab-pane key="tab1" tab="">
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="CFE account"
              v-decorator="[
                'username',
                {rules: [{ required: true, message: 'Please enter your ITCode' }, { validator: handleUsernameOrEmail }], validateTrigger: 'change'}
              ]"
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input
              size="large"
              type="password"
              autocomplete="false"
              placeholder="AD password"
              v-decorator="[
                'password',
                {rules: [{ required: true, message: 'Please enter your password' }], validateTrigger: 'blur'}
              ]"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>
        </a-tab-pane>
      </a-tabs>
      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >Login</a-button>
      </a-form-item>
    </a-form>

    <two-step-captcha
      v-if="requiredTwoStepCaptcha"
      :visible="stepCaptchaVisible"
      @success="stepCaptchaSuccess"
      @cancel="stepCaptchaCancel"
    ></two-step-captcha>
  </div>
</template>

<script>
import Vue from "vue";
import md5 from "md5";
import TwoStepCaptcha from "@/components/tools/TwoStepCaptcha";
import { mapActions } from "vuex";
import { timeFix } from "@/utils/util";
import { login, getMenu } from "@/api/loginApi";
import { generatorDynamicRouter } from "@/config/router.config";

export default {
  components: {
    TwoStepCaptcha
  },
  data() {
    return {
      customActiveKey: "tab1",
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      },
      configMenu: ""
    };
  },
  created() {
    console.log(12121212);
    // get2step({ })
    //   .then(res => {
    //     this.requiredTwoStepCaptcha = res.result.stepCode
    //   })
    //   .catch(() => {
    //     this.requiredTwoStepCaptcha = false
    //   })
    // this.requiredTwoStepCaptcha = true
  },
  methods: {
    ...mapActions(["Login", "Logout"]),
    // handler
    handleUsernameOrEmail(rule, value, callback) {
      const { state } = this;
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
      if (regex.test(value)) {
        state.loginType = 0;
      } else {
        state.loginType = 1;
      }
      callback();
    },
    handleTabClick(key) {
      this.customActiveKey = key;
      // this.form.resetFields()
    },
    handleSubmit(e) {
      // 登录
      e.preventDefault();
      const {
        form: { validateFields },
        state,
        customActiveKey,
        Login
        // GetMenu
      } = this;

      state.loginBtn = true;

      const validateFieldsKey =
        customActiveKey === "tab1"
          ? ["username", "password"]
          : ["mobile", "captcha"];
      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          console.log(err);
          const loginParams = { ...values };
          delete loginParams.username;
          loginParams[!state.loginType ? "email" : "username"] =
            values.username;
          // loginParams.password = md5(values.password)
          // console.log(loginParams);//传输数据
          // this.$set(this.loginParams,this.loginParams.length,dict);
          Login(loginParams)
            .then(res => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false;
            });
        } else {
          setTimeout(() => {
            state.loginBtn = false;
          }, 600);
        }
      });
    },

    getCaptcha(e) {
      e.preventDefault();
      const {
        form: { validateFields },
        state
      } = this;

      validateFields(["mobile"], { force: true }, (err, values) => {
        if (!err) {
          state.smsSendBtn = true;

          const interval = window.setInterval(() => {
            if (state.time-- <= 0) {
              state.time = 60;
              state.smsSendBtn = false;
              window.clearInterval(interval);
            }
          }, 1000);

          const hide = this.$message.loading("验证码发送中..", 0);
          login({ mobile: values.mobile })
            .then(res => {
              setTimeout(hide, 2500);
              this.$notification["success"]({
                message: "提示",
                description:
                  "验证码获取成功，您的验证码为：" + res.result.captcha,
                duration: 8
              });
            })
            .catch(err => {
              setTimeout(hide, 1);
              clearInterval(interval);
              state.time = 60;
              state.smsSendBtn = false;
              this.requestFailed(err);
            });
        }
      });
    },
    stepCaptchaSuccess() {
      this.loginSuccess();
    },
    stepCaptchaCancel() {
      this.Logout().then(() => {
        this.loginBtn = false;
        this.stepCaptchaVisible = false;
      });
    },
    loginSuccess(res) {
      console.log(res);
      if (res.code == 0) {
        const resr = res.result;
        const itCode = resr.itCode;
        const loginName = resr.loginName;
        const productGroup = res.result.productGroup;
        this.$store.dispatch("setProdcutGroup", { productGroup });
        Vue.ls.set("PRODUCTGROUP", productGroup);
        this.$store.dispatch("GetUserInfo", { loginName, itCode });
        Vue.ls.set("LOGINNAME", loginName);
        Vue.ls.set("USER_ITCODE", resr.itCode); // OK
        generatorDynamicRouter({ "pcgcfe-java-token": resr.token })
          // getMenu({ 'llsc-token': resr.token })
          .then(res => this.getMenuSuccess(res))
          .catch(err => this.requestFailed(err))
          .finally(() => {});
      } else {
        this.requestFailed(res.msg);
      }
    },

    getMenuSuccess(res) {
      if (res.code == 0) {
        const result = res.result;
        this.$store.dispatch("SaveMenu", result);
        this.$router.push("/");
        // this.$router.push("/plantMaintenance/plantMaintenance_list");
        // 延迟 1 秒显示欢迎信息
        setTimeout(() => {
          this.$notification.open({
            message: "Welcome",
            description: `${timeFix()}，Welcome back`,
            duration: 6,
            style: { background: "#52C41A" }
          });
        }, 1000);
          setTimeout(() => {
          this.$router.go(0);
        }, 500);
      } else {
        this.requestFailed(res.msg);
      }
    },

    requestFailed(err) {
      console.log(err);
      this.$notification.open({
        message: "error",
        description:
          err || "An error occurred in the request, please try again later",
        duration: 4,
        style: { background: "#F5222D" } //red
      });
    }
  }
};
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
