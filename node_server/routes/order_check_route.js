const express = require("express");
const bodyParser = require("body-parser");
const db = require("../db");

let route = express();
route.use(express.static(__dirname + "/public"));
route.use(bodyParser.urlencoded());
route.use(bodyParser.json());

route.get("/select", (req, res) => {
  db.all(`SELECT * FROM order_check;`, (err, rows) => {
    if (err) {
      res.status(500).json({ status: "error" });
      console.log("select", err);
    } else {
      res.status(200).json(rows);
      console.log("check was successfully selected");
    }
  });
});

route.get("/select/:id", (req, res) => {
  let sql = `SELECT * FROM order_check WHERE check_id = ?;`;
  let params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(500).json({ status: "error" });
      console.log("select id", err);
    } else {
      res.status(200).json(row);
      console.log("check item was successfully selected");
    }
  });
});

route.put("/update/:id", (req, res) => {
  let id = req.params.id;
  let date = req.body.date;

  db.run(
    `
    UPDATE order_check SET 
      date = ?
      WHERE check_id = ?`,
    [date, id],
    (err) => {
      if (err) {
        res.status(500).json({ status: "error" });
        console.log("update", err);
      } else {
        res.status(201).json({ status: "done!" });
        console.log("check item was successfully updated");
      }
    }
  );
});

route.post("/insert", (req, res) => {
  let date = req.body.date;
  db.run(
    `
    INSERT INTO order_check (date)
    VALUES(?)`,
    [date],
    (err) => {
      if (err) {
        res.status(500).json({ status: "error" });
        console.log("insert", err);
      } else {
        res.status(201).json({ status: "done!" });
        console.log("check item was successfully inserted");
      }
    }
  );
});

route.delete("/delete/:id", (req, res, next) => {
  db.run(
    `DELETE FROM order_check WHERE check_id = ?`,
    [req.params.id],
    (err) => {
      if (err) {
        res.status(500).json({ status: "error" });
        console.log("delete", err);
      } else {
        res.status(201).json({ status: "done!" });
        console.log("check item was successfully deleted");
      }
    }
  );
});

route.get("*", (req, res) => {
  console.log("error");
});

module.exports = route;
