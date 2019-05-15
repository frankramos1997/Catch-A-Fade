var mysql = require("mysql");


var connection = mysql.createConnection({
  host: "ctgplw90pifdso61.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  port: 3306,
  user: "ncj9jbu8ue6bdwyy",
  password: "q2p69qhui5pw06vb",
  database: "j1g7th6052u9xn7r"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

module.exports = connection;