//Require
var http = require('http');
var sys = require('sys');
var exec = require('child_process').exec;
var fs = require('fs');
var temp = "";

//Start Logged
var log2 = fs.createWriteStream('log.txt', {'flags': 'a'});
log("Opening Log Stream");

//Server Info
var port = "1337";
var address = "0.0.0.0";

//Get Uptime
exec('uptime', puts);
var uptime = temp;

//Get Memory Info
exec('free -m', puts);
var memory = temp;

//Get Disk Info
exec('df -H', puts);
var disk = temp;

//Set up the JSON
var info = '{"uptime" : "' + uptime + '", "meminfo" : "'+memory+'","diskinfo" : "'+disk+'"}';
var jsonobj = eval('(' + info + ')');

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
log("Server has started at http://" + address + ":" + port);

//Function for logging
function log(text) {
	var currentTime = new Date();
	var timestamp = currentTime.getHours() + ':' + currentTime.getMinutes() + ':' + currentTime.getSeconds();
	log2.write(timestamp + "--" + text);
	console.log(timestamp + "--" + text)
}

//Function for executing commands
function puts(error, stdout, stderr) { console.log(stdout); temp = stdout }
