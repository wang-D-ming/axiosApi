import $qs  from 'qs'

export default function install(Vue){

	// $axios.defaults.headers.common['Authorization'] = 'Authorization'
	
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
		if(config.vuem && requests[config.vuem]){
			requests[config.vuem]()		
			
		}
		// config.cancelToken=CancelToken.token
		config.cancelToken=new CancelToken(function executor(c) {
							requests[config.vuem]=c
		  				})
		// console.log(config)
		// requests[config.vuem]=CancelToken
		return config;
	},err=>{
		return Promise.reject(err);
	})

	$axios.interceptors.response.use(response=>{
		if(response.data.code==='000000'){
			return response.data
		}else{
			return Promise.reject(response.data);
		}
		
	},(err)=>{
		return Promise.reject(err);
	})



}