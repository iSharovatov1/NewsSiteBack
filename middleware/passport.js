const { Strategy } = require('passport-jwt');
const { ExtractJwt } = require('passport-jwt');
require('dotenv').config();

const { Users } = require('../db/models');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secretKey;

module.exports = (passport) => {
  passport.use(
    new Strategy(opts, async (payload, done) => {
      try {
        const user = await Users.findByPk(payload.id, {});
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (e) { console.error(e); }
    }),
  );
};
