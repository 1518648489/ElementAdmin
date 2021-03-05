import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/profile',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/auth/log-out',
    method: 'post'
  })
}
