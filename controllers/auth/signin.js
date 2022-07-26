const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');

const { Users, Tokens } = require('../../db/models');

const key = process.env.secretKey;

async function signin(req, res) {
  const { body: { email, password } } = req;
  if (email === '' || password === '') {
    return res.status(400).send({ msg: 'Missed data.' });
  }
  try {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(401).send({
        message: 'Authentication failed. User not found.',
      });
    }
    const isCompare = await user.comparePassword(password);
    if (isCompare) {
      const token = jwt.sign(JSON.parse(JSON.stringify(user)), key, { expiresIn: 86400 * 30 });
      const refresh = randtoken.uid(255);
      await Tokens.create({
        userId: user.id,
        token: refresh,
      });

      res.cookie('refreshToken', refresh, {
        secure: false,
        maxAge: 60 * 60 * 1000,
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
