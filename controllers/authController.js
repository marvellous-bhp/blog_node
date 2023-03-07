const User = require('../models/user');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    req.session.user = user;
    res.redirect('/profile');
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');
    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error('Invalid credentials');
    req.session.user = user;
    res.redirect('/profile');
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

exports.isAuthenticated = (req, res, next) => {
  if (!req.session.user) return res.redirect('/');
  next();
};
