<template>
  <div class="user">
    <el-dialog
      :title="action == 'add' ? '新增' : '修改'"
      :visible.sync="dialogVisible"
      width="350px"
      >
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="卡号" prop="stu_id">
          <el-input v-model="form.stu_id"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
          <!-- <el-form-item label="专业" prop="major_id">
           <el-select ref="majorOption"  size="mini" v-model="form.major_id" placeholder="请选择专业"  @change="setMajor">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
        </el-form-item> -->
        <el-form-item label="手机号" prop="course_id">
          <el-input v-model="form.course_id"></el-input>
            <!-- <el-select ref="courseOption"  size="mini"
            v-model="form.course_id" placeholder="请选择专业"
            @change="setCourse">
                <el-option
                  v-for="item in form_course"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select> -->
        </el-form-item>
        <el-form-item label="地址" prop="score">
          <el-input v-model="form.score"></el-input>
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
      <h2>会员列表</h2>
    </div>
    <div class="search">
      <div>
        <el-input
          placeholder="请输入卡号/姓名"
          v-model="condition.keywords"
          suffix-icon="el-icon-search"
          clearable>
        </el-input>
        <!-- <el-select v-model="condition.majorId" clearable
        placeholder="请选择专业"
        @change="getCourse"
        > -->
          <!-- <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select> -->
        <!-- <el-select v-model="condition.courseId" clearable
        placeholder="请选择课程">
          <el-option
            v-for="item in course"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select> -->
        <!-- <el-button v-show="ids.length===0?false:true"
        type="danger" @click="del(ids)"
        >
        批量删除
        </el-button> -->
      </div>
        <el-button type="danger" @click="add" icon="el-icon-circle-plus-outline">新增</el-button>
    </div>
     <el-table
      style="width: 100%"
      :data="pageData"
      @selection-change="handleSelectionChange"
      stripe
      >
      <!-- <el-table-column type="selection" width="50">
      </el-table-column> -->
      <el-table-column
        sortable
        prop="stu_id"
        label="卡号"
        width="100">
      </el-table-column>
      <el-table-column
        sortable
        prop="name"
        label="姓名">
      </el-table-column>
      <!-- <el-table-column prop="major_name" label="专业">
      </el-table-column> -->

      <el-table-column
        prop="course_id"
        label="手机号">
        <template slot-scope="scope">
        <i class="el-icon-phone"></i>
        <span style="margin-right: 10px">{{ scope.row.course_id }}</span>
      </template>
      </el-table-column>
      <el-table-column
        prop="score"
        label="地址"
      >
      </el-table-column>
      <el-table-column
        label="操作">
        <template v-slot="scope">
          <el-button @click="edit(scope.row)" icon="el-icon-edit">修改</el-button>
          <el-button type="danger" @click="del([scope.row.id])" icon="el-icon-remove-outline">
            删除
          </el-button>
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
import { delData, pick, editData, addData } from '@/utils/fn.js'
export default {
  data: function () {
    return {
      pagation: {
        page: 1,
        perpage: 3
      },
      action: '',
      dialogVisible: false,
      condition: {
        keywords: '',
        courseId: '',
        majorId: ''
      },
      form: {},
      // 配置表单验证规则
      rules: {
        stu_id: { required: true, message: '请输入卡号' },
        name: { required: true, message: '请输入姓名' },
        score: { required: true, message: '请输入分数' },
        major_id: { required: true, message: '请选择专业' },
        course_id: { required: true, message: '请选择课程' }
      },
      stus: [],
      options: [],
      course: [],
      ids: [],
      form_course: [],
      first: ''
    }
  },
  watch: {
    'condition.majorId': function () {
      // 当下拉列表专业改变，使课程列表清空
      this.condition.courseId = null
    },
    'form.major_id': function (val) {
      val = val || true
      this.form_course = this.options.find((item) => {
        return item.value === val
      })
      console.log(this.form_course)
      this.form_course =
        this.form_course ? this.form_course.children : []
      if (!this.first) delete this.form.course_id
      this.first = false
    }
  },
  created () {
    this.query()
  },
  computed: {
    searchData () {
      const { keywords, courseId, majorId } = this.condition
      return this.stus.filter((item) => {
        return (keywords ? ([item.stu_id, item.name].some((i) => {
          return ('' + i).includes(keywords)
        })) : true) &&
        (majorId ? item.major_id === majorId : true) &&
        (courseId ? item.course_id === courseId : true)
      })
    },
    pageData () {
      const start = (this.pagation.page - 1) *
                     this.pagation.perpage
      const end = start + this.pagation.perpage
      return this.searchData.slice(start, end)
    }
  },
  methods: {
    setMajor (val) {
      this.form_course = this.options.find((item) => {
        return item.value === val
      }).children
      this.$nextTick(() => {
        this.$set(this.form, 'major_name',
          this.$refs.majorOption.selectedLabel)
      })
    },
    setCourse (val) {
      this.$set(this.form, 'course_id', val)
      this.$nextTick(() => {
        this.$set(this.form, 'course_name',
          this.$refs.courseOption.selectedLabel)
      })
    },
    handleSelectionChange (val) {
      // 获取选中行数据的id，追加到ids数组中
      this.ids = val.map(item => {
        return item.id
      })
    },
    getCourse (val) {
      if (val) {
        this.course = this.options.find((item) => {
          return item.value === val
        }).children
      }
    },
    add () {
      this.dialogVisible = true
      this.action = 'add'
      this.form = {
        major_id: ''
      }
    },
    edit (row) {
      console.log(row)
      this.dialogVisible = true
      this.action = 'edit'
      this.first = true
      this.form = pick(row, [
        'stu_id',
        'id',
        'name',
        'major_id',
        'major_name',
        'course_id',
        'course_name',
        'score'
      ])
    },
    submit () {
      this.$refs.form.validate((vaild) => {
        if (vaild) {
          // 验证通过后的逻辑
          var success = ''
          var data = Object.assign({}, this.form)
          console.log(data)
          // 如果是修改,则将数据发送至后台,修改完毕返回结果至success变量
          this.action === 'edit' && (success = editData(data, 'stuTab'))
          // 如果是新增,则将数据发送至后台,新增成功/失败返回至success变量
          this.action === 'add' && (success = addData(data, 'stuTab'))
          console.log(success)
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
    del (ids) {
      this.$confirm('您确定要删除所选数据吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 传入需要删除数据的id，在localstorage的stuTab进行删除
        delData(ids, 'stuTab')
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        // 删除成功获取最新的数据
        this.query()
      })
    },
    query () {
      var tree = JSON.parse(localStorage.getItem('courseTree'))
      this.stus = JSON.parse(localStorage.getItem('stuTab'))
      this.options = this.getOption(tree)
      console.log(tree)
      console.log(this.options)
      // console.log(this.stus)
    },
    // 将后台数据转换成selection使用的数据
    getOption (data, result = []) {
      for (var key in data) {
        var val = data[key]
        if (val instanceof Object) {
          result[key] = Array.isArray(val) ? [] : {}
          this.getOption(val, result[key])
        } else {
          if (key.indexOf('id') !== -1) result.value = val
          if (key.indexOf('name') !== -1) result.label = val
        }
      }
      return result
    }
  }
}
</script>

<style scoped>
.el-input,.el-select{
  width: 200px;
  margin-left: 35px;
}
.header{
  margin-bottom: 20px;
}
.search{
  display: flex;
  justify-content: space-between;
}
.user{
  padding: 20px;
  background-color: white;
}
.el-button{
  margin: 10px;
}
.el-form-item{
  display: flex;
  justify-content: flex-end;
}
.el-form-item__label{
  margin-right: 20px;
}

</style>
