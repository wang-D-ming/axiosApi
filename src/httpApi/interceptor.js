import $qs  from 'qs'

export default function install(Vue){

	$axios.defaults.headers.common['If-Modified-Since'] = '0' //不使用缓存
	
	//是否用formdata格式请求
	// $axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	// $axios.defaults.transformRequest =[data=>{
	// 	return $qs.stringify(data)
	// }];
	$axios.defaults.timeout =6000;
	let CancelToken=$axios.CancelToken;
	let requests={};
	 // console.log($axios.CancelToken)
	 // var CancelToken = $axios.CancelToken.source();
	$axios.interceptors.request.use(config=>{ 
		
		config.headers.common['token']='token' //设置时时token

		if(config.vuem && requests[config.vuem]){//拦截重复的且未完成的请求
			requests[config.vuem]('网络繁忙')		
			
		}
		// config.cancelToken=CancelToken.token
		config.cancelToken=new CancelToken(function executor(c) {//为每个请求设置名字
							requests[config.vuem]=c
		  				})
		// console.log(config)
		// requests[config.vuem]=CancelToken
		return config;
	},err=>{
		return Promise.reject(err);
	})

	$axios.interceptors.response.use(response=>{
		delete  requests[response.config.vuem];//删除请求成功的属性
		if(response.data.code==='200'){//后台人员约定的成果的参数
			return response.data
		}else{
			return Promise.reject(response.data);
		}
		
	},(err)=>{
		if($axios.isCancel(err)){	
			return new Promise(()=>{}) //是否会引起内存泄漏呢？
		}else{
			return Promise.reject(err);
		}
		
	})



}