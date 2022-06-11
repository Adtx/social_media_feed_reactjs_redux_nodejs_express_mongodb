const User = require('../models/user');
const bcrypt = require("bcrypt");

// user_index, user_details, user_create_get, user_create_user, user_delete

const user_index = (req, res) => {
    User.find()
        .then((result) => res.json( result ))
        .catch((err) => console.log(err));
}

/* const user_details = (req, res) => {
    User.findById(req.params.id)
        .then((result) => res.json( {title: 'User Details', user: result} ))
        .catch((err) => {
            console.log(err);
            res.json({message: 'Oops can\'t find that'})
        });
}; */

/* const user_create_get = (req, res) => {
    res.json( {title: 'Create blog user'} );
}; */

const user_create = async (req, res) => {
    const body = req.body;

    if (!(body.username && body.password)) {
      return res.status(400).send({ error: "Data not formatted properly" });
    }

    // creating a new mongoose doc from user data
    const user = new User(body);
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    user.password = await bcrypt.hash(user.password, salt);
    user.save().then((doc) => res.status(201).send(doc));
};

const user_login = async (req, res) => {
    const user = await User.findOne({ name: req.body.name});
    if (user) {
        // check user password with hashed password stored in the database
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (validPassword) {
          res.status(200).json({ message: "Valid password" });
        } else {
          res.status(400).json({ error: "Invalid Password" });
        }
    } else {
        res.status(401).json({ error: "User does not exist" });
    }
}


const user_delete = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then((result) => res.json({ redirect: '/users'}))
        .catch((err) => console.log(err));
};

module.exports = {
    user_index,
    user_create,
    user_login,
    user_delete
};