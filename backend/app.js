const express = require("express");
const mysql = require("mysql");
const KMP = require("./kmpAlgo.js");
const BM = require("./bmAlgo.js");
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
    if (error) {
      throw error;
    }
    res.json(results);
  });
});

// riwayat penyakit POST
app.post("/post-riwayat-penyakit", jsonParser, (req, res) => {
  //name, sequence, namaPenyakit
  var namaPengguna = req.body.name;
  var sequencePengguna = req.body.sequence;
  var namaPenyakit = req.body.namaPenyakit;
  var sequencePenyakit;
  var valid;
  connection.query(
    "SELECT sequence FROM penyakit WHERE nama = ?",
    [namaPenyakit],
    (error, results) => {
      if (error) {
        console.log("query error");
        res.status(400).send("Error 400 Bad Request (query error)");
      } else if (results[0] === undefined) {
        console.log("disease not found");
        res.status(400).send("Error 400 Bad Request (disease not found)");
      } else if (namaPengguna === "") {
        console.log("User name cannot be empty");
        res.status(400).send("Error 400 Bad Request (name input empty)");
      } else {
        sequencePenyakit = results[0].sequence;
        valid = DNAregex.test(sequencePengguna);
        if (valid) {
          var KMPmatch = KMP.kmpMatch(sequencePengguna, sequencePenyakit);
          var BMmatch = BM.bmMatch(sequencePengguna, sequencePenyakit);
          var today = new Date();
          var date =
            today.getFullYear() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getDate();
          var similarity;
          var status;
          if (KMPmatch != -1 && BMmatch != -1) {
            similarity = "100";
            status = "true";
          } else {
            similarity = "0";
            status = "false";
          }
          var result = {
            tanggal: date,
            pengguna: namaPengguna,
            penyakit: namaPenyakit,
            similarity: similarity,
            status: status,
          };
          connection.query(
            "INSERT INTO riwayatpenyakit (tanggal, pengguna, penyakit, similarity, status) VALUES (?,?,?,?,?)",
            [date, namaPengguna, namaPenyakit, parseInt(similarity), status],
            (error, results) => {
              if (error) {
                console.log("Error adding new riwayat penyakit");
                res.sendStatus(400);
              } else {
                console.log("New riwayat penyakit added");
                res.json(result);
              }
            }
          );
        } else {
          res.status(400).send("Error 400 Bad Request (invalid sequence)");
        }
      }
    }
  );
});

// input penyakit POST
app.post("/post-input-penyakit", jsonParser, (req, res) => {
  // namaPenyakit, sequence
  var namaPenyakit = req.body.namaPenyakit;
  var sequence = req.body.sequence;
  var valid = DNAregex.test(sequence);
  if (valid) {
    if (namaPenyakit !== "") {
      connection.query(
        "INSERT INTO penyakit (nama, sequence) VALUES (?,?)",
        [namaPenyakit, sequence],
        (error, results) => {
          if (error) {
            console.log("Disease name already exists");
            res
              .status(400)
              .send("Error 400 Bad Request (Disease name already exists)");
          } else {
            console.log("New Disease DNA Sequence Added");
            res.sendStatus(200);
          }
        }
      );
    } else {
      console.log("Disease name cannot be empty");
      res
        .status(400)
        .send("Error 400 Bad Request (Input name cannot be empty)");
    }
  } else {
    console.log("Invalid Sequence");
    res.status(400).send("Error 400 Bad Request (Invalid Sequence)");
  }
});

const PORT = 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
