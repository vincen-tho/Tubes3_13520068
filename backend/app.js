const express = require('express');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
  host:'remotemysql.com',
  user: 'JNiZdMjSO8',
  password:'DTdMmnpF0b',
  port : 3306,
  database: 'JNiZdMjSO8'
});

connection.connect((err) => {
    if (err) {
        console.log('error connecting: ' + err.stack);
        throw err;
        return;
    }
    console.log('success');
  });

app.listen(3000);