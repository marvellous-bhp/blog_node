const express = require('express');
const User = require('../models/user');


const router = express.Router();

// Login route
router.post('/listUser', async (req, res) => {
  let listUser = await User.find();
  res.render('users/listUser', { listUser })
});

router.get('/edit/:id', async (req, res) => {
    let id = req.params.id;
    // console.log("idd",id);
    let user = await User.find({_id: id});
    console.log("fasgas",user);
    res.render('users/editUser', { user: user });
});

router.post('/edit/:id', async (req, res) => {
    let id = req.params.id;
    let user = await User.find({_id: id}).update(
        [
            {
                $set: {
                    name: req.body.name,
                    email : req.body.email
                }
            }
        ]
    )

    res.redirect('/listUser');
  });
router.post('/delete/:id', async (req, res) => {
    let id = req.params.id;
    let user = req.session.id
    console.log(user);
await User.findByIdAndDelete(req.params.id)
console.log(req.params.id,"ddd");
res.redirect('/listUser')
})

module.exports = router;


