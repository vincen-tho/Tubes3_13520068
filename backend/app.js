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
    console.log('DBMS connected');
  });

// coba-coba get
// app.get('/', (req,res)=>{
//     console.log("masuk gan");
// });

// coba-coba post
// app.post("/post", (req, res) => {
//     console.log("Connected to React");
//   });

const PORT = 3000
app.listen(PORT, console.log(`Server started on port ${PORT}`));