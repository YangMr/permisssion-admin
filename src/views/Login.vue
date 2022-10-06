<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="rules" size="medium">
      <el-form-item>
        <div class="login-title">系统登录</div>
      </el-form-item>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-row :gutter="20">
          <el-col :span="16">
            <el-input v-model="loginForm.code" placeholder="请输入验证码"></el-input>
          </el-col>
          <el-col :span="8">
            <img :src="this.captureUrl" alt="图片验证码" class="capture" @click="getCapture">
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-button class="btn" type="primary" @click="handleSubmit">登录</el-button>
          </el-col>
          <el-col :span="12">
            <el-button class="btn" @click="handleReset">重置</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import loginApi from '../api/login'

export default {
  name: 'Login',
  data() {
    return {
      captureUrl: '',
      loginForm: {
        username: '',
        password: '',
        code: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'change'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'change'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'change'
          }
        ]
      }
    }
  },
  created() {
    this.getCapture()
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.handleLogin()
        }
      })
    },
    handleReset() {
      this.$refs.loginForm.resetFields()
    },
    async handleLogin() {
      try {
        await this.$store.dispatch('User/handleLogin', this.loginForm)
        this.$router.push('/')
      } catch (e) {
        this.$message.error(e.message)
        console.log(e)
      }
    },
    async getCapture() {
      try {
        const response = await loginApi.getCapture()
        // 获取图片的数据流
        const arrayBuffer = response

        // 定义base64
        const imageData = 'data:image/png;base64,' + btoa(new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ''))
        // 将base64图片赋值给 保存验证码的变量
        this.captureUrl = imageData
      } catch (e) {
        this.$message.error(e.message)
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .el-form {
    width: 350px;
    height: 300px;
    border-radius: 10px;
    box-shadow: 0 0 25px #cac6c6;
    padding: 20px 35px;

    .login-title {
      font-weight: 600;
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .btn {
      width: 100%;
    }

    .capture {
      height: 36px;
      width: 100px;
    }
  }
}
</style>
