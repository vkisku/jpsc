const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // init models and add them to the exported db object
    db.Series = require('../series/series.model')(sequelize);
    // db.Scores = require('../scores/socres.model')(sequelize);
    db.Key = require('../answerkey/key.model')(sequelize);

    db.Paper = require('../paper/paper.model')(sequelize);

    db.Series.hasMany(db.Key,{as: 'series'});
    db.Paper.hasMany(db.Series,{as:'paper'});
    // db.Tournaments.hasOne(db.Organizers);

    // sync all models with database
    await sequelize.sync();
    
}