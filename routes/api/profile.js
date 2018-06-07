const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load validation
const validateProfileInput = require('../../validation/profile');

// Load profile model
const Profile = require('../../models/Profile');
// Load user profile
const User = require('../../models/User');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({
  msg: 'Profile works'
}));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.user.id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      } 
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST api/profile/
// @desc    Create or edit user profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Destructure returned obj from validation
  const { errors, isValid } = validateProfileInput(req.body);

  // Check Validation
  if (!isValid) {
    // return any errors with 400 status
    return res.status(400).json(errors);
  }

  // Get fields
  const profileFields = {};
  profileFields.user = req.user.id;

  // Creates an array of the request keys
  const profileKeys = Object.keys(req.body);
  // Iterates through each key and assigns it to the profileFields obj
  profileKeys.forEach(key => {
    if (key === 'skills' && typeof req.body[key] != 'undefined') {
      // Skills - split into array then trims any whitespace      
      profileFields.skills = req.body[key].split(',').map(skill => skill.trim());      
    } else if (req.body[key] && // TODO: turn this check into a function
      (key !== 'youtube' && 
      key !== 'twitter' && 
      key !== 'facebook' && 
      key !== 'linkedin' && 
      key !== 'instagram')) {
        profileFields[key] = req.body[key];
    }
  });

  // Social
  profileFields.social = {};
  const socialURLs = [
    'youtube',
    'twitter',
    'facebook',
    'linkedin',
    'instagram'
  ];

  socialURLs.forEach(url => {
    if (req.body[url]) profileFields.social[url] = req.body[url];
  });

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // If there is a profile then update the current data
      if (profile) {
        // Update
        Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
          .then(profile => res.json(profile))
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle })
          .then(profile => {
            if (profile) {
              errors.handle ='That handle already exists';
              res.status(400).json(errors);
            }

            // Save profile
            new Profile(profileFields).save()
              .then(profile => res.json(profile))
          });
      }
    });
});

module.exports = router;