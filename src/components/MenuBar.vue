<template>
  <el-menu
    :collapse="isCollapse"
    :default-active="$route.path"
    class="el-menu-vertical-demo"
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
  },
  watch: {
    $route: {
      handler(menu) {
        const obj = {
          title: menu.meta.title,
          name: menu.name,
          path: menu.path
        }
        this.$store.commit('Tags/addTags', obj)
      },
      immediate: true,
      deep: true
    }
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
