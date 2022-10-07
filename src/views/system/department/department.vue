<template>
  <div class="department">
    <el-form ref="queryForm" :inline="true" :model="departmentForm" class="demo-form-inline" size="mini">
      <el-form-item prop="user">
        <el-input v-model="departmentForm.user" placeholder="请输入部门名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search">查询</el-button>
        <el-button icon="el-icon-close" style="color:#f60" @click="handleReset">重置</el-button>
        <el-button icon="el-icon-plus" type="primary" @click="handleOpenDialog">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="departmentList"
      :tree-props="{children: 'children'}"
      border
      default-expand-all
      height="430px"
      row-key="id"
      stripe
      style="width: 100%;margin-bottom: 20px;">
      <el-table-column label="部门名称" prop="name"></el-table-column>
      <el-table-column label="部门编码" prop="deptCode"></el-table-column>
      <el-table-column label="部门电话" prop="deptPhone"></el-table-column>
      <el-table-column label="部门地址" prop="deptAddress"></el-table-column>
      <el-table-column label="序号" prop="orderNum"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <DiaLog :height="height" :title="title" :visible="visible" :width="width" @close="handleClose"
            @confirm="handleConfirm">

      <div slot="content">
        <el-form :inline="true" :model="departmentDialogForm">
          <el-form-item label="审批人">
            <el-input v-model="departmentDialogForm.user" placeholder="审批人"></el-input>
          </el-form-item>
        </el-form>
      </div>

    </DiaLog>
  </div>
</template>

<script>
import departmentApi from '../../../api/department'
import DiaLog from '../../../components/DiaLog'

export default {
  name: 'DepartmentList',
  data() {
    return {
      departmentList: [],
      departmentForm: {},
      departmentDialogForm: {},
      title: '新增部门',
      width: '400',
      height: 200,
      visible: false
    }
  },
  components: {
    DiaLog
  },
  created() {
    this.getDepartmentList()
  },
  methods: {
    async getDepartmentList() {
      try {
        const { data } = await departmentApi.getDepartmentList()
        this.departmentList = data
        // this
      } catch (e) {
        console.log(e.message)
      }
    },
    handleEdit() {

    },
    handleDelete() {

    },
    handleReset() {
      this.$refs.queryForm.resetFields()
    },
    handleClose() {
      this.visible = false
    },
    handleConfirm() {
      alert('确定')
      this.visible = false
    },
    handleOpenDialog() {
      this.visible = true
    }
  }
}
</script>

<style scoped>
.department {
  padding: 20px;
}
</style>
