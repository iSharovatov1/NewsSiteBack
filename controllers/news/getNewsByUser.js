const { News } = require('../../db/models');

async function getNewsByUser(req, res) {
  const { params: { userId } } = req;
  try {
    const news = await News.findAll({
      where: { userId },
    });
    return res.status(200).send(news);
  } catch (error) {
    return res.status(404).send(error);
  }
}

module.exports = { getNewsByUser };
