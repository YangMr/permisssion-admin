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
          <el-button size="mini" type="primary" @click="handleEditOpenDialog(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
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
              <i style="margin-right: 3px" v-if="data.open" class="iconfont icon-jia"></i>
              <i style="margin-right: 3px" v-else class="iconfont icon-jian"></i>
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
import _ from 'lodash'

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
      departmentForm: {},
      departmentDialogForm: {
        parentName: '',
        name: '',
        deptCode: '',
        deptPhone: '',
        manager: '',
        deptAddress: '',
        orderNum: '',
        id: '',
        pid: '',
        editType: '0'
      },
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
    handleEditOpenDialog(row) {
      const data = _.cloneDeep(row)
      this.departmentDialogForm = data
      this.departmentDialogForm.editType = '1'
      console.log(this.departmentDialogForm)
      this.addDialog.title = '编辑机构'

      this.addDialog.visible = true
    },
    // 删除机构
    async handleDelete(id) {
      try {
        const res = await this.$util.confirm('确定删除该数据吗?')
        if (res) {
          const response = await departmentApi.deleteDepartment(id)
          if (response.code === 200) {
            this.$message.success(response.msg)
            this.getDepartmentList()
          }
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleReset() {
      this.$refs.queryForm.resetFields()
    },
    handleClose() {
      this.addDialog.visible = false
    },
    handleConfirm() {
      this.$refs.departmentDialogForm.validate(async valid => {
        if (valid) {
          console.log('departmentForm=>', this.departmentDialogForm)
          let response
          if (this.departmentDialogForm.editType === '0') {
            try {
              response = await departmentApi.addDepartment(this.departmentDialogForm)
            } catch (e) {
              console.log()
            }
          } else {
            try {
              response = await departmentApi.editDepartment(this.departmentDialogForm)
            } catch (e) {
              console.log(e.message)
            }
          }

          if (response.code === 200) {
            this.$message.success(response.msg)
            this.getDepartmentList()
          }
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

  .el-tree-node {
    position: relative;
    padding-left: 10px;
  }

  .el-tree-node__children {
    padding-left: 20px;
  }

  .el-tree-node :last-child:before {
    height: 40px;
  }

  .el-tree > .el-tree-node:before {
    border-left: none;
  }

  .el-tree > .el-tree-node:after {
    border-top: none;
  }

  .el-tree-node:before,
  .el-tree-node:after {
    content: "";
    left: -4px;
    position: absolute;
    right: auto;
    border-width: 1px;
  }

  .tree :first-child .el-tree-node:before {
    border-left: none;
  }

  // 竖线
  .el-tree-node:before {
    border-left: 1px dotted #d9d9d9;
    bottom: 0px;
    height: 100%;
    top: -25px;
    width: 1px;
  }

  //横线
  .el-tree-node:after {
    border-top: 1px dotted #d9d9d9;
    height: 20px;
    top: 14px;
    width: 24px;
  }

  .el-tree-node__expand-icon.is-leaf {
    width: 8px;
  }

  .el-tree-node__content > .el-tree-node__expand-icon {
    display: none;
  }

  //每一行的高度
  .el-tree-node__content {
    line-height: 30px;
    height: 30px;
    padding-left: 10px !important;
  }
}

//去掉最上级的before  after 即是去电最上层的连接线
::v-deep .el-tree > div {
  &::before {
    display: none;
  }

  &::after {
    display: none;
  }
}

</style>
