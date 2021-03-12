import requst from '@/utils/requst'

export function getUser(parmas) {
	return requst({
		url:' /uaa/login',
		method:' get',
		params: parmas
	})
}

export function postUser(data) {
  return request({
    url: '/uaa/loginout',
    method: 'post',
    data
  })
}

export function putUser(id, data) {
  return request({
    url: `/uaa/user/${id}`,
    method: 'put',
    data
  })
}

export function deleteUser(id) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'delete'
  })
}