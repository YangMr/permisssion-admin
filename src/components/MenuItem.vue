<template>
  <div>
    <template v-for="(item) in menu">
      <el-submenu v-if="item.children && item.children.length > 0" :key="item.id" :index="item.id + ''">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{ item.name }}</span>
        </template>
        <menu-item :menu="item.children"></menu-item>
      </el-submenu>
      <el-menu-item v-if="!item.children" :key="item.id" :index=" item.id + ''">
        <i class="el-icon-menu"></i>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>

    </template>

  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>

</style>
