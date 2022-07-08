const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tokens extends Model {
    static associate(models) {
      Tokens.hasOne(models.Users, {
        foreignKey: 'id',
        as: 'Users',
      });
    }
  }
  Tokens.init({
    token: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Tokens',
  });
  return Tokens;
};
