<template>
  <div class="home">
    <Aside width="230" logo="超市会员管理系统" >
      <router-link to="/home/user"><i class="el-icon-user"></i>用户管理</router-link>
      <router-link to="/home/score"><i class="el-icon-document"></i>会员管理</router-link>
    </Aside>
    <div class="container">
      <!-- 头部栏 -->
      <div class="header">
       <el-dropdown trigger="click" @command="logout">
      <div class="el-dropdown-link info">
        <el-avatar :src="info.avatar"></el-avatar>
        <span class="nickname">{{info.nickname}}</span>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
        <el-dropdown-item icon="el-icon-lock">修改密码</el-dropdown-item>
        <el-dropdown-item icon="el-icon-refresh">系统升级</el-dropdown-item>
        <el-dropdown-item icon="el-icon-switch-button">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
      </div>
      <!-- 内容区域 -->
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Aside from '@/components/aside.vue'
export default {
  components: { Aside },
  data: function () {
    return {
      info: {}
    }
  },
  created () {
    this.info = JSON.parse(sessionStorage.getItem('user'))
    console.log(this.info)
  },
  methods: {
    // 退出登录逻辑
    logout () {
      this.$confirm('是否退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定执行的逻辑
        sessionStorage.removeItem('user')
        this.$message({
          type: 'success',
          message: '退出登录!'
        })
        // 退出登录强制跳转到登录页面
        this.$router.replace('/login')
      })
    }
  }
}
</script>
<style scoped>
.main{
  flex-grow: 1;
  padding: 20px;
}
.active_link{
  background-color: rgba(94, 83, 83, 0.2);
}
.el-dropdown{
  display: flex;
  align-items: center;
  cursor: pointer;
}
.el-dropdown-link{
  display: flex;
  align-items: center;
}
.nickname{
  margin-left: 10px;
}
.container{
  display: flex;
  flex-direction: column;
}
.header{
  padding: 0 30px;
  height: 60px;
  display: flex;
  justify-content: flex-end;
  background-color: white;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, .3);
}
[class^="el-icon"]{
  margin-right: 30px;
}
.home{
  display: flex;
}
.container{
  flex-grow: 1;
}
</style>
