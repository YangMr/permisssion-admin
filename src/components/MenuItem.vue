<template>
  <fragment>
    <template v-for="(item,index) in menu">
      <el-submenu v-if="item.children && item.children.length > 0" :key="index" :index="item.path">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.label }}</span>
        </template>
        <MenuItem :menu="item.children"></MenuItem>
      </el-submenu>
      <el-menu-item v-if="item.children && item.children.length <= 0" :key="index" :index="item.path">
        <i :class="item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
    </template>
  </fragment>
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
