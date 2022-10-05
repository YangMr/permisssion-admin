<template>
  <div class="container">
    <div class="main-tab">
      <MenuIcon/>
      <TagsView/>
    </div>
    <div class="main-view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MenuIcon from '../../components/MenuIcon'
import TagsView from '../../components/TagsView'

export default {
  name: 'App-Main',
  components: {
    MenuIcon,
    TagsView
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}

.main-tab {
  display: flex;
  height: 41px;
}
</style>
