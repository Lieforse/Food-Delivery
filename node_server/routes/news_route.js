const express = require("express");
const bodyParser = require("body-parser");
const db = require("../db");

let route = express();
route.use(express.static(__dirname + "/public"));
route.use(bodyParser.urlencoded());
route.use(bodyParser.json());

route.get("/select", (req, res) => {
  db.all(`SELECT * FROM news;`, (err, rows) => {
    if (err) {
      res.status(500).json({ status: "error" });
      console.log("select", err);
    } else {
      res.status(200).json(rows);
      console.log("news was successfully selected");
    }
  });
});

route.get("/select/:id", (req, res) => {
  let sql = `SELECT * FROM news WHERE news_id = ?;`;
  let params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(500).json({ status: "error" });
      console.log("select id", err);
    } else {
      res.status(200).json(row);
      console.log("news item was successfully selected");
    }
  });
});

route.put("/update/:id", (req, res) => {
  let id = req.params.id;
  let name = req.body.name;
  let content = req.body.content;
  let image = req.body.image;
  let date = req.body.date;
  let views = req.body.views;

  db.run(
    `
    UPDATE news SET 
      name = ?,
      content =?,
      image = ?,
      date = ?,
      views = ?
      WHERE news_id = ?`,
    [name, content, image, date, views, id],
    (err) => {
      if (err) {
        res.status(500).json({ status: "error" });
        console.log("update", err);
      } else {
        res.status(201).json({ status: "done!" });
        console.log("news item was successfully updated");
      }
    }
  );
});

route.post("/insert", (req, res) => {
  let name = req.body.name;
  let content = req.body.content;
  let image = req.body.image;
  let date = req.body.date;
  let views = req.body.views;
  db.run(
    `
    INSERT INTO news (name, content, image, date, views)
    VALUES(?, ?, ?, ?, ?)`,
    [name, content, image, date, views],
    (err) => {
      if (err) {
        res.status(500).json({ status: "error" });
        console.log("insert", err);
      } else {
        res.status(201).json({ status: "done!" });
        console.log("news item was successfully inserted");
      }
    }
  );
});

route.delete("/delete/:id", (req, res, next) => {
  db.run(`DELETE FROM news WHERE news_id = ?`, [req.params.id], (err) => {
    if (err) {
      res.status(500).json({ status: "error" });
      console.log("delete", err);
    } else {
      res.status(201).json({ status: "done!" });
      console.log("news item was successfully deleted");
    }
  });
});

route.get("*", (req, res) => {
  console.log("error");
});

module.exports = route;
