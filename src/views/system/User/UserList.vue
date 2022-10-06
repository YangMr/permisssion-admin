<template>
  <div>
    <el-button v-permission="'sys:user:add'" type="primary">新增</el-button>
    <el-button v-permission="'sys:user:edit'" type="primary">编辑</el-button>
    <el-button v-permission="'sys:user:delete'" type="primary">删除</el-button>
    <el-button v-permission="'sys:user:assign'" type="primary">分配角色</el-button>
  </div>
</template>

<script>
export default {
  name: 'UserList'
}
</script>

<style scoped>

</style>
