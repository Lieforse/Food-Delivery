const express = require("express");
const bodyParser = require("body-parser");
const db = require("../db");

let route = express();
route.use(express.static(__dirname + "/public"));
route.use(bodyParser.urlencoded());
route.use(bodyParser.json());

route.get("/select", (req, res) => {
  db.all(`SELECT * FROM meal;`, (err, rows) => {
    if (err) {
      res.status(500).json({ status: "error" });
      console.log("select", err);
    } else {
      res.status(200).json(rows);
      console.log("meal was successfully selected");
    }
  });
});

route.get("/select/:id", (req, res) => {
  let sql = `SELECT * FROM meal WHERE meal_id = ?;`;
  let params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(500).json({ status: "error" });
      console.log("select id", err);
    } else {
      res.status(200).json(row);
      console.log("meal component was successfully selected");
    }
  });
});

route.put("/update/:id", (req, res) => {
  let id = req.params.id;
  let name = req.body.name;
  let description = req.body.description;
  let components = req.body.components;
  let price = req.body.price;
  let image = req.body.image;
  let orders = req.body.orders;

  console.log(name);
  db.run(
    `
    UPDATE meal SET 
      name = ?,
      type =?,
      description = ?,
      components = ?,
      price = ?,
      image = ?,
      orders = ?
      WHERE meal_id = ?`,
    [name, type, description, components, price, image, orders, id],
    (err) => {
      if (err) {
        res.status(500).json({ status: "error" });
        console.log("update", err);
      } else {
        res.status(201).json({ status: "done!" });
        console.log("meal was successfully updated");
      }
    }
  );
});

route.post("/insert", (req, res) => {
  let name = req.body.name;
  let type = req.body.type;
  let description = req.body.description;
  let components = req.body.components;
  let price = req.body.price;
  let image = req.body.image;
  let orders = req.body.orders;
  db.run(
    `
    INSERT INTO meal (name, type, description, components, price, image, orders)
    VALUES(?, ?, ?, ?, ?, ?, ?)`,
    [name, type, description, components, price, image, orders],
    (err) => {
      if (err) {
        res.status(500).json({ status: "error" });
        console.log("insert", err);
      } else {
        res.status(201).json({ status: "done!" });
        console.log("meal component was successfully inserted");
      }
    }
  );
});

route.delete("/delete/:id", (req, res, next) => {
  db.run(`DELETE FROM meal WHERE meal_id = ?`, [req.params.id], (err) => {
    if (err) {
      res.status(500).json({ status: "error" });
      console.log("delete", err);
    } else {
      res.status(201).json({ status: "done!" });
      console.log("meal component was successfully deleted");
    }
  });
});

route.get("*", (req, res) => {
  console.log("error");
});

module.exports = route;
