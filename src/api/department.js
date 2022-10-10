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

export default {
  getDepartmentList,
  getParentDepartment
}
