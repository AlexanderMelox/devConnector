const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

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

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};
  Profile.find()
  .populate('user', ['name', 'avatar'])
  .then(profiles => {
    if (!profiles) {
      errors.noprofile = 'There are no profiles';
      return res.status(404).json(errors);
    }

    res.json(profiles);
  })
  .catch(err => {
    errors.noprofile = 'There are no profiles';
    res.status(404).json(errors);
  });
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(errors));
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
  // TODO: turn this data into an exports
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

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateExperienceInput(req.body);

  if (!isValid) { 
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const { title, company, location, from, to, current, description } = req.body;
      const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
      }

      // Add to exp array
      profile.experience.unshift(newExp);

      profile.save()
        .then(profile => res.json(profile))
    })
});

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateEducationInput(req.body);

  if (!isValid) { 
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const { school, degree, fieldofstudy, from, to, current, description } = req.body;
      const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
      }

      // Add to exp array
      profile.education.unshift(newEdu);

      profile.save()
        .then(profile => res.json(profile))
    })
});

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => {

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // Get remove index
      const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id);

      // Splice out of array
      profile.experience.splice(removeIndex, 1);

      // Save
      profile.save()
        .then(profile => res.json(profile))
        .catch(err => res.status(404).json(err));
    })
});

module.exports = router;