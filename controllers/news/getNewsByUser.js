const { News } = require('../../db/models');

async function getNewsByUser(req, res) {
  try {
    const news = await News.findAll({
      include: 'user',
      where: { userId: req.params.id },
    });
    return res.status(200).send(news);
  } catch (error) {
    return res.status(404).send(error);
  }
}

module.exports = { getNewsByUser };
