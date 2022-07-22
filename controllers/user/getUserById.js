const { Users } = require('../../db/models');

async function getUserById(req, res) {
  const { params: { id } } = req;
  try {
    const user = await Users.findOne({
      where: { id },
    });
    if (user === null) return res.status(404).send('User not found');
    return res.status(200).send(user);
  } catch (error) {
    return res.status(404).send(error);
  }
}

module.exports = { getUserById };
