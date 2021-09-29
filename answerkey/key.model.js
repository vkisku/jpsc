const { DataTypes } = require('sequelize');


module.exports = model;

function model(sequelize) {
    const attributes = {
        questionId: { type: DataTypes.STRING, allowNull: false },
        answerId: { type: DataTypes.STRING, allowNull: false },
    };
   
    const options = {
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    tournaments= sequelize.define('Key', attributes, options);
    return tournaments;
}