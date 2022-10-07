<template>
  <div>
    <el-dialog :before-close="beforeClose" :title="title" :visible.sync="visible" :width="width + 'px'">
      <div :style="{ height: height + 'px' }" class="container">
        <slot name="content"></slot>
      </div>
      <span slot="footer">
        <el-button type="danger" @click="beforeClose">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'DiaLog',
  props: {
    title: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: '600'
    },
    visible: {
      type: Boolean,
      default: false
    },
    height: {
      type: [String, Number],
      default: '400'
    }
  },
  data() {
    return {}
  },
  methods: {
    beforeClose() {
      this.$emit('close')
    },
    handleConfirm() {
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dialog__wrapper {
  ::v-deep .el-dialog {
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;

    .el-dialog__header {
      border-top-left-radius: 7px;
      border-top-right-radius: 7px;
      background-color: #1890ff;

      .el-dialog__title {
        color: #fff;
        font-size: 16px;
        font-weight: 600;
      }

      .el-dialog__close {
        color: #fff;
      }
    }

    .el-dialog__body {
      padding: 10px;
    }

    .el-dialog__footer {
      border-top: 1px solid #e8eaec !important;
      padding: 10px;
    }
  }
}
</style>
