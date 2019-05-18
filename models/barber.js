module.exports = function(sequelize, DataTypes) {
  var Barber = sequelize.define('Barber', {
    firstname: { type: DataTypes.STRING },
    lastname: { type: DataTypes.STRING },
    phone_number: { type: DataTypes.STRING },
    car_type: { type: DataTypes.STRING },
    licence_plate: { type: DataTypes.STRING },
    rate: { type: DataTypes.FLOAT },
    image: { type: DataTypes.STRING },
    isUpdated: { type: DataTypes.BOOLEAN, defaultValue: 0 },
    user_id: { type: DataTypes.STRING },
  });
  return Barber;
};
