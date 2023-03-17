function getUser(req, res) {

    let user_id = req.params.id;

    User.findOne({'id': user_id}, (err, user) => {

        if(err) {
            return res.json(err);
        }

        return res.json(user);

    });

}