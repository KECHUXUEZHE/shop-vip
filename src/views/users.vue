<template>
  <div class="user">
    <el-dialog
      :title="action == 'add' ? '新增' : '修改'"
      :visible.sync="dialogVisible"
      width="350px"
      >
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password"
        :rules="{required: action === 'add',message:'请输入密码'}"
        >
          <el-input type="password"
          show-password
          v-model="form.password"
          :placeholder="action === 'edit'?'不修改则保持为空!':''"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <div class="header">
      <h2>用户列表</h2>
    </div>
    <div class="search">
      <div>
        <el-input
          placeholder="请输入用户名/昵称/手机号"
          v-model.trim="keywords"
          suffix-icon="el-icon-search"
          clearable>
        </el-input>
        <!-- <el-button v-show="ids.length===0?false:true"
        type="danger" @click="del(ids)"
        >
        批量删除
        </el-button> -->
      </div>
        <el-button type="primary" @click="add" icon="el-icon-circle-plus-outline" style="margin-top: 0;">新增</el-button>
    </div>
     <el-table
      :data="pageData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      stripe
      >
      <!-- <el-table-column type="selection" width="50">
      </el-table-column> -->
      <el-table-column
        prop="avatar"
        label="头像"
        width="70">
        <template v-slot="scope">
          <el-avatar :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="username"
        label="账号"
        width="100">
      </el-table-column>
      <el-table-column
        sortable
        prop="nickname"
        label="昵称">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号">
        <template slot-scope="scope">
        <i class="el-icon-phone"></i>
        <span style="margin-right: 10px">{{ scope.row.phone }}</span>
      </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="createDate"
        :formatter="setDate"
        label="注册时间">
      </el-table-column>

      <el-table-column
        label="操作">
        <template v-slot="scope">
          <el-button @click="edit(scope.row)" icon="el-icon-edit" type="success">修改</el-button>
          <el-button type="danger" @click="del([scope.row.id])" icon="el-icon-remove-outline">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next ,sizes"
      :total="searchData.length"
      :page-sizes="[1, 3, 5, 10]"
      :page-size.sync="pagation.perpage"
      :current-page.sync="pagation.page"
      >
    </el-pagination>
  </div>
</template>

<script>
import { pick, editData, addData, delData } from '@/utils/fn.js'
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
      dialogVisible: false,
      users: [],
      keywords: '',
      pagation: {
        // 当前选中页
        page: 1,
        // 每页记录数
        perpage: 3
      },
      // 存储批量删除多选时数据的id
      ids: []
    }
  },
  created () {
    this.query()
  },
  computed: {
    searchData () {
      return this.users.filter((item) => {
        return (this.keywords
          ? ([item.username, item.nickname, item.phone].some((i) => {
            return ('' + i).includes(this.keywords)
          })) : true)
      })
    },
    pageData () {
      const start = (this.pagation.page - 1) * this.pagation.perpage
      const end = start + this.pagation.perpage
      // 在搜索的基础上进行分页
      return this.searchData.slice(start, end)
    }
  },
  methods: {
    // 多选按钮改变时触发
    handleSelectionChange (val) {
      // 获取选中行数据的id，追加到ids数组中
      this.ids = val.map(item => {
        return item.id
      })
      // console.log(this.ids)
    },
    // tableRowClassName({row, rowIndex}) {
    //     if (rowIndex === 1) {
    //       return 'warning-row';
    //     } else if (rowIndex === 3) {
    //       return 'success-row';
    //     }
    //     return '';
    //   },
    del (ids) {
      // console.log(ids)
      this.$confirm('您确定要删除所选数据吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delData(ids, 'users')
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        // 删除成功获取最新的数据
        this.query()
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
              `${this.action === 'add' ? '新增' : '修改'}成功！`
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
    add () {
      this.action = 'add'
      this.dialogVisible = true
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
.el-input{
  width: 200px;
  margin-left: 1050px;
}
.header{
  margin-bottom: 20px;
}
.search{
  display: flex;
  justify-content: end;
}
.user{
  padding: 20px;
  background-color: white;
}
h2 {
  display: inline-block;
  font-weight: 700;color: transparent;
  -webkit-background-clip: text!important;
  font-size: 40px;
  background: linear-gradient(to left, rgb(132, 167, 212) 40% ,#ccc 100%);
}
.el-button{
  margin: 10px 10px 10px 10px ;
}
.el-form-item{
  display: flex;
  justify-content: flex-end;
}
.el-form-item__label{
  margin-right: 20px;
}
.el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
.el-pagination {
  margin-top: 10px;
  margin-left: 1100px;
}
</style>
