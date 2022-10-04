<template>
  <div>
    <el-menu-item v-if="!item.children" :index="item.id">
      <i class="el-icon-setting"></i>
      <span slot="title">{{ item.name }}</span>
    </el-menu-item>
    <el-submenu v-if="item.children && item.children.length > 0" :index="item.id">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{ item.name }}</span>
      </template>
      <Item v-for="(menu) in item.children" :key="menu.id" :item="menu"></Item>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    item: {
      type: Object,
      default: () => {
      }
    }
  }
}
</script>

<style scoped>

</style>
