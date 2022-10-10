/**
 * @author YangLing
 * @date 2022/10/7 09:27
 */
import request from '../utils/request'

/**
 * 获取机构列表
 * @returns {AxiosPromise}
 */
const getDepartmentList = () => {
  return request({
    url: '/department/list',
    method: 'GET'
  })
}

/**
 * 获取上级机构列表
 * @returns {AxiosPromise}
 */
const getParentDepartment = () => {
  return request({
    url: '/department/parent',
    method: 'GET'
  })
}

/**
 * 新增机构列表
 * @param data
 * @returns {AxiosPromise}
 */
const addDepartment = (data) => {
  return request({
    url: '/department',
    method: 'POST',
    data
  })
}

/**
 * 编辑机构
 * @param data
 * @returns {AxiosPromise}
 */
const editDepartment = (data) => {
  return request({
    url: '/department',
    method: 'PUT',
    data
  })
}

/**
 * 删除机构管理接口
 * @param id
 * @returns {AxiosPromise}
 */
const deleteDepartment = (id) => {
  return request({
    url: `/department/${id}`,
    method: 'DELETE'
  })
}

export default {
  getDepartmentList,
  getParentDepartment,
  addDepartment,
  deleteDepartment,
  editDepartment
}
