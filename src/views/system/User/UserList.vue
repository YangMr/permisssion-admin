<template>
  <el-container>
    <el-aside width="220px">
      <el-tree ref="tree" :expand-on-click-node="false" @node-click="handleNodeClick" default-expand-all node-key="id"
               :data="departmentList"
               :props="defaultProps"
      >
        <div slot-scope="{node,data}">
          <span v-if="data.children.length === 0">
            <i class="el-icon-document"></i>
          </span>
          <span v-else @click="handleOpenNode(data)">
            <i v-if="data.open" class="iconfont icon-jia"></i>
            <i v-else class="iconfont icon-jian"></i>
          </span>
          <span>{{ node.label }}</span>
        </div>
      </el-tree>
    </el-aside>
    <el-main>
      <el-form size="small" ref="queryForm" label-width="80px" :inline="true" :model="queryForm"
               class="demo-form-inline">
        <el-form-item label="用户名" prop="loginName">
          <el-input v-model="queryForm.loginName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" @click="handleQuery">查询</el-button>
          <el-button icon="el-icon-delete" style="color : #f60" @click="handleReset">重置</el-button>
          <el-button icon="el-icon-plus" type="primary" @click="handleOpen">新增</el-button>
        </el-form-item>
      </el-form>

      <el-table
        :data="userList"
        height="450"
        stripe
        border
        style="width: 100%">
        <el-table-column prop="loginName" label="用户名"></el-table-column>
        <el-table-column prop="deptName" label="所属部门"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column label="操作" width="290">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEditOpen(scope.row)">编辑</el-button>
            <el-button size="mini" type="primary" icon="el-icon-setting">分配角色</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row.id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="userParams.currentPage"
        :page-size="userParams.pageSize"
        layout="total,prev, pager, next, jumper"
        :total="total">
      </el-pagination>

      <Dialog :title="addDialogParams.title" :width="addDialogParams.width" :visible="addDialogParams.visible"
              :height="addDialogParams.height" @close="handleClose" @confirm="handleConfirm">
        <div slot="content">
          <el-form ref="dialogForm" size="small" :rules="dialogRules" label-width="80px" :inline="true"
                   :model="addDialogForm"
                   class="demo-form-inline">
            <el-form-item label="所属部门" prop="deptName">
              <el-input @click.native="handleOpenTree" v-model="addDialogForm.deptName"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="username">
              <el-input v-model="addDialogForm.username"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="mobile">
              <el-input v-model="addDialogForm.mobile"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickName">
              <el-input v-model="addDialogForm.nickName"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="addDialogForm.email"></el-input>
            </el-form-item>
            <el-form-item label="登录名" prop="loginName">
              <el-input v-model="addDialogForm.loginName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="addDialogForm.password"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="addDialogForm.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
      </Dialog>

      <Dialog :title="treeDialogParams.title" :width="treeDialogParams.width" :visible="treeDialogParams.visible"
              :height="treeDialogParams.height" @close="handleTreeClose" @confirm="handleTreeConfirm"

      >

        <div slot="content">
          <el-tree @node-click="handleParentClick" default-expand-all node-key="id" ref="departmentTree"
                   :expand-on-click-node="false"
                   :data="parentDepartmentList" :props="defaultProps">
            <div slot-scope="{node,data}">
              <span v-if="data.children.length === 0">
                <i class="el-icon-document"></i>
              </span>
              <span v-else @click="handleOpenParent(data)">
                <i v-if="data.open" class="iconfont icon-jia"></i>
                <i v-else class="iconfont icon-jian"></i>
              </span>
              <span>{{ node.label }}</span>
            </div>
          </el-tree>
        </div>

      </Dialog>
    </el-main>
  </el-container>
</template>

<script>
import departmentApi from '../../../api/department'
import userApi from '../../../api/user'
import Dialog from '../../../components/DiaLog'

export default {
  name: 'UserList',
  components: {
    Dialog
  },
  data() {
    return {
      // 设置el-tree默认要渲染的字端
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // 部门列表数据
      departmentList: [],
      // 用户列表数据
      userList: [],
      // 用户列表参数
      userParams: {
        deptId: '',
        currentPage: 1,
        pageSize: 2
      }, // 保存用户列表的总条数
      total: 0,
      // 用来保存查询表单输入的数据
      queryForm: {
        loginName: ''
      },
      // 新增用户弹窗参数
      addDialogParams: {
        title: '用户新增',
        visible: false,
        width: 610,
        height: 230
      },
      // tree弹窗仓库
      treeDialogParams: {
        title: '选择上级部门',
        visible: false,
        width: 300,
        height: 450
      },
      // 保存弹窗表单输入的数据
      addDialogForm: {
        deptId: 0,
        deptName: '',
        email: '',
        id: '',
        loginName: '',
        mobile: '',
        nickName: '',
        password: '',
        sex: '',
        type: '0', // 0 新增 1 编辑
        username: ''
      },
      // 校验弹窗表单
      dialogRules: {
        deptName: [{ required: true, message: '请选择上级部门', trigger: 'change' }],
        username: [{ required: true, message: '请填写姓名', trigger: 'change' }],
        mobile: [{ required: true, message: '请填写电话', trigger: 'change' }],
        loginName: [{ required: true, message: '请填写登录名', trigger: 'change' }],
        password: [{ required: true, message: '请填写登录密码', trigger: 'change' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }]
      },
      // 保存上级部门列表
      parentDepartmentList: []
    }
  },
  async created() {
    await this.getDepartmentList()
    await this.getUserList()
  },
  methods: {
    // 获取部门列表方法
    async getDepartmentList() {
      const { code, data } = await departmentApi.getDepartmentList()
      if (code === 200) {
        this.departmentList = data
        this.userParams.deptId = data[0].id
      }
    },
    // 获取用户列表方法
    async getUserList() {
      try {
        const obj = { ...this.userParams, ...this.queryForm }
        console.log(obj)
        const { code, data } = await userApi.getUserList(obj)
        console.log('response', data)
        if (code === 200) {
          this.userList = data.records
          this.total = data.total
        }
      } catch (e) {
        console.log(e.message)
      }
    },
    // 点击el-tree阶段的时候会触发的方法
    handleNodeClick(data) {
      this.userParams.deptId = data.id
      this.getUserList()
    },
    // 点击加减号图标会触发的方法
    handleOpenNode(data) {
      data.open = !data.open
      this.$refs.tree.store.nodesMap[data.id].expanded = !data.open
    },
    // 条数发生变化会触发的方法
    handleSizeChange(size) {
      this.userParams.pageSize = size
      this.getUserList()
    },
    // 页码发生变化会触发的方法
    handleCurrentChange(page) {
      this.userParams.currentPage = page
      this.getUserList()
    },
    // 删除用户方法
    async handleDelete(id) {
      try {
        const res = await this.$util.confirm('确定删除该数据吗？')
        if (res) {
          const { code, msg } = await userApi.deleteUser(id)
          if (code === 200) {
            this.$message.success(msg)
            this.getUserList()
          }
        }
      } catch (e) {
        console.log(e.message)
      }
    },
    // 查询用户方法
    handleQuery() {
      this.currentPage = 1
      this.getUserList()
    },
    // 查询表单重置方法
    handleReset() {
      this.$refs.queryForm.resetFields()
      this.getUserList()
    },
    // 打开新增用户弹窗方法
    handleOpen() {
      this.addDialogParams.title = '新增用户'
      this.addDialogParams.visible = true
    },
    // 打开编辑用户弹窗方法
    handleEditOpen(row) {
      this.addDialogParams.title = '编辑用户'
      this.addDialogParams.visible = true
      this.addDialogForm = row
    },
    // 关闭弹窗
    handleClose() {
      this.addDialogParams.visible = false
    },
    // 点击弹窗确定按钮触发的方法
    handleConfirm() {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          console.log(this.addDialogForm)
          if (!this.addDialogForm.id) {
            this.handleAdd()
          } else {
            this.handleEdit()
          }

          this.addDialogParams.visible = false
        }
      })
    },
    // 新增用户方法
    async handleAdd() {
      try {
        const { code } = await userApi.addUser(this.addDialogForm)
        if (code === 200) {
          this.addDialogParams.visible = false
          await this.getUserList()
          this.$message.success('新增成功')
        }
      } catch (e) {
        console.log(e.message)
      }
    },
    // 编辑用户方法
    async handleEdit() {
      try {
        const { code } = await userApi.editUser(this.addDialogForm)
        if (code === 200) {
          this.addDialogParams.visible = false
          await this.getUserList()
          this.$message.success('编辑成功')
        }
      } catch (e) {
        console.log(e.message)
      }
    },
    // 打开tree弹窗
    async handleOpenTree() {
      try {
        const { data, code } = await departmentApi.getParentDepartment()
        if (code === 200) {
          this.parentDepartmentList = data
        }
        this.treeDialogParams.visible = true
      } catch (e) {
        console.log(e.message)
      }
    },
    // 控制展开收起 / 切换展开收起图标
    handleOpenParent(data) {
      data.open = !data.open
      this.$refs.departmentTree.store.nodesMap[data.id].expanded = !data.open
    },
    handleParentClick(data) {
      console.log(data.id)
      console.log(data)
      this.addDialogForm.deptId = data.id
      this.addDialogForm.deptName = data.name
      // this.treeDialogParams.visible = false
    },
    handleTreeClose() {
      this.treeDialogParams.visible = false
    },
    handleTreeConfirm() {
      this.treeDialogParams.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
}

.el-aside {
  height: 100%;
  padding: 10px 0px 0px 0px;
  border-right: 1px solid #ddd;

}

.el-main {
  height: 100%;
}

.el-aside ::v-deep .el-tree, .el-main ::v-deep .el-tree {
  // 将每一行的设置为相对定位 方便后面before after 使用绝对定位来固定位置
  .el-tree-node {
    position: relative;
    // padding-left: 10px;
  }

  // 子集像右偏移 给数线留出距离
  .el-tree-node__children {
    padding-left: 20px;
  }

  //这是竖线
  .el-tree-node :last-child:before {
    height: 40px;
  }

  .el-tree > .el-tree-node:before {
    border-left: none;
  }

  .el-tree > .el-tree-node:after {
    border-top: none;
  }

  //这自定义的线 的公共部分
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
    border-left: 1px solid #d9d9d9;
    bottom: 0px;
    height: 100%;
    top: -25px;
    width: 1px;
  }

  //横线
  .el-tree-node:after {
    border-top: 1px solid #d9d9d9;
    height: 20px;
    top: 14px;
    width: 12px;
  }

  .el-tree-node__expand-icon.is-leaf {
    width: 8px;
  }

  //去掉elementui自带的展开按钮  一个向下的按钮,打开时向右
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
.el-aside ::v-deep .el-tree > div {
  &::before {
    display: none;
  }

  &::after {
    display: none;
  }
}

.el-dialog__wrapper ::v-deep .el-tree {
  // 将每一行的设置为相对定位 方便后面before after 使用绝对定位来固定位置
  .el-tree-node {
    position: relative;
    padding-left: 10px;
  }

  // 子集像右偏移 给数线留出距离
  .el-tree-node__children {
    padding-left: 20px;
  }

  //这是竖线
  .el-tree-node :last-child:before {
    height: 40px;
  }

  .el-tree > .el-tree-node:before {
    border-left: none;
  }

  .el-tree > .el-tree-node:after {
    border-top: none;
  }

  //这自定义的线 的公共部分
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

  //去掉elementui自带的展开按钮  一个向下的按钮,打开时向右
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
.el-dialog__wrapper ::v-deep .el-tree > div {
  &::before {
    display: none;
  }

  &::after {
    display: none;
  }
}

</style>
