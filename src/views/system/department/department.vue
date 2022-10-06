<template>
  <div>
    <el-button v-if="btn" type="primary">新增</el-button>
  </div>
</template>

<script>
export default {
  name: 'DepartmentList',
  data() {
    return {
      btn: true
    }
  }
}
</script>

<style scoped>

</style>
