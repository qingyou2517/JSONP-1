var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\n比如：node server.js 8888 ')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/
   
  console.log('收到新请求！路径（带查询参数）为：' + pathWithQuery)

  if(path === '/index.html'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(fs.readFileSync('./public/index.html'))
    response.end()
  } else if(path === '/qq.js'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    response.write(fs.readFileSync('./public/qq.js'))
    response.end()
  } else if(path === '/friends.json'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/json;charset=utf-8')
    response.setHeader('Access-Control-Allow-Origin','http://frank.com:9990')
    response.write(fs.readFileSync('./public/friends.json'))
    response.end()
  } else if(path === '/friends.js'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    // 把隐私的json数据写入了friends.js文件，代表任何人只要知道这个js路径，都可以获取json数据，故检查referer的字符串来保证安全
    // 但是安全链的安全程度取决于最弱的一环：一旦frank.com被攻陷，黑客就可以借助frank.com攻陷qq.com，所以更严格来说，要考虑cookie和token，这里先不涉及
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
    
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`你访问的页面不存在`)
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听端口 ' + port + ' 成功\n请用Ctrl加左键单击，打开 http://localhost:' + port)