<template>
  <div>
    <el-button v-permission="'sys:menu:add'" type="primary">新增</el-button>
    <el-button v-permission="'sys:menu:edit'" type="primary">编辑</el-button>
    <el-button v-permission="'sys:menu:delete'" type="primary">删除</el-button>
  </div>
</template>

<script>
export default {
  name: 'MenuList'
}
</script>

<style scoped>

</style>
