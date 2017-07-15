import globalConfig from 'globalConfig'
import axios from 'axios'
var qs = require('qs');
import { Notification } from 'element-ui';
let axiosConfig = {
    init() { 
        // Vue.prototype.axios = axios;
        axios.defaults.baseURL = globalConfig.apiConfig.originUrl;
        axios.defaults.withCredentials=true;
        axios.interceptors.request.use(function (config) {
            // console.log('config',config);
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            if(config.data){
                // console.log(config.data)
                config.data = qs.stringify(config.data);
            }
            // qs.stringify
            // Do something before request is sent
            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });
        // Add a response interceptor
        axios.interceptors.response.use(function (response) {
            // Do something with response data
            if(response.data.code!='1'){
                Notification({
                    // title:'错误提醒',
                    message:response.data.msg,
                    type:'error'
                })
                document.querySelector('.el-icon-loading').innerHTML = '';
            }else{
                return response.data;
            }
        }, function (error) {
            // Do something with response error
            return Promise.reject(error);
        });
    }
}
export default axiosConfig
