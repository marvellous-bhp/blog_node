const express = require('express');
const User = require('../models/user');
// const User = require('../models/user');
// const getUser = require('../config/login.js');

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const login = await User.findOne({ username, password });
  if (login) {
    req.session.loggedInAt = login.loggedInAt;
    let id_user = login._id;
    console.log("id user",id_user);
    console.log(login,"aaaall");
    req.session.userId = login._id;
    res.redirect(`/dashboard`)
  } else {
    res.status(401).send('Incorrect username or password');
  }
});
// function getUser(req, res) {

//   let user_id = req.params.id;

//   User.findOne({'_id': user_id}, (err, user) => {

//       if(err) {
//           return res.json(err);
//       }

//       return res.json(user);

//   });

// }
// router.get('/', getUser());

// Register route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const login = new User({ username, password });
  await login.save();
  res.send('Account created successfully');
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
res.redirect(`/`);
});

module.exports = router;


