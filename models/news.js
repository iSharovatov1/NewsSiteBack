'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    static associate(models) {}
  }
  News.init({
    title: DataTypes.STRING,
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
};