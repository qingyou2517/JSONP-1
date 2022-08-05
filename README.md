# 模拟qq.com:8888 和 frank.com:9990 同之前的 CORS

# JSONP的思路：
```
通过 qq.com 的 server.js 作字符串替换，把 frank.com 想跨域访问的 friends.json 数据写入 friends.js 中，这个js文件会执行一个回调，
而这个回调我们事先在 frank.js 里写好，从而frank.js 就能通过引用friends.js 来跨域访问 friends.json的数据
```
# 关于安全访问qq.com
```
else if(path === '/friends.js'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    
    //把隐私的json数据写入了friends.js文件，代表任何人只要知道这个js路径，都可以获取json数据，故检查referer的字符串来保证安全;
    //但是安全链的安全程度取决于最弱的一环：一旦frank.com被攻陷，黑客就可以借助frank.com攻陷qq.com，所以更严格来说，要考虑cookie和token，
    这里先不涉及
    
    if(request.headers['referer'].indexOf('http://frank.com:9990')===0){
      const string=fs.readFileSync('./public/friends.js').toString()
      const data=fs.readFileSync('./public/friends.json').toString()
      const string2=string.replace('{{data}}',data).replace('{{xxx}}',query.callback)
      response.write(string2)
      response.end()
    }else{
      response.statusCode=404
      response.end()
    } 
```
# callback存回调函数的函数名:
```
//friends.js可以调用query.callback，从而qq.com 的server.js也可以

script.src=`http://qq.com:8888/friends.js?callback=${random}`
```
