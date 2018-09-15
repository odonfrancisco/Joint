const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');

const router = express.Router();
const User = require('../models/User');

router.post('/signup', (req, res, next) => {
    const { username, password } = req.body.data;
  

    if (!username || !password) {
      res.status(400).json({ message: 'Please provide both a username and password' });
      return;
    }
  
    // What is '_id'?
    User.findOne({ username }, '_id', (err, user) => {
      if (user) {
        res.status(400).json({ message: 'This username already exists' });
        return;
      }
  
      const salt     = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);
  
      const newUser = new User({
        username,
        password: hashPass
      });
  
      newUser.save((err) => {
        if (err) {
          res.status(400).json({ message: 'Something with our server went wrong, try again or send us feedback' });
          return;
        }
  
        req.login(newUser, (err) => {
          if (err) {
            res.status(500).json({ message: 'Something with our server went wrong, try again or send us feedback' });
            return;
          }
  
          res.status(200).json(req.user);
        });
        })
    })
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong in our servers, try again or kindly send us feedback' });
        return;
      }
  
      if (!theUser) {
        res.status(401).json(failureDetails);
        return;
      }
  
      req.login(theUser, (err) => {
        if (err) {
          res.status(500).json({ message: 'Something went wrong in our servers, try again or kindly send us feedback' });
          return;
        }
        console.log(req.session)
  
        res.status(200).json(req.user);
      });
    })(req, res, next);
});

router.get('/loggedin', (req, res, next) => {
    if (req.isAuthenticated()) {
      res.status(200).json(req.user);
      return;
    }
    res.status(403).json({message: 'Unauthorized'})
})

router.get('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({message: 'Success in logging out'});
})

router.get('/allUsers', (req, res, next) => {
  User.find({}, {username:1})
    .then(users => {
      res.status(200).json({users})
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;