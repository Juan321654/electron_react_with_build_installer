const express = require("express");
const router = express.Router();
const { User } = require("../models");

router.get("/users", async (req, res) => {
  const users = await User.findAll();

  // if there is no user, create one and return it
  if (users.length === 0) {
    const user = await User.create({
      name: "John",
      lastName: "Doe",
    });
    return res.send([user]);
  } else {
    return res.send(users);
  }
});

router.post("/users", async (req, res) => {
  const user = await User.create({
    name: req.body.name,
    lastName: req.body.lastName,
  });
  return res.send(user);
});

module.exports = router;
