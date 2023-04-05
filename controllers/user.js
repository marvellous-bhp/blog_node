const Comment = require('../models/comment');
const Article = require('../models/article');
const User = require('../models/user');


exports.getAllUser = async (req, res) => {
  try {
    let user = await User.find();
    let users = []
    console.log(user,"ll");
    for(let i=0;i<user.length;i++){
        users.push(user[i])
        console.log(user[i],"mm");
    }
    for(let i=0; i<users.length; i++){
        let articles = await Article.find({User:users[i]._id.toString()})
        let art_count = articles.length;
        users[i]["arts_count"] = art_count;
        console.log(users[i],"uu");

    }
    // console.log("list u",users);
    res.render('users/listUser', { users })
    // res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

