/**
 * @author YangLing
 * @date 2022/10/11 08:49
 */

import request from '../utils/request'

/**
 * 获取用户列表
 * @param id  部门id
 * @param page  页码
 * @param size  条数
 * @returns {AxiosPromise}
 */
const getUserList = (id, page, size) => {
  return request({
    url: `/user/list/${id}/${page}/${size}`,
    method: 'GET'
  })
}

/**
 * 删除用户接口
 * @param id
 * @returns {AxiosPromise}
 */
const deleteUser = (id) => {
  return request({
    url: `/user/${id}`,
    method: 'DELETE'
  })
}

export default {
  getUserList,
  deleteUser
}
