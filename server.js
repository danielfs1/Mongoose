//Require
var http = require('http');
var sys = require('sys');
var exec = require('child_process').exec;
var fs = require('fs');
var async = require('async');

//Start Logged
var log2 = fs.createWriteStream('log.txt', {'flags': 'a'});
log("Opening Log Stream");

//Server Info
var port = "1337";
var address = "0.0.0.0";

http.createServer(function (req, res) {
  //Log about new connection
  log("New Connection");
  //log(req.headers);
	var response_json = {};
	async.series([
		//anon func for each command, adding callback() to each func to ensure it doesn't move on until we are ready
		// get uptime
		function(callback) {
			//get uptime
			exec("uptime | awk '{print $3}'", function(stdin, stdout, stderr) {
				log("Getting current uptime...");

				response_json["uptime"] = stdout;
				//call callback, this fakes syncronisity
				callback();
			});	
		},
		// get totalMem
		function(callback) {
			exec("free -mto | grep Mem | awk '{print $2}'", function(stdin, stdout, stderr) {
				log("Getting total memory info...");

				response_json["totalMem"] = stdout;
				callback();
			});
		},
		// get freeMem
		function(callback) {
			exec("free -mto | grep Mem | awk '{print $4}'", function(stdin, stdout, stderr) {
				log("Getting  free memory info...");

				response_json["freeMem"] = stdout;
				callback();
			});
		},
		// get usedMem
		function(callback) {
			exec("free -mto | grep Mem | awk '{print $3}'", function(stdin, stdout, stderr) {
				log("Getting used memory info...");

				response_json["usedMem"] = stdout;
				callback();
			});
		},
		//get hostname
		function(callback) {
			exec('hostname', function(stdin, stdout, stderr) {
				log("Getting hostname");

				response_json["hostname"] = stdout;
				callback();
			});
		}
	], function(err, results) {
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.write(JSON.stringify(response_json));
		res.end("");

		log("end of request");
	});
  
  //Log connection done
  log("Connection Closed");
}).listen(port, address);

//Notify the people that the server is alive
log("Server has started at http://" + address + ":" + port);

//Function for logging
function log(text) {
	var currentTime = new Date();
	var timestamp = currentTime.getHours() + ':' + currentTime.getMinutes() + ':' + currentTime.getSeconds();
	log2.write(timestamp + "--" + text + "\n");
	console.log(timestamp + "--" + text);
}

//Function for executing commands
function puts(error, stdout, stderr) { this.temp = String(stdout); console.log("temp: " + this.temp); }
