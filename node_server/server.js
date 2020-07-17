const express = require("express");
const bodyParser = require("body-parser");
const mealRouter = require("./routes/meal_route");
const orderItemRouter = require("./routes/order_item_route");
const orderCheckRouter = require("./routes/order_check_route");
const newsRouter = require("./routes/news_route");
const cors = require("cors");

const PORT = process.env.PORT || 4001;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use("/meal", mealRouter);
app.use("/order-item", orderItemRouter);
app.use("/order-check", orderCheckRouter);
app.use("/news", newsRouter);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something is broken.");
});

app.use(function (req, res, next) {
  res.status(404).send("Sorry we could not find that.");
});

app.listen(PORT, function () {
  console.log(`Server is running on: ${PORT}`);
});
