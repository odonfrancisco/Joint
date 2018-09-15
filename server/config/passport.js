const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = (passport) => {
    passport.use(new LocalStrategy((username, password, next) => {
        User.findOne({ username }, (err, foundUser) => {
            if (err) {
                next(err);
                return;
            }

            if (!foundUser) {
                next(null, false, { message: 'Your username or password is out of this world'});
                return;
            }

            if (!bcrypt.compareSync(password, foundUser.password)) {
                next(null, false, { message: 'Your username or password is out of this world'});
                return;
            }

            next(null, foundUser);
        });
    }));

    passport.serializeUser((loggedInUser, cb) => {
        cb(null, loggedInUser._id);
    });

    passport.deserializeUser((userIdFromSession, cb) => {
        User.findById(userIdFromSession, (err, userDocument) => {
            if (err) {
                cb(err);
                return;
            }

            cb(null, userDocument);
        });
    });

}