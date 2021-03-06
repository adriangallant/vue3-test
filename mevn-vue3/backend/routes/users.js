var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../db');
const { SECRET } = require('../constants');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

router.post('/register', async (req, res) => {
  const { name, password } = req.body;
  const existingUser = await User.findOne({ name });
  if (existingUser) {
    return res.json({ err: 'user already exists' }).status(401);
  }
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = new User({
    name,
    password: hashedPassword
  })
  await user.save();
  res.json(user).status(201);
});

router.post('/login', async (req, res) => {
  const { name, password } = req.body;
  const { _id, password: userPassword } = await User.findOne({ name });
  const match = await bcrypt.compare(password, userPassword);
  if (match) {
    const token = await jwt.sign({ name, _id }, SECRET);
    return res.json({ token });
  }
  res.status(401);
});

module.exports = router;

// https://thewebdev.info/2020/09/29/create-a-full-stack-web-app-with-the-mevn-stack/ <-- TUTORIAL