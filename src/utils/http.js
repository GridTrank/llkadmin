
import router from '../router'
import { Message,Loading  } from 'element-ui';
import confi from '@/utils/config.js'
import axios from 'axios'

let baseURL = confi.Domain 


 


let config = {
  baseURL: baseURL,
  timeout: 30000       //设置最大请求时间
}
const _axios = axios.create(config)
 
/* 请求拦截器（请求之前的操作） */
_axios.interceptors.request.use(
  config => {
      //如果有需要在这里开启请求时的loading动画效果
    config.headers.token = localStorage.getItem("token") || '';  //添加token,需要结合自己的实际情况添加，
    
    return config;
  },
  err => Promise.reject(err)
);
 
/* 请求之后的操作 */
_axios.interceptors.response.use(
  res => {
    //在这里关闭请求时的loading动画效果
    //这里用于处理返回的结果，比如如果是返回401无权限，可能会是跳回到登录页的操作，结合自己的业务逻辑写
    if(res.data.code==1){
        return res;
    }else if(res.data.code == -1){
        Message({
            type:"error",
            message:res.data.message,
        });
        localStorage.clear()
        sessionStorage.clear()
        router.push('/Login')
        return res;
    }else{
        Message({
            type:"error",
            message:res.data.message,
        });
        return res;
    }
  },
  err => {
    if (err) {
      //在这里关闭请求时的loading动画效果
      console.log(err)
        Message({
            type:"error",
            message:err.message,
        });
    }
    return Promise.reject(err);
  }
);
 
//封装post,get方法
const http = {
  get(url='',params={}){
    return new Promise((resolve, reject) => {
      _axios({
        url,
        params,
        headers:{'Content-Type': 'application/json;charset=UTF-8'},
        method: 'GET'
      }).then(res => {
        if(res.data.code==1){
          resolve(res.data)
          return res
        }
        
      }).catch(error => {
        reject(error)
      })
    })
  },
  post(url='',params={}){
    return new Promise((resolve, reject) => {
      _axios({
        url,
        data:params,
        headers:{'Content-Type': 'application/json;charset=UTF-8'},
        method: 'POST'
      }).then(res => {
        if(res.data.code==1){
          resolve(res.data)
          return res
        }
      }).catch(error => {
        reject(error)
      })
    })
  }
}


export default http
