<template>
  <div class="login">
    <h1>用户登录</h1>
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="账号" prop="username">
        <el-input v-model.trim="form.username"></el-input>
      </el-form-item>
      <el-form-item  label="密码" prop="password">
        <el-input type="password" v-model.trim="form.password">
        </el-input>
      </el-form-item>
      <div class="btn">
        <el-button type="primary" @click="submitForm('form')">
          登录
        </el-button>
        <el-button type="danger">注册</el-button>
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
  background-color: white;
}
.btn{
  text-align: center;
}
</style>
