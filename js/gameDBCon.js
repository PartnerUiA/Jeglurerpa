var mysql = require('mysql');

var con = mysql.createConnection({
  host: "jeglurerpano01.mysql.domeneshop.no",
  user: "jeglurerpano01",
  password: "AphsPh2019sshf",
  database: "jeglurerpano01"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "SELECT * FROM Card";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});
