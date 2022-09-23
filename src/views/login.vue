<template>
  <div class="login">
    <div class="h1">用户登录</div>
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item prop="username">
        <label class="title">账号 </label>
        <el-input v-model.trim="form.username"></el-input>
      </el-form-item>
      <el-form-item   prop="password">
        <label class="title">密码</label>
        <el-input type="password" v-model.trim="form.password">
        </el-input>
      </el-form-item>
      <div class="btn">
        <el-button type="primary" @click="submitForm('form')">
          登录
        </el-button>
        <el-button type="danger" @click="turn">注册</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: null,
        password: null
      },
      rules: {
        username: { required: true, message: '请输入账号!' },
        password: { required: true, message: '请输入密码!' }
      }
    }
  },
  methods: {
    submitForm (formName) {
      // 表单验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证通过时执行的逻辑
          var users = JSON.parse(localStorage.getItem('users'))
          const { username, password } = this.form
          // 验证用户密码是否匹配
          const user = users.find(function (item) {
            return item.username === username &&
                   item.password === password
          })
          if (user) {
            // 匹配成功的逻辑
            sessionStorage.setItem('user', JSON.stringify(user))
            this.$message.success('登录成功!')
            this.$router.replace('/home')
          } else {
            // 匹配失败的逻辑
            this.$message.error('账号或密码错误!')
          }
        } else {
          // 验证失败时执行的逻辑
          console.log('error submit!!')
          return false
        }
      })
    },
    turn () {
      this.$router.push('/register')
    }
  }
}
</script>
<style scoped>
.login{
  width: 320px;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  background: linear-gradient(to bottom, #fff0f0 50%, #8ee1f8 100%);
  /* color: white; */
}
.h1{
  display: inline-block;
  font-weight: 700;color: transparent;
  -webkit-background-clip: text!important;
  font-size: 20px;
  background: linear-gradient(to right, #919da0 30%, #23c3ef 100%);
}
.title {
  display: inline-block;
  font-weight: 700;color: transparent;
  -webkit-background-clip: text!important;
  font-size: 15px;
  background: linear-gradient(to right, #919da0 30%, #23c3ef 100%);
}
.btn{
  text-align: center;
}
label {
  color: white;
}
</style>
