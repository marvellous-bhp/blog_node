const bcrypt = require('bcrypt');
const User = require('../models/user');

const loginController = {};

loginController.showLoginForm = (req, res) => {
  res.render('login');
};

loginController.processLogin = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.redirect('/login');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.redirect('/login');
    }

    req.session.user = user;
    console.log("success");
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.redirect('/login');
  }
};

loginController.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

module.exports = loginController;
