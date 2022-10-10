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

    <!--新增机构与编辑机构弹窗-->
    <DiaLog :height="addDialog.height" :title="addDialog.title" :visible="addDialog.visible" :width="addDialog.width"
            @close="handleClose"
            @confirm="handleConfirm">
      <div slot="content">
        <el-form ref="departmentDialogForm" :inline="true" :model="departmentDialogForm" :rules="dialogRules"
                 label-width="80px"
                 size="small">
          <el-form-item label="上级部门" prop="parentName">
            <el-input v-model="departmentDialogForm.parentName" @click.native="handleSelectDepartment"></el-input>
          </el-form-item>
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="departmentDialogForm.name"></el-input>
          </el-form-item>
          <el-form-item label="部门编码">
            <el-input v-model="departmentDialogForm.deptCode"></el-input>
          </el-form-item>
          <el-form-item label="部门电话">
            <el-input v-model="departmentDialogForm.deptPhone"></el-input>
          </el-form-item>
          <el-form-item label="部门经理">
            <el-input v-model="departmentDialogForm.manager"></el-input>
          </el-form-item>
          <el-form-item label="部门地址">
            <el-input v-model="departmentDialogForm.deptAddress"></el-input>
          </el-form-item>
          <el-form-item label="部门序号">
            <el-input v-model="departmentDialogForm.orderNum"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </DiaLog>

    <!--选择机构弹窗-->
    <DiaLog :height="selectDialog.height" :title="selectDialog.title" :visible="selectDialog.visible"
            :width="selectDialog.width" @close="handleSelectClose"
            @confirm="handleSelectConfirm">
      <div slot="content">
        <el-tree ref="parentTree" :data="parentDepartmentList" :expand-on-click-node="false" :props="defaultProps"
                 default-expand-all highlight-current
                 node-key="id"
                 @node-click="handleNodeClick">
          <div slot-scope="{ node,data }">
            <span v-if="data.children.length === 0">
              <i class="el-icon-document" style="margin-right: 3px"></i>
            </span>
            <span v-else @click="handleOpenBtn(data)">
              <i v-if="data.open" class="iconfont icon-jia"></i>
              <i v-else class="iconfont icon-jian"></i>
            </span>
            <span>{{ node.label }}</span>
          </div>
        </el-tree>
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
      // 自定以渲染的字段
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      departmentList: [],
      departmentForm: {
        parentName: '',
        name: '',
        deptCode: '',
        deptPhone: '',
        manager: '',
        deptAddress: '',
        orderNum: '',
        id: '',
        pid: ''
      },
      departmentDialogForm: {},
      dialogRules: {
        parentName: [
          { required: true, message: '请选择上级部门', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请填写部门名称', trigger: 'blur' }
        ]
      },
      addDialog: {
        title: '新增部门',
        width: 620,
        height: 200,
        visible: false
      },
      selectDialog: {
        title: '选择上级机构',
        width: 300,
        height: 480,
        visible: false
      },
      parentDepartmentList: []

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
      this.addDialog.visible = false
    },
    handleConfirm() {
      this.$refs.departmentDialogForm.validate(valid => {
        if (valid) {
          console.log('departmentForm=>', this.departmentDialogForm)
        }
      })

      this.addDialog.visible = false
    },
    handleOpenDialog() {
      this.addDialog.visible = true
    },
    // 选择机构
    handleSelectDepartment() {
      this.getParentDepartment()
      this.selectDialog.visible = true
    },
    // 获取上级部门列表
    async getParentDepartment() {
      try {
        const { data } = await departmentApi.getParentDepartment()
        console.log('上级', data)
        this.parentDepartmentList = data
      } catch (e) {
        console.log(e.message)
      }
    },
    // 点击el-tree节点会触发的方法
    handleNodeClick(data) {
      this.departmentDialogForm.parentName = data.name
      this.departmentDialogForm.pid = data.id

      console.log(this.departmentDialogForm)
    },
    // 点击el-tree自定义图标会触发的方法
    handleOpenBtn(data) {
      console.log(data)
      data.open = !data.open

      console.log('--', this.$refs.parentTree)
      this.$refs.parentTree.store.nodesMap[data.id].expanded = !data.open
    },
    // 关闭选择机构弹窗
    handleSelectClose() {
      this.selectDialog.visible = false
    },
    // 点击选择机构弹窗的确定按钮
    handleSelectConfirm() {
      this.selectDialog.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.department {
  padding: 20px;
}

::v-deep .el-tree {

  .el-tree-node__content > .el-tree-node__expand-icon {
    display: none;
  }
}

</style>
