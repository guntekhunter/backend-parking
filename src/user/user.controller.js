const express = require("express");
const { getAllUser } = require("./user.services");
const { postUser } = require("./user.services");
const { deleteUser } = require("./user.services");
const { loginUser } = require("./user.services");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await getAllUser();
    res.send(users);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
router.post("/login", async (req, res) => {
  try {
    const userData = req.body;
    const user = await loginUser(userData);
    res.send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
router.post("/", async (req, res) => {
  try {
    const newUserData = req.body;
    const user = await postUser(newUserData);
    res.send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const user_id = parseInt(req.params.id);
    const user = await deleteUser(user_id);
    res.send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
