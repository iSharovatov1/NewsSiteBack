const { Users } = require('../../db/models');
const { createTokenWithAttachCookies } = require('./createTokenWithAttachCookies');

async function signup(req, res) {
  const {
    body: {
      firstName,
      lastName,
      email,
      password,
    },
  } = req;
  const payload = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim(),
    password,
    avatar: '',
  };
  const regexp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (
    payload.email === ''
    || password === ''
    || payload.firstName === ''
    || payload.lastName === ''
  ) {
    return res.status(400).send({ msg: 'Missed data.' });
  }
  const oldUser = await Users.findOne({ where: { email: email.trim() } });
  if (oldUser) {
    return res.status(409).send('user already exists');
  }
  if (!regexp.test(payload.email)) {
    return res.status(400).send({ msg: 'Invalid email.' });
  }
  try {
    const user = await Users.create(payload);
    const token = await createTokenWithAttachCookies(user.id, res);
    return res.status(201).send({ token, user });
  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = { signup };
