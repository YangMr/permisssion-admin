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
      <el-form size="small" label-width="80px" :inline="true" :model="queryForm" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model="queryForm.user"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search">查询</el-button>
          <el-button icon="el-icon-delete" style="color : #f60">重置</el-button>
          <el-button icon="el-icon-plus" type="primary">新增</el-button>
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
            <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
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
        :current-page.sync="userParams.page"
        :page-size="userParams.size"
        layout="total,prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-main>
  </el-container>
</template>

<script>
import departmentApi from '../../../api/department'
import userApi from '../../../api/user'

export default {
  name: 'UserList',
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
        id: '',
        page: 1,
        size: 2
      },
      // 保存用户列表的总条数
      total: 0,
      // 用来保存查询表单输入的数据
      queryForm: {}
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
        this.userParams.id = data[0].id
      }
    },
    // 获取用户列表方法
    async getUserList() {
      try {
        const { id, page, size } = this.userParams
        const { code, data } = await userApi.getUserList(id, page, size)
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
      this.userParams.id = data.id
      this.getUserList()
    },
    // 点击加减号图标会触发的方法
    handleOpenNode(data) {
      data.open = !data.open
      this.$refs.tree.store.nodesMap[data.id].expanded = !data.open
    },
    // 条数发生变化会触发的方法
    handleSizeChange(size) {
      this.userParams.size = size
      this.getUserList()
    },
    // 页码发生变化会触发的方法
    handleCurrentChange(page) {
      this.userParams.page = page
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

.el-aside ::v-deep .el-tree {
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
