const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "taekwondo_acc",
});

app.post("/register", (req, res) => {
  const checkusername = "SELECT * FROM taekwondo_acc WHERE username = ?";
  const sql =
    "INSERT INTO taekwondo_acc (`username`, `email`, `password`) VALUES (?,?,?)";

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const saltRounds = 10;

  db.query(checkusername, [username], (err, result) => {
    if (err) {
      console.log(err);
    } else if (result.length > 0) {
      res.send("User already exist");
    } else {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          console.log(err);
        } else {
          db.query(sql, [username, email, hash], (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send("User created");
            }
          });
        }
      });
    }
  });
});

app.post("/login", (req, res) => {
  const loginSQL =
    "SELECT * FROM taekwondo_acc WHERE username = ?";
  const username = req.body.username;
  const password = req.body.password;

  db.query(loginSQL, [username], (err, result) => {
    if (err) {
      console.log(err);
    } else if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (err, response) => {
        if (response) {
          res.send("Login Successfully");
        } else {
          res.send("Wrong password!");
        }
      });
    } else {
      res.send("User doesn't exist")
    }
  });
});

const server = app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
