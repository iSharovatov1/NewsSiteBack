const { Users } = require('../../db/models');
const { createTokenWithAttachCookies } = require('./createTokenWithAttachCookies');

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
    const isCompare = user.comparePassword(password);
    if (isCompare) {
      const token = await createTokenWithAttachCookies(user.id, res);
      return res.json({ success: true, token, user });
    }
    return res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = { signin };
