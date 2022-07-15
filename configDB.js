const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD
});

connection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  const query_str1 = `CREATE TABLE account  (`
    + `id bigint NOT NULL PRIMARY KEY,`
    + `email varchar(50),`
    + `phone varchar(20),`
    + `password text,`
    + `firstname varchar(250),`
    + `lastname varchar(250),`
    + `created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,`
    + `updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP);`

  const query_str2 = `ALTER TABLE account MODIFY id bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;`

  connection.query(query_str1, function (err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

  connection.query(query_str2, function (err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });
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
