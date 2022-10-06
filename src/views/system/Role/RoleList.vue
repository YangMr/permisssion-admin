<template>
  <div>
    <el-button v-permission="'sys:role:add'" type="primary">新增</el-button>
    <el-button v-permission="'sys:role:edit'" type="primary">编辑</el-button>
    <el-button v-permission="'sys:role:delete'" type="primary">删除</el-button>
    <el-button v-permission="'sys:role:assign'" type="primary">分配权限</el-button>
  </div>
</template>

<script>
export default {
  name: 'RoleList'
}
</script>

<style scoped>

</style>
