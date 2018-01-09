import interceptor  from './interceptor'

import httpapi  from './api/index'

/**
 * [$http description]
 * $http(params,config)  'get','delete','head'
 * $http(data,params,config)  'post','put','patch'
 */
export default function install(Vue,lazy=false){
	Vue.use(interceptor)
	const getAip=['get','delete','head'];
	lazy?lazyhttpaop():httpaop()

	function lazyhttpaop(){//api 按需处理封装 
		var version = Number(Vue.version.split('.')[0]);
		  if (version >= 2) {
		    Vue.mixin({ beforeCreate: modelInit });
		  } else {
		    var _init = Vue.prototype._init;
		    Vue.prototype._init = function (options) {
		      if ( options === void 0 ) options = {};
		      options.init = options.init
		        ? [modelInit].concat(options.init)
		        : modelInit;
		      _init.call(this, options);
		    };
		  }	

		function modelInit(){//按需在实例中绑定ajax请求
		            if (!!this.$options.vuem) {
		                this.$http = {}
	       				httpapi.filter(i=>~this.$options.vuem.indexOf(i.vuem)).forEach(ajax=>{
							if(~getAip.indexOf(ajax.method)){
								this.$http[ajax.vuem] = (params={},configs={})=>{
									 const config=Object.assign({},ajaxajax,configs,{params})
									 return paramsSerializer(config)	
								}
							}else{
								this.$http[ajax.vuem] = (data={},params={},configs={})=>{
									const config=Object.assign({},ajax,configs,{data},{params})
									return paramsSerializer(config)
								}		
							}       					
	       				})
		           }
		}
	}

	function httpaop(){//api 提前处理封装 
		var apiObj=httpapi.reduce((curr,api)=>{
			if(~getAip.indexOf(api.method)){
				curr[api.vuem] = (params={},configs={})=>{
					 const config=Object.assign({},api,configs,{params})
					 return paramsSerializer(config)
					
				}
			}else{
				curr[api.vuem] = (data={},params={},configs={})=>{
					const config=Object.assign({},api,configs,{data},{params})
					return paramsSerializer(config)
				}		
			}
			return curr
		},{})
		Window.prototype.$http=apiObj;	
	}
	

	/**
	 * [paramsSerializer url序列化]
	 * @param  params:{id:1}=> api/{id} => api/1
	 * @return $axios(configs)    [description]
	 */
	function paramsSerializer(configs={}){
		Object.entries(configs.params).forEach(i=>{
			if(~configs.url.indexOf('{'+i[0]+'}')){
				configs.url=configs.url.replace('{'+i[0]+'}',i[1])
				delete configs.params[i[0]]
			}	
		})	
		return $axios(configs)
	}


	
}
