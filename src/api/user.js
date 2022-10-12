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
const getUserList = (data) => {
  return request({
    url: '/user/list',
    method: 'GET',
    data
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

/**
 * 新增用户接口
 * @param data
 * @returns {AxiosPromise}
 */
const addUser = (data) => {
  return request({
    url: '/user',
    method: 'POST',
    data
  })
}

/**
 * 编辑用户接口
 * @param data
 * @returns {AxiosPromise}
 */
const editUser = (data) => {
  return request({
    url: '/user',
    method: 'PUT',
    data
  })
}

/**
 * 获取用户的userId
 * @param id
 * @returns {AxiosPromise}
 */
const getUserId = (id) => {
  return request({
    url: `/user/getRoleIdByUserId/${id}`,
    method: 'GET'
  })
}

/**
 * 获取用户的角色列表
 * @param data
 * @returns {AxiosPromise}
 */
const getRoleList = (data) => {
  return request({
    url: '/user/getRolistForAssign',
    method: 'GET',
    data
  })
}

/**
 * 分配角色
 * @param data
 * @returns {AxiosPromise}
 */
const assignRole = (data) => {
  return request({
    url: '/user/assingRole',
    method: 'POST',
    data
  })
}

export default {
  getUserList,
  deleteUser,
  addUser,
  editUser,
  getUserId,
  getRoleList,
  assignRole
}
