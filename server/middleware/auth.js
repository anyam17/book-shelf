const { User } = require('./../models/user');

let auth = (req, res, next) => {
    let token = req.cookies.auth; // token obtained from the browser cookie named auth

    // User model has the findByToken method for checking if user token is correct
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({
            error: true
        });

        // if user token is correct, add it to the request header.
        req.token = token;
        req.user = user
        next();
    })

}

module.exports = { auth }