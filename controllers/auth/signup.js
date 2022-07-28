const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');

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
  const regexp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (email.trim() === ''
  || password === ''
  || firstName.trim() === ''
  || lastName.trim() === '') {
    return res.status(400).send({ msg: 'Missed data.' });
  }
  const oldUser = await Users.findOne({ where: { email: email.trim() } });
  if (oldUser) {
    return res.status(409).send('user already exists');
  }
  if (!regexp.test(email)) {
    return res.status(400).send({ msg: 'Invalid email.' });
  }
  try {
    const user = await Users.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      avatar,
      email: email.trim(),
      password,
    });
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
    return res.status(201).send({ token, user });
  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = { signup };
