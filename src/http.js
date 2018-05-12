/**
 * Created by Zachary on 17/11/15.
 * http配置
 */

import axios from 'axios'
import store from './store'

import router from './router'
import qs from 'qs'
import httpConfig from './http-config'
import merge from './lib/merge'
import { JSEncrypt } from 'jsencrypt'

 /*需要加密的字段*/
const encryptMapper = [
    "mobile", "password", "realName", "identifyCard", "userName",
    "payPassword", "newPayPassword", "cardNo"
];

const jsencrypt= function(param){
    const public_key = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCgNg+zMcVL5Slgc45EfrfmsiGVZMMj08nsDmoeIgV2e/+iYZu2IF6bAla5QElu+2ZEOKabyZCCavYBAVu4uWkG+WYrfjOYmjg8ePJ32vVHNld5c/9VDz4RetSw+23RVTYU+hkgRAjqgwdp/C44U7eZb30YlAvIHIe9+/ndunnD/wIDAQAB';
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(public_key);
    return encrypt.encrypt(param)
}

const http = axios.create({
  baseURL:httpConfig.ip+'/AppApi/v'+httpConfig.version,
  timeout:5000,
  headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'},
  transformRequest:[function(data){
    // data 不包括get params里的  就是post里面的data!!!!
    return qs.stringify(data);
  }]
});

http.interceptors.request.use(
    config => {
    console.log(store.state.apiUid);
    console.log(store.state.accessToken);
      const dataSource={
          accessToken: store.state.accessToken || '',
          apiUid: store.state.apiUid || '',
          OS:httpConfig.OS
      };

      // 加密
      for(var i in config.data){
          if(encryptMapper.indexOf(i) !== -1 && config.data.hasOwnProperty(i)){
              config.data[i] = jsencrypt(config.data[i]).replace(/\s/g,'');
          }
      }

      if(config.method=='get'){
         config.params=merge({},dataSource,config.params)
      }

      config.data=merge({},dataSource,config.data)

      // store.commit(types.UPDATE_AJAX,true)
      return config;
    }
);

http.interceptors.response.use(
    response => {

        if(response.data.code*1 === -100 || response.data.code*1 === -101 || response.data.code*1 === -102){//表示需要登录了
            //清除token信息并跳转到登录页面
            store.commit('removeUserMsg');
            router.replace({
                name: 'Sign',
                query: {redirect: router.currentRoute.fullPath}
            })
        }

        if(response.data.code*1 !== 0){

            // store.dispatch('showMsg', {content:response.data.errmsg})
        }

        return response;
    }
);

export default http;