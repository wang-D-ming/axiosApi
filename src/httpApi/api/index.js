import common  from './common'
import login  from './login'

const indexApi={
	common,
	login
}
let api={}
Object.values(indexApi).forEach(i=>{
	Object.entries(i).forEach(k=>{
		if(api.hasOwnProperty(k[0])){
			console.error('api属性名冲突===='+k[0])
		}else{
			api[k[0]]=k[1]
		}
		
	})
})


let httpapi=[];//api 格式转化为config

Object.entries(api).forEach(i=>{
    Object.entries(i[1]).forEach(k=>{
      httpapi.push({method:k[0],url:k[1],vuem:i[0]})
    })
})
export default  httpapi