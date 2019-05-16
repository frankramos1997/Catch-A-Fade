module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: { type: DataTypes.STRING, validate: { isEmail: true } },
    firstname: { type: DataTypes.STRING, notEmpty: true },
    lastname: { type: DataTypes.STRING, notEmpty: true },
    password: { type: DataTypes.STRING, allowNull: false },
  });
  return User;
};
