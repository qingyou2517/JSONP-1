const random='frankJSONPFunctionName'+Math.random()
window[random]=(data)=>{
    console.log(data)
}

// 第二次犯错了：document.createElement() 的参数是字符串！！！！
const script =document.createElement('script')
// 函数名用callback存起来，放在url的查询参数里，可以被通过query.callback调用:显然 friends.js可以调用query.callback，从而qq.com 的server.js在'path===/friends.js'的时候也可以,具体看底下打开的终端所监听到的请求路径
script.src=`http://qq.com:8888/friends.js?callback=${random}`
// 拿了数据，就把script标签删了，节约空间
script.onload=()=>{
    script.remove()
}
document.body.appendChild(script)