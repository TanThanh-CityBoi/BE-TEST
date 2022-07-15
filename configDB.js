const mysql = require("mysql");

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'a11111111',
 // database : "BETEST",
  //port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Mysql connected");
});

// promise version
const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports = query;
