<template>
  <div>
    <i :class="[isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold']" class="arrow-icon" @click="handleCollapse"></i>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'MenuIcon',
  computed: {
    ...mapGetters([
      'isCollapse'
    ])
  },
  methods: {
    ...mapMutations({
      setCollapse: 'Menu/setCollapse'
    }),
    handleCollapse() {
      this.setCollapse()
    }
  }
}
</script>

<style lang="scss" scoped>
.arrow-icon {
  background: #eaedf1;
  border: 1px solid transparent;
  font-size: 23px;
  height: 39px;
  line-height: 39px !important;
  width: 40px;
  text-align: center;
}
</style>
