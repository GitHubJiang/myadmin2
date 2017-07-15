//
import config from 'globalConfig'
let _url = config.apiConfig.originUrl;
let im_api = {
	// 登录
	login:_url+'/sys/user/login'
}
export default im_api
