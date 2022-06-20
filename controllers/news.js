const News = require('../models').News;

module.exports = {
  list(req, res) {
    return News
      .findAll({
        order:[
          "id",
        ],
      })
      .then((news) => {
        console.log('+');
        console.log(req.query, req.params, req.body);
        res.status(200).send(news)
      })
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    console.log(req);
    
    return News
      .findByPk(req.query.id, {
      })
      .then((news) => {
        if (!news) {
          return res.status(404).send({
            message: 'News Not Found',
          });
        }
        return res.status(200).send(news);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    console.log('add', req);
    return News
      .create({
        title: req.body.title,
        text: req.body.text,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .then((news) => res.status(201).send(news))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return News
      .findByPk(req.params.id, {})
      .then(news => {
        if (!news) {
          return res.status(404).send({
            message: 'News Not Found',
          });
        }
        return News
          .update({
            title: req.body.title,
            text: req.body.text,
          })
          .then(() => res.status(200).send(news))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return News
      .findByPk(req.params.id)
      .then(news => {
        console.log(news);
        if (!news) {
          return res.status(400).send({
            message: 'News Not Found',
          });
        }
        return News
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};