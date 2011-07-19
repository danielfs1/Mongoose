//Require
var http = require('http');
var sys = require('sys');
var exec = require('child_process').exec;
var fs = require('fs');

//Start Logged
var log = fs.createWriteStream('log.txt', {'flags': 'a'});
log("Opening Log Stream");

//Server Info
var port = "1337";
var address = "0.0.0.0";

//Get Uptime
var uptime = "";
function puts(error, stdout, stderr) { uptime = stdout }
exec('uptime', puts);

//Set up the JSON
var info = '{"uptime": "' + uptime + '"}';
var jsonobj = JSON.parse(info);

//Get Uptime
function puts(error, stdout, stderr) { uptime = stdout }
exec('uptime', puts);

http.createServer(function (req, res) {
  //Log about new connection
  log("New Connection");
  log(req.headers);
  
  //Send the client info in json form
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(jsonobj));
  res.end("");
  
  //Log connection done
  log("Connection Closed");
}).listen(port, address);

//Notify the people that the server is alive
log("Server has started at http://" + adddress + ":" + port);

//Function for logging
function log(text) {
	var currentTime = new Date();
	var timestamp = currentTime.getHours() + ':' + currentTime.getMinutes() + ':' + currentTime.getSeconds();
	log.write(timestamp + "--" + text);
	console.log(timestamp + "--" + text)
}
