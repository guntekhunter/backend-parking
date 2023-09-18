const express = require("express");
const { getAllParking } = require("./parking.services");
const { getOneParking } = require("./parking.services");
const { postParkingSpots } = require("./parking.services");
const { deleteParking } = require("./parking.services");
const { putParking } = require("./parking.services");

const router = express.Router();

router.get("/parking-spots/:id", async (req, res) => {
  try {
    const parking_id = parseInt(req.params.id);
    const parking = await getAllParking(parking_id);
    res.send(parking);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const parking_id = parseInt(req.params.id);
    const parking = await getOneParking(parking_id);
    res.send(parking);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const newParkingSpots = req.body;
    const parkingSpots = await postParkingSpots(newParkingSpots);
    res.send(parkingSpots);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
router.put("/:id", async (req, res) => {
  try {
    const spot_id = parseInt(req.params.id);
    const newSpotData = req.body;
    const spot = await putParking(spot_id, newSpotData);
    res.send(spot);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const parking_id = parseInt(req.params.id);
    const parking = await deleteParking(parking_id);
    res.send(parking);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
