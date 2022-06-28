      var LocalStrategy = require('passport-local').Strategy; 
      const Users = require('../models').Users;
 
      module.exports = function(passport) { 
          passport.serializeUser(function(user, done) { 
              done(null, user.id); 
          }); 

          passport.deserializeUser(function(id, done) { 
            Users.findById(id, function(err, user) { 
                done(err, user); 
              }); 
          }); 

          passport.use('local-login', new LocalStrategy({ 
              usernameField : 'email', 
              passwordField : 'password', 
              passReqToCallback : true 
          }, 
          function(req, email, password, done) { 
              if (email) 
              email = email.toLowerCase(); 
              process.nextTick(function() { 
                Users.findOne({ 'local.email' :  email }, 
                  function(err, user)
                { 
                 if (err) 
                   return done(err); 
                 if (!user) 
                   return done(null, false, req.flash('loginMessage',
                   'No user found.')); 
                if (!user.validPassword(password)) 
                  return done(null, false, req.flash('loginMessage',
                  'Wohh! Wrong password.')); 
                else 
                  return done(null, user); 
                }); 
              }); 
           })); 

          passport.use('local-signup', new LocalStrategy({ 
              usernameField : 'email', 
              passwordField : 'password', 
              passReqToCallback : true 
          }, 
          function(req, email, password, done) { 
            if (email) 
            email = email.toLowerCase(); 
            process.nextTick(function() { 
                if (!req.user) { 
                  Users.findOne({ 'local.email' :  email },
                  function(err,user) { 
                if (err) 
                  return done(err); 
                if (user) { 
                  return done(null, false, req.flash('signupMessage',
                   'Wohh! the email is already taken.')); 
                }
                else { 
                  var newUser = new User(); 
                  newUser.local.name = req.body.name; 
                  newUser.local.email = email; 
                  newUser.local.password = newUser.generateHash(password); 
                  newUser.save(function(err) { 
                 if (err) 
                   throw err; 
                   return done(null, newUser); 
                  }); 
                 } 
              }); 
             } else { 
               return done(null, req.user); 
             }}); 
          })); 
      }; 
