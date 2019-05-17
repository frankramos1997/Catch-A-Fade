module.exports = function(sequelize, DataTypes) {
  var Barber = sequelize.define('Barber', {
    firstname: { type: DataTypes.STRING, notEmpty: true },
    lastname: { type: DataTypes.STRING, notEmpty: true },
    phone_number: { type: DataTypes.STRING, allowNull: false },
    car_type: { type: DataTypes.STRING, allowNull: true },
    licence_plate: { type: DataTypes.STRING, allowNull: false },
    rate: { type: DataTypes.FLOAT },
    image: { type: DataTypes.STRING },
  });
  return Barber;
};
