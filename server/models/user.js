const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../config/config').get(process.env.NODE_ENV);
const SALT_I = 10;

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    firstname: {
        type: String,
        maxLength: 100
    },
    lastname: {
        type: String,
        maxLength: 100
    },
    role: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    token: {
        type: String
    }
}, { timestamps: true})

/*******************************************************/
/* FUNCTIONS FOR USER AUTHENTICATION AND AUTHORISATION.*/
/*******************************************************/

// Before registering a new user create a password hash.
userSchema.pre('save',function(next) {
    var user = this;  // User is saved in this.

// If user password is modified, create a hash for the new password.
    if(user.isModified('password')) {
        bcrypt.genSalt(SALT_I,function(err, salt) {
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else {
        next()
    }
})

// Before user login, compare if passwords match. <<comparePassword>>
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword,this.password,function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    })
}

// Generating token for user after successful login. <<generateToken>>
userSchema.methods.generateToken = function(cb){
    var user = this;
    var token = jwt.sign(user._id.toHexString(), config.SECRET); // requires a user id and our app secret password.

    user.token = token;
    user.save(function(err, user) {
        if(err) return cb(err);
        cb(null, user)
    })
}

// Verifying if user token is correct. <<findByToken>>
// This is part of the middleware for access restriction.
userSchema.statics.findByToken = function(token, cb) {
    var user  = this;

    jwt.verify(token, config.SECRET, function(err, decode) { // jwt verify method returns the id of the user if the token is correct.
        user.findOne({"_id": decode, "token": token}, function(err, user) { // finding user by id and by token
            if(err) return cb(err);
            cb(null, user)
        })
    })
}

// Deleting user token to log them out. <<deleteToken>>
userSchema.methods.deleteToken = function(token,cb){
    var user = this;

    user.update({$unset:{token:1}}, (err, user) => {
        if(err) return cb(err);
        cb(null, user)
    })
}
/****************** END **************************/

const User = mongoose.model('User', userSchema);

module.exports = { User };
