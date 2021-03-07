<template>
  <div class="app-container">
    <el-divider content-position="left">操作</el-divider>
    <el-button type="primary" icon="el-icon-edit" @click="dialogFormVisible = true">添加用户</el-button>
    <el-divider content-position="left">查询条件</el-divider>
    <el-form :inline="true" :model="SeachModel" class="demo-form-inline">
      <el-form-item label="关键字查询：" label-width="100">
        <el-input v-model="SeachModel.KeyWord" placeholder="请输入关键字查询" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-divider content-position="left">列表内容</el-divider>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="编号" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="账户">
        <template slot-scope="scope">
          {{ scope.row.account }}
        </template>
      </el-table-column>
      <el-table-column label="昵称">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="注册时间">
        <template slot-scope="scope">
          {{ scope.row.createdTime }}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form ref="UserModel" :model="UserModel" :rules="rules">
        <el-form-item label="账户名" :label-width="formLabelWidth" prop="account">
          <el-input v-model="UserModel.account" autocomplete="off" />
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="nickname">
          <el-input v-model="UserModel.nickname" autocomplete="off" />
        </el-form-item>
        <el-form-item label="账户登录密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="UserModel.password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio-group v-model="UserModel.gender">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('UserModel')">添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, InserUser } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 0,
      // 个数选择器（可修改）
      pageSizes: [10, 15, 20, 30],
      // 默认每页显示的条数（可修改）
      pageSize: 10,
      formLabelWidth: '120px',
      dialogFormVisible: false,
      SeachModel: {
        KeyWord: null
      },
      UserModel: {
        account: null,
        nickname: null,
        password: null,
        gender: null
      },
      rules: {
        account: [
          { required: true, message: '请输入账户名', trigger: 'blur' },
          { min: 2, max: 32, message: '长度在 2 到 32 个字符', trigger: 'blur' }
        ],
        nickname: [
          { min: 0, max: 32, message: '长度在32个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 32, message: '密码长度在6-32个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList({ PageIndex: this.currentPage, PageSize: this.pageSize, KeyWord: this.SeachModel.KeyWord }).then(
        (response) => {
          this.list = response.data.items
          this.totalCount = response.data.totalCount
          this.listLoading = false
        }
      )
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.currentPage = 1
      this.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    },
    onSubmit() {
      this.fetchData()
    },
    submitForm(val) {
      this.$refs[val].validate((valid) => {
        if (valid) {
          InserUser(this.UserModel).then(
            (response) => {
              console.log(response)
            }
          )
        } else {
          return false
        }
      })
    }
  }
}
</script>
