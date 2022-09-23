<template>
  <div class="register">
    <h2>用户注册</h2>
      <el-form :model="form" ref="form" :rules="rules" :title="action == 'add'">
        <el-form-item prop="username">
            <label class="title">账号</label>
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="nickname">
            <label class="title">昵称</label>
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item prop="password"
        :rules="{required: action === 'add',message:'请输入密码'}"
        >
            <label class="title">密码</label>
          <el-input type="password"
          show-password
          v-model="form.password"
          :placeholder="action === 'add'"
          ></el-input>
        </el-form-item>
        <el-form-item prop="phone">
            <label class="title">手机号</label>
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button type="primary" @click="submit">
          确 定
        </el-button>
        <el-button @click="turn" type="danger">取 消</el-button>
      </div>
  </div>
</template>

<script>
// import { pick, editData, addData, delData } from '@/utils/fn.js'
import { pick, editData, addData } from '@/utils/fn.js'
export default {
  data: function () {
    return {
      rules: {
        username: [{ required: true, message: '请输入账号' }],
        nickname: [{ required: true, message: '请输入昵称' }],
        phone: [{ required: true, message: '请输入手机号' }]
      },
      form: {},
      action: '',
      users: [],
      keywords: '',
      ids: []
    }
  },
  created () {
    this.query()
  },
  methods: {
    // 多选按钮改变时触发
    handleSelectionChange (val) {
      // 获取选中行数据的id，追加到ids数组中
      this.ids = val.map(item => {
        return item.id
      })
    },
    submit () {
      this.$refs.form.validate((vaild) => {
        if (vaild) {
          // 验证通过后的逻辑
          var success = ''
          var data = Object.assign({}, this.form)
          // console.log(data)
          // 如果是修改,则将数据发送至后台,修改完毕返回结果至success变量
          this.action === 'edit' && (success = editData(data, 'users'))
          // 如果是新增,则将数据发送至后台,新增成功/失败返回至success变量
          this.action === 'add' && (success = addData(data, 'users',
            [{ username: '账号' }, { nickname: '昵称' }]))
          // console.log(success)
          // 如果返回的结果err为0,则弹出新增/修改成功消息框
          if (!success.err > 0) {
            this.$message.success(
              `${this.action === 'add' ? '新增' : '注册'}成功！`,
              this.$router.push('/login')
            )
            // 获取最新的数据
            this.query()
            // 关闭弹出框
            this.dialogVisible = false
          } else {
            // 新增失败弹出消息提示框
            this.$message.error(`${success.message}`)
          }
        }
      })
    },
    turn () {
      this.$router.push('/login')
    },
    add () {
      this.action = 'add'
      this.form = {}
    },
    edit (row) {
      console.log(row)
      this.action = 'edit'
      this.dialogVisible = true
      // 从row对象中获取id、username、nickname、phone属性
      this.form = pick(row, [
        'id',
        'username',
        'nickname',
        'phone'
      ])
      console.log(this.form)
    },
    query () {
      this.users = JSON.parse(localStorage.getItem('users'))
      console.log(this.users)
    },
    setDate (row) {
      var date = new Date(row.createDate)
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      return year + '年' + month + '月' + day + '日'
    }
  }
}
</script>

<style scoped>
.register{
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
h2{
  display: inline-block;
  font-weight: 700;color: transparent;
  -webkit-background-clip: text!important;
  font-size: 20px;
  background: linear-gradient(to right, #919da0 30%, #23c3ef 100%);
}
.btn{
  text-align: center;
}
.title {
  display: inline-block;
  font-weight: 700;color: transparent;
  -webkit-background-clip: text!important;
  font-size: 15px;
  background: linear-gradient(to right, #919da0 30%, #23c3ef 100%);
}
</style>
