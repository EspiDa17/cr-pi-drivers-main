const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Drivers', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false
    },

    nationality: {
      type: DataTypes.STRING,
      allowNull: false
    },

    birthdate: {
      type: DataTypes.STRING,
      allowNull: false
    },

  });
};