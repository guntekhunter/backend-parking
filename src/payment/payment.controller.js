const express = require("express");
const { getAllPayment } = require("./payment.services");
const { getOnePayment } = require("./payment.services");
const { postPayment } = require("./payment.services");
const { deletePayment } = require("./payment.services");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const payment = await getAllPayment();
    res.send(payment);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const payment_id = parseInt(req.params.id);
    const payment = await getOnePayment(payment_id);
    res.send(payment);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
router.post("/", async (req, res) => {
  try {
    const newPayment = req.body;
    const paymentSpots = await postPayment(newPayment);
    res.send(paymentSpots);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const payment_id = parseInt(req.params.id);
    const payment = await deletePayment(payment_id);
    res.send(payment);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
