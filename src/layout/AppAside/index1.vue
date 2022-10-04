<template>
  <div>
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      default-active="1"
      text-color="#fff"
    >
      <template v-for="(item) in menu">
        <el-submenu v-if="item.children && item.children.length > 0" :key="item.id" index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{ item.name }}</span>
          </template>
          <template v-for="(n) in item.children">

            <el-menu-item v-if="!n.children" :key="n.id" index="1-1">{{ n.name }}</el-menu-item>

            <el-submenu v-else-if="n.children && n.children.length > 0" :key="n.id" index="1-4">
              <template slot="title">{{ n.name }}</template>
              <template v-for="(m) in n.children">
                <el-menu-item v-if="!m.children" :key="m.id" index="1-4-1">{{ m.name }}</el-menu-item>
                <el-submenu v-if="m.children && m.children.length > 0" :key="m.id">
                  <template slot="title">{{ m.name }}</template>
                  <el-menu-item v-for="(t) in m.children" :key="t.id">{{ t.name }}</el-menu-item>
                </el-submenu>
              </template>

            </el-submenu>

          </template>
        </el-submenu>

        <el-menu-item v-if="!item.children" :key="item.id" :index="item.id">
          <i class="el-icon-menu"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </template>

    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'AppAside',
  data() {
    return {
      menu: [
        {
          id: 1,
          name: 'it互联网',
          children: [
            {
              id: 2,
              name: '编辑语言',
              children: [
                {
                  id: 7,
                  name: 'java',
                  children: [
                    {
                      id: 1111,
                      name: 'jsp'
                    },
                    {
                      id: 1121,
                      name: 'jsp1'
                    }
                  ]
                },
                {
                  id: 8,
                  name: 'c#'
                }
              ]
            },
            {
              id: 3,
              name: '前端开发'
            },
            {
              id: 4,
              name: '后端开发'
            }
          ]
        },
        {
          id: 2,
          name: '设计创作'
        },
        {
          id: 3,
          name: '升学考验'
        },
        {
          id: 4,
          name: '职企考证'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
