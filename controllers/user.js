const { Users } = require('../db/models');

async function updateUser(req, res) {
  const [name, surname, login, password] = req.body;
  try {
    const user = await Users.findOne({ where: { login } });
    if (!user) {
      return res.status(404).send({
        message: 'User Not Found',
      });
    }
    try {
      const updatedUser = await Users.update({
        name,
        surname,
        login,
        password,
      });
      return res.status(200).send(updatedUser);
    } catch (error) {
      return res.status(400).send(error);
    }
  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = { updateUser };
