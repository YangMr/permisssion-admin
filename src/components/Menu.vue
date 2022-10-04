<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    default-active="2"
    text-color="#fff"
  >

    <!--    <menu-item v-for="(item,index) in menu" :key="index" :item="item"></menu-item>-->
    <menu-item :menu="menu"></menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'Menu',
  components: {
    MenuItem: () => import('./MenuItem')
  },
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped>

</style>
