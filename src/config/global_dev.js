// 全局静态配置
const config = {
	env:'dev',
	// 接口信息配置
	apiConfig:{
		//接口地址
		originUrl : '/api',
		//七牛上传地址
		qiuinUpload:"",
		// 登录成功后调转到的url
		loginBackUrl:'',
		//登录地址
		loginUrl:'',
		// 退出登录
		logout:''
	}
}
// window.inMindConfig = config.apiConfig;
export default config
