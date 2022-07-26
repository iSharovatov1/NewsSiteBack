const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');
const bcrypt = require('bcrypt-nodejs');
require('dotenv').config();

const { Users, Tokens } = require('../../db/models');

const key = process.env.secretKey;

async function signup(req, res) {
  const {
    body: {
      firstName,
      lastName,
      avatar,
      email,
      password,
    },
  } = req;
  if (email === '' || password === '' || firstName === '' || lastName === '') {
    return res.status(400).send({ msg: 'Missed data.' });
  }
  const oldUser = await Users.findOne({ where: { email } });
  if (oldUser) res.status(409).send('user already exists');
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  try {
    const user = await Users.create({
      firstName,
      lastName,
      avatar,
      email,
      password: hashPassword,
    });
    const token = jwt.sign(JSON.parse(JSON.stringify(user)), key, { expiresIn: 86400 * 30 });
    const refresh = randtoken.uid(255);
    await Tokens.create({
      userId: user.id,
      token: refresh,
    });
    return res.status(201).cookie('token', refresh).send({ token, user });
  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = { signup };
