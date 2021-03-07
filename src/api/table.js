import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params
  })
}

export function InserUser(params) {
  return request({
    url: '/user/add',
    method: 'post',
    params
  })
}
