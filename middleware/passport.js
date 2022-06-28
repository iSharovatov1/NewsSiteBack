const passport = require('passport');
const Users = require('../models').Users;

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'nodeauthsecret';

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, async (payload, done) => {
      console.log('payload', payload);
      try {
        const user = await Users.findByPk(payload.id, {})
        if (user) {
          done(null, user)
        } else {
          done(null, false)
        }
      } catch (e) { console.log(e) }
    })
  )
}