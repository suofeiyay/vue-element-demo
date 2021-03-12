import axios from 'axios'
import { MessageBox, Message } from 'element-ui'

const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: 5000
})

service.interceptors.request.use(
	config => {
		if(store.getters.token) {
			config.headers['X-Token'] = getToken()
		}
		return config
	},
	error => {
		console.log(error)
		return Promise.reject(error)
	}
)

service.interceptors.response.use(
	response => {
		if(response.status === 200 && response.data) { //分出登录失效
			const res = response.data
			if(res.code === 50001) {
				// to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
        return Promise.reject(new Error(res.message || 'Error'))
			}
			return res
		} else {
			Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
			return Promise.reject(new Error('请求失败')) 
		}
	},
	error => {
		console.log('res' + error)
		Message({
			message: error.message,
			type: 'error',
			duration: 5* 1000
		})
		return Promise.reject(error)
	}
)

export default service