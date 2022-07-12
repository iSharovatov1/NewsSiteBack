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
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Tokens',
  });
  return Tokens;
};
