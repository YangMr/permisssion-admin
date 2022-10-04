<template>
  <el-menu
    :collapse="isCollapse"
    class="el-menu-vertical-demo"
    default-active="2"
    router
    unique-opened
  >
    <menu-item :menu="menuList"></menu-item>
  </el-menu>
</template>

<script>
import MenuItem from './MenuItem'
import { mapGetters } from 'vuex'

export default {
  name: 'MenuBar',
  components: {
    MenuItem
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'isCollapse',
      'menuList'
    ])
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
