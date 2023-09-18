const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { v4 } = require("uuid");

app.get("/api", (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get("/api/item/:slug", (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://127.0.0.1:3000" }));

dotenv.config();

const port = process.env.PORT;

// import controller
const userController = require("./src/user/user.controller");
const parkingController = require("./src/parking/parking.controller");
const parkingPlaceController = require("./src/parking-place/parking-place.controller");
const reservationController = require("./src/reservation/reservation.controller");
const paymentController = require("./src/payment/payment.controller");

//routes
app.use("/users", userController);
app.use("/parking", parkingController);
app.use("/parking-place", parkingPlaceController);
app.use("/reservation", reservationController);
app.use("/payment", paymentController);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
