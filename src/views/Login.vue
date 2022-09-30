<template>
  <div class="login-container">
    <el-form ref="form" :model="loginForm" size="medium">
      <el-form-item>
        <div class="login-title">系统登录</div>
      </el-form-item>
      <el-form-item>
        <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="loginForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-input v-model="loginForm.code" placeholder="请输入验证码"></el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="loginForm.code" placeholder="请输入验证码"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-button class="btn" type="primary">登录</el-button>
          </el-col>
          <el-col :span="12">
            <el-button class="btn">重置</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {}
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
  }
}
</style>
