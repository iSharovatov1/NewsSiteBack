const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');
const bcrypt = require('bcrypt-nodejs');
require('dotenv').config();

const { Users, Tokens } = require('../../db/models');

const key = process.env.secretKey;

async function signin(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ msg: 'Please pass email and password.' });
  }
  try {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(401).send({
        message: 'Authentication failed. User not found.',
      });
    }
    bcrypt.compare(password, user.password, async (err, resp) => {
      if (resp && !err) {
        const token = jwt.sign(JSON.parse(JSON.stringify(user)), key, { expiresIn: 86400 * 30 });
        const refresh = randtoken.uid(255);
        await Tokens.create({
          userId: user.id,
          token: refresh,
        });
        const tokens = await Tokens.findAll({ where: { userId: user.id } });
        tokens.forEach(async (item) => {
          if (new Date() - item.createdAt > 60 * 60 * 1000) {
            await Tokens.destroy({ where: { id: item.id } });
          }
        });
        res.cookie('refresh_token', refresh, {
          secure: false,
          maxAge: 60 * 60 * 1000,
          httpOnly: true,
        });
        return res.json({ success: true, token });
      }
      return res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
    });
  } catch (error) {
    return res.status(400).send(error);
  }
  return res;
}

module.exports = { signin };
