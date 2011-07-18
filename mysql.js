var mysql = require('db-mysql');
new mysql.Database({
	hostname: 'localhost',
	user: 'root',
    password: '',
	database: 'node_test'
}).connect(function(error) {
	if (error) {
		return console.log("Connection ERROR: " + error);
	}

  this.query().select('*').from('users').execute(function(error, rows) {
		if (error) {
			return console.log('ERROR: ' + error);
		}
		console.log(rows.length + ' ROWS');
		for (var i in rows) {
			console.log(rows[i]);
		}
	});
})
