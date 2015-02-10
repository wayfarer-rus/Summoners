var http = require('http');
var fs = require('fs');
var mainPage = "debug.html";
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    content = fs.readFileSync(mainPage);
    res.end(content);
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
