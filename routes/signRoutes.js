const express = require('express');
const Login = require('../models/user');

const router = express.Router();

// Login route
router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const login = await Login.findOne({ username, password });
  if (login) {
    req.session.loggedInAt = login.loggedInAt;
    res.send('Logged in successfully');
  } else {
    res.status(401).send('Incorrect username or password');
  }
});

// Register route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const login = new Login({ username, password });
  await login.save();
  res.send('Account created successfully');
});

// Register route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const existingLogin = await Login.findOne({ username });
    if (existingLogin) {
      res.status(409).send('Username already exists');
      return;
    }
    const login = new Login({ username, password });
    await login.save();
    res.send('Account created successfully');
  });
  
  // Logout route
router.post('/logout', (req, res) => {
req.session.destroy();
res.send('Logged out successfully');
});

module.exports = router;


