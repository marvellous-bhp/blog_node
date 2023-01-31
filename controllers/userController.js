
let index = (req, res) => {
    return res.render("users/index");
}
  
let login = (req, res) => {
  return res.render("sign/login");
}

let register = (req, res) => {
  return res.render("sign/register");
}

let fakeUser = (req, res) => {
  user.create({email: "test@gmail.com", password: bcrypt.hashSync("12345678", bcrypt.genSaltSync(12))})
  return res.render("sign/login");
}
  
module.exports = {
  index: index,
  login: login,
  fakeUser: fakeUser
}
  