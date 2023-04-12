const express = require('express');
const User = require('../models/user');
// const User = require('../models/user');
// const getUser = require('../config/login.js');

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // console.log("ema,pa",req.body);
  const login = await User.findOne({ email, password });
  if (login) {
    req.session.loggedInAt = login.loggedInAt;
    // console.log(login,"aaaall");
    req.session.userId = login._id;
    res.redirect(`/dashboard`)
  } else {
    res.status(401).send('Incorrect username or password');
  }
});

// Register route
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  console.log("rb: ",req.body);
  const existingLogin = await User.findOne({ email });
  if (existingLogin) {
    res.status(409).send('Username already exists');
    return;
  }
  const login = new User({ name, email, password });
  await login.save();
  // res.send('Account created successfully');
  res.redirect("/")
});
  
  // Logout route
router.post('/logout', (req, res) => {
req.session.destroy();
console.log(req.session,"hello");
res.redirect(`/`);
});

module.exports = router;


