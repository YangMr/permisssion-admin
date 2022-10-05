<template>
  <div>
    <ul>
      <li v-for="(item,index) in tags" :key="index">
        <span>{{ item.title }}</span>
        <i v-if="index > 1" class="el-icon-close close" @click="handleClose(index)"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    tags() {
      return this.$store.getters.tags
    }
  },
  methods: {
    handleClose(index) {
      this.$store.commit('Tags/removeTags', index)
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  display: flex;

}

ul li {
  border: 1px solid #ddd;
  font-size: 12px;
  padding: 5px 8px;
  margin-right: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close {
  transform: scale(0.8);
  margin-left: 3px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.close:hover {
  background-color: #cac6c6;
}
</style>
