/**
 * @author YangLing
 * @date 2022/10/10 14:13
 */
import { MessageBox, Message } from 'element-ui'

const util = {
  // 对话框封装
  confirm(text) {
    return new Promise((resolve, reject) => {
      MessageBox.confirm(text, '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        resolve(true)
      }).catch(() => {
        Message.info('已取消删除')
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(false)
      })
    })
  }
}
export default util
