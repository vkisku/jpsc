const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const { param } = require('./key.controller');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Key.findAll();
}

async function getById(id) {
    return await getUser(id);
}

async function create(params) {
    // validate
    if (await db.Series.findOne({where: {id:params.SeriesId}})){
        if (await db.Key.findOne({ where: { name: params.name } })) {
            throw 'Key Name "' + params.name + '" is already taken';
        }
    }
    else{
        throw 'No Series Selected';
    }

   
    await db.Key.create(params);
}

async function update(id, params) {
    const key = await getKey(id);
    // copy params to user and save
    Object.assign(key, params);
    await key.save();

    return key.get();
}

async function _delete(id) {
    const key = await getKey(id);
    await key.destroy();
}

// helper functions

async function getKey(id) {
    const key = await db.Key.findByPk(id);
    if (!key) throw 'Key not found';
    return key;
}