const chalk = require('chalk');
const User = require('../models/User');




const passport = require('passport');
const oauthKeys = require('./oauthKeys');



const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GithubStrategy = require('passport-github').Strategy;





/* ----------------------------------------
.          Serialize and Deserialize
---------------------------------------- */
passport.serializeUser((user, done)=>{
  done(null, user.id);
})

passport.deserializeUser((id, done)=>{
  User.findById(id).then(user=> done(null, user));
})




















/* ----------------------------------------
.                    GOOGLE
---------------------------------------- */
passport.use( new GoogleStrategy(
  {
    clientID: oauthKeys.GOOGLE.clientID,
    clientSecret: oauthKeys.GOOGLE.clientSecret,
    callbaackURL: '/auth/google/callback'
  },

  (accessToken, refreshToken, profile, done)=>{    
    console.log(`Google Callback FIRED`);

    User.findOne({ 'google.googleId': profile.id }).then(existingUser =>{
      
      if(existingUser){
        return done(null, existingUser);
      } else {
        User.create({
          'google.googleId': profile.id,
          'google.username': profile.displayName,
          'google.profileImage': profile.photos[0].value,
          'google.email': profile.emails[0].value,


          username: profile.displayName,
          profileImage: profile.photos[0].value,
        })

        .then(newUser =>{
          return done(null, newUser);
        })
      }

    })
  }
))






















/* ----------------------------------------
.                 GITHUB
---------------------------------------- */
passport.use(new GithubStrategy(
  {
    clientID: oauthKeys.GITHUB.clientID,
    clientSecret: oauthKeys.GITHUB.clientSecret,
    callbackURL: '/auth/github/callback'
  },

  (accessToken, refreshToken, profile, done)=>{
    console.log(profile)
    User.findOne({ 'github.githubId': profile.id }).then(existingUser =>{
      if(existingUser){
        return done(null, existingUser);
      } else {
        User.create({
          'github.githubId': profile.id,
          'github.username': profile.displayName,
          'github.email': profile.emails[0].value,
          'github.image': profile.photos[0].value,
          
          username: profile.displayName,
          profileImage: profile.photos[0].value,
        })
      }
    })
  }
))