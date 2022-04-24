const express = require('express');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
  host:'remotemysql.com',
  user: 'JNiZdMjSO8',
  password:'DTdMmnpF0b',
  port : 3306,
  database: 'JNiZdMjSO8',
  dateStrings: true
});

connection.connect((err) => {
    if (err) {
        console.log('error connecting: ' + err.stack);
        throw err;
        return;
    }
    console.log('DBMS connected');
  });

// riwayat penyakit GET
app.get('/get-riwayat-penyakit', (req,res)=>{
    connection.query(
      'SELECT * FROM riwayatpenyakit',
      (error, results) => {
        if (error)
        {
          throw error;
        }
        res.json(results)
      }
    );
});

// riwayat penyakit POST
app.post("/post-riwayat-penyakit", (req, res) => {
    console.log("hehe");
});

const PORT = 3000
app.listen(PORT, console.log(`Server started on port ${PORT}`));