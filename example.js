var http = require('http');
var sys = require('sys');
var exec = require('child_process').exec;
var shell = require("./shell");

var uptime = "";

function puts(error, stdout, stderr) { uptime = stdout }
exec('uptime', puts);

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(uptime);
  res.end('dsadasd');
}).listen(1337, "127.0.0.1");

console.log('Server running at http://127.0.0.1:1337/');