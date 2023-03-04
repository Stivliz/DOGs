const { DataTypes, INTEGER } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

//eportamos la funcion que define al modelo temperament. 
module.exports = (sequelize) => {
    // defino el modelo
sequelize.define('temperament', {

    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    },
    {
        timestamps: false
    });
};
    
    
    