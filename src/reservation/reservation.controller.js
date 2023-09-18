const express = require("express");
const { getAllReservation } = require("./reservation.services");
const { getOneReservation } = require("./reservation.services");
const { postReservation } = require("./reservation.services");
const { putReservation } = require("./reservation.services");
const { deleteReservation } = require("./reservation.services");
const { confirmReservation } = require("./reservation.services");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const reservation = await getAllReservation();
    res.send(reservation);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const reservation_id = parseInt(req.params.id);
    const reservation = await getOneReservation(reservation_id);
    res.send(reservation);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
router.post("/", async (req, res) => {
  try {
    const newReservationData = req.body;
    const reservation = await postReservation(newReservationData);
    res.send(reservation);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
router.post("/confirm/:id", async (req, res) => {
  try {
    const reservation_id = parseInt(req.params.id);
    const reservation = await confirmReservation(reservation_id);
    res.send(reservation);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
router.put("/:id", async (req, res) => {
  try {
    const reservation_id = parseInt(req.params.id);
    const newReservationData = req.body;
    const reservation = await putReservation(
      reservation_id,
      newReservationData
    );
    res.send(reservation);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const reservation_id = parseInt(req.params.id);
    const newParking = req.body;
    const reservation = await deleteReservation(reservation_id, newParking);
    res.send(reservation);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
