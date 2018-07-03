const validator = require('validator');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');


var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        minlength: 1,
        required: true,
        unique: true, // email have to be unique
        validate: {
            validator:  validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

// limits what the user can get back (here only email and id) from JSON
UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({
        _id: user._id.toHexString(), 
        access
    }, 
    process.env.JWT_SECRET);

    user.tokens = user.tokens.concat([{access, token}]);

    return user.save().then(() => {
        return token;
    });
};

UserSchema.methods.removeToken = function (token) {
    var user = this;

    return user.update({
        // the pull operator removes whatever meets the criteria from the array
        $pull: {
            tokens: {
                token: token // will remove the whole token object
            }
        }
    });
};

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;
  
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      return Promise.reject();
    }
  
    return User.findOne({
      '_id': decoded._id,
      'tokens.token': token,
      'tokens.access': 'auth'
    });
};

UserSchema.statics.findByCredentials = function (email, password) {
    
    var User = this;
    // find the user with the email, then check if the password is correct
    return User.findOne({email}).then((user) => {

        // if the user does not exist, reject the promise for server.js to respond with error
        if (!user){
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {

                // if the password matches
                if (res) { 
                    resolve(user); // pass the user data back to server.js
                } else {
                    reject();
                }
            });
        });
    });
};

// this will run before 'save'
UserSchema.pre('save', function (next){
    var user = this;

    // check if the password is modified, if modified return true
    if (user.isModified('password')) {
        // user.password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });

        // user.password = hash
        
    } else {
        next();
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = {User};