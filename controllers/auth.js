const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');
const bcrypt = require('bcrypt-nodejs');
require('dotenv').config();

const { Users } = require('../db/models');
const { Tokens } = require('../db/models');

const key = process.env.secretKey;

async function signup(req, res) {
  const {
    login,
    password,
    name,
    surname,
  } = req.body;
  if (!login || !password) {
    return res.status(400).send({ msg: 'Please pass login and password.' });
  }
  try {
    const oldUser = await Users.findAll({ where: { surname: req.body.surname } });
    if (oldUser.length) res.status(409).send('user already exists');

    const hashPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null);

    const user = await Users.create({
      name,
      surname,
      login,
      password: hashPassword,
    });

    const token = jwt.sign(JSON.parse(JSON.stringify(user)), key, { expiresIn: 86400 * 30 });
    const refresh = randtoken.uid(255);

    await Tokens.create({
      user_id: user.id,
      token: refresh,
    });

    return res.status(201).cookie('token', refresh).send({ token });
  } catch (error) {
    return res.status(400).send(error);
  }
}
async function signin(req, res) {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.status(400).send({ msg: 'Please pass login and password.' });
  }
  try {
    const user = await Users.findOne({
      where: {
        login,
      },
    });

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
          user_id: user.id,
          token: refresh,
        });
        const tokens = await Tokens.findAll({
          order: [
            ['createdAt', 'DESC'],
          ],
          where: {
            user_id: user.id,
          },
        });
        tokens.forEach(async (item) => {
          if (new Date() - item.createdAt > 60 * 60 * 1000) {
            await Tokens.destroy({
              where: {
                id: item.id,
              },
            });
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

module.exports = {
  signup,
  signin,
};
