const express = require("express");
const bodyParser = require("body-parser");
const db = require("../db");

let route = express();
route.use(express.static(__dirname + "/public"));
route.use(bodyParser.urlencoded());
route.use(bodyParser.json());

route.get("/select", (req, res) => {
  db.all(`SELECT * FROM order_item;`, (err, rows) => {
    if (err) {
      res.status(500).json({ status: "error" });
      console.log("select", err);
    } else {
      res.status(200).json(rows);
      console.log("orders was successfully selected");
    }
  });
});

route.get("/select/:id", (req, res) => {
  let sql = `SELECT * FROM order_item WHERE item_id = ?;`;
  let params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(500).json({ status: "error" });
      console.log("select id", err);
    } else {
      res.status(200).json(row);
      console.log("order item was successfully selected");
    }
  });
});

route.put("/update/:id", (req, res) => {
  let id = req.params.id;
  let mealId = req.body.mealId;
  let number = req.body.number;
  let checkId = req.body.checkId;

  db.run(
    `
    UPDATE order_item SET 
      mealId = ?,
      number =?,
      checkId = ?
      WHERE item_id = ?`,
    [mealId, number, checkId, id],
    (err) => {
      if (err) {
        res.status(500).json({ status: "error" });
        console.log("update", err);
      } else {
        res.status(201).json({ status: "done!" });
        console.log("order item was successfully updated");
      }
    }
  );
});

route.post("/insert", (req, res) => {
  let mealId = req.body.mealId;
  let number = req.body.number;
  let checkId = req.body.checkId;
  db.run(
    `
    INSERT INTO order_item (meal_id, number, check_id)
    VALUES(?, ?, ?)`,
    [mealId, number, checkId],
    (err) => {
      if (err) {
        res.status(500).json({ status: "error" });
        console.log("insert", err);
      } else {
        res.status(201).json({ status: "done!" });
        console.log("order item was successfully inserted");
      }
    }
  );
});

route.delete("/delete/:id", (req, res, next) => {
  db.run(`DELETE FROM order_item WHERE item_id = ?`, [req.params.id], (err) => {
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
