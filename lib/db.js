var mysql = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'ekcks123',
  database : 'servermon',
  dateStrings: "date"
});
db.connect();

module.exports = db;
