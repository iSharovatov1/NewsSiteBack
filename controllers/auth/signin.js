const randtoken = require('rand-token');

const { Users, Tokens } = require('../../db/models');
const { createToken } = require('./createToken');

async function signin(req, res) {
  const { body: { email, password } } = req;
  if (email.trim() === '' || password === '') {
    return res.status(400).send({ msg: 'Missed data.' });
  }
  try {
    const user = await Users.findOne({ where: { email: email.trim() } });
    if (!user) {
      return res.status(401).send({
        message: 'Authentication failed. User not found.',
      });
    }
    const isCompare = user.comparePassword();
    if (isCompare) {
      const token = createToken(user.id);
      const refresh = randtoken.uid(255);
      await Tokens.create({
        userId: user.id,
        token: refresh,
      });

      res.cookie('refreshToken', refresh, {
        secure: false,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json({ success: true, token, user });
    }
    return res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = { signin };
