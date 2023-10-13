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
    
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },

    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },

    descripción: {
      type: DataTypes.STRING,
      allowNull: false
    },

    imagen: {
      type: DataTypes.STRING,
      allowNull: false
    },

    nacionalidad: {
      type: DataTypes.STRING,
      allowNull: false
    },

    fechaDeNacimiento: {
      type: DataTypes.STRING,
      allowNull: false
    },

  });
};