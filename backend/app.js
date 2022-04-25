const express = require("express");
const mysql = require("mysql");
const app = express();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

const DNAregex = /^[CAGT]+$/;

const connection = mysql.createConnection({
  host: "remotemysql.com",
  user: "JNiZdMjSO8",
  password: "DTdMmnpF0b",
  port: 3306,
  database: "JNiZdMjSO8",
  dateStrings: true,
});

connection.connect((err) => {
  if (err) {
    console.log("error connecting: " + err.stack);
    throw err;
    return;
  }
  console.log("DBMS connected");
});

// riwayat penyakit GET
app.get("/get-riwayat-penyakit", (req, res) => {
  connection.query("SELECT * FROM riwayatpenyakit", (error, results) => {
    if (error) 
    {
      throw error;
    }
    res.json(results);
  });
});

// riwayat penyakit POST
app.post("/post-riwayat-penyakit", jsonParser, (req, res) => {
  //name, sequence, namaPenyakit
  console.log("hehe");
  console.log(req.body);
});

// input penyakit POST
app.post("/post-input-penyakit", jsonParser, (req, res) => {
  // namaPenyakit, sequence
  var namaPenyakit= req.body.namaPenyakit
  var sequence = req.body.sequence
  // console.log(namaPenyakit)
  // console.log(sequence)
  var valid = DNAregex.test(sequence);
  if (valid)
  {
    connection.query("INSERT INTO penyakit (nama, sequence) VALUES (?,?)", [namaPenyakit, sequence] ,(error, results) => {
      if (error) 
      {
        res.status(400).send("Error 400 Bad Request (Disease name already exists)")
      }
      else
      {
        console.log("New Disease DNA Sequence Added");
        res.sendStatus(200);
      }
    });
  }
  else
  {
    res.status(400).send("Error 400 Bad Request (Invalid Sequence)");
  }

});

const PORT = 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
