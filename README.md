# 模拟同之前的 CORS

# 关于安全访问qq.com
```
把隐私的json数据写入了friends.js文件，代表任何人只要知道这个js路径，都可以获取json数据，故检查referer的字符串来保证安全;
但是安全链的安全程度取决于最弱的一环：一旦frank.com被攻陷，黑客就可以借助frank.com攻陷qq.com，所以更严格来说，要考虑cookie和token，这里先不涉及

else if(path === '/friends.js'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
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
