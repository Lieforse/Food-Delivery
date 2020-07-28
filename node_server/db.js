const sqlite3 = require("sqlite3");
let db = new sqlite3.Database("./db/food_delivery.sqlite", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the test DB");
  }
});

db.serialize(() => {
  db.run(`
  CREATE TABLE IF NOT EXISTS meal(
    meal_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name TEXT NOT NULL,
    type TEXT,
    description TEXT,
    components TEXT,
    price INTEGER,
    image TEXT,
    orders INTEGER
  );`);

  db.run(`
  CREATE TABLE IF NOT EXISTS order_check(
    check_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    date DATETIME
    );`);

  db.run(`
  CREATE TABLE IF NOT EXISTS order_item(
    item_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    meal_id INTEGER,
    number INTEGER,
    check_id INTEGER,
    FOREIGN KEY (meal_id)
      REFERENCES meal (meal_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (check_id)
      REFERENCES order_check (check_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    );`);

  db.run(`
  CREATE TABLE IF NOT EXISTS news(
    news_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name TEXT,
    content TEXT,
    image TEXT,
    date DATETIME,
    views INTEGER
    );`);
});

module.exports = db;
