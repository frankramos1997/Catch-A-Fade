module.exports = function(sequelize, DataTypes) {
  var Appointment = sequelize.define('Appointment', {
    date: { type: DataTypes.DATEONLY },
    user_id: { type: DataTypes.STRING },
    barber_id: { type: DataTypes.STRING },
  });
  return Appointment;
};
