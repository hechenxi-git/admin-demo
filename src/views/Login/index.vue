<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          :class="{'active': item.id === activeID }"
          v-for="item in menuTab"
          :key="item.id"
          @click="toggleMenu(item)"
        >{{item.text}}</li>
      </ul>
      <!-- 表单 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :label-position="labelPosition"
        size="medium"
        :hide-required-asterisk="false"
      >
        <el-form-item
          label="邮箱"
          prop="email"
          :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
        >
          <el-input v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            minlength="6"
            maxlength="20"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item v-show="model === 'register'" label="重复密码" prop="rePw">
          <el-input
            type="password"
            minlength="6"
            maxlength="20"
            v-model="ruleForm.rePw"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="captcha">
          <el-row :gutter="16">
            <el-col :span="15">
              <el-input minlength="6" v-model="ruleForm.captcha"></el-input>
            </el-col>
            <el-col :span="6">
              <el-button type="success">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="form-submit">
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  stripscript,
  validateEmail,
  validatePassword,
  validateCaptche
} from "@/utils/validate";
export default {
  data() {
    // 验证密码
    const validatePass = (rule, value, callback) => {
      stripscript(value);
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePassword(value)) {
        callback(new Error("密码为6-20位的数字+字母"));
      } else {
        callback();
      }
    };
    // 重复密码
    const validateRePw = (rule, value, callback) => {
      if (this.model === "login") {callback();}
      console.log("222");
      stripscript(value);
      if (value === "") {
        callback(new Error("请再次确认密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入的密码不一致！"));
      } else {
        callback();
      }
    };
    // 验证码
    const checkCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (validateCaptche(value)) {
        callback(new Error("验证码有误"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        email: "",
        password: "",
        captcha: "",
        rePw: ""
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        captcha: [{ validator: checkCode, trigger: "blur" }],
        rePw: [{ validator: validateRePw, trigger: "blur" }]
      },
      labelPosition: "top",
      menuTab: [
        { text: "登录", id: 1, type: "login" },
        { text: "注册", id: 2, type: "register" }
      ],
      activeID: 1,
      model: "login"
    };
  },
  methods: {
    toggleMenu(item) {
      this.activeID = item.id;
      this.model = item.type;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../../styles/login/index.scss";
</style>