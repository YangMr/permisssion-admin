<template>
  <el-tabs v-model="editableTabsValue" closable type="card" @edit="handleTabsEdit" @tab-click="handleTabClick">
    <el-tab-pane
      v-for="(item) in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'TagsView',
  data() {
    return {}
  },
  computed: {
    editableTabsValue: {
      get() {
        return this.$store.getters.editableTabsValue
      },
      set(val) {
        this.$store.commit('Tags/setEditValue', val)
      }
    },
    editableTabs: {
      get() {
        return this.$store.getters.editableTabs
      },
      set(val) {
        this.$store.commit('Tags/closeTags', val)
      }
    }
  },
  methods: {
    handleTabClick() {
      this.$router.push({ name: this.editableTabsValue })
    },
    handleTabsEdit(targetName, action) {
      if (targetName === 'home') return
      if (action === 'remove') {
        const tabs = this.editableTabs
        let activeName = this.editableTabsValue
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              const nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.name
              }
            }
          })
        }

        this.editableTabsValue = activeName
        this.editableTabs = tabs.filter(tab => tab.name !== targetName)

        this.$store.commit('Tags/setEditValue', activeName)
        this.$router.push({ name: activeName })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tabs.el-tabs--card.el-tabs--top {
  width: 100%;
}
</style>
