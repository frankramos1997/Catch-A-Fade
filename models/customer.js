module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define('Customer', {
    firstname: { type: DataTypes.STRING },
    lastname: { type: DataTypes.STRING },
    phone_number: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    user_id: { type: DataTypes.STRING },
  });
  return Customer;
};
