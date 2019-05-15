module.exports = function(sequelize, DataTypes) {
  var Barber = sequelize.define("Barber", {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Barber;
};
