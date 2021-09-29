const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Series.findAll();
}

async function getById(id) {
    return await getSeries(id);
}

async function create(params) {
    // validate
    if (await db.Series.findOne({ where: { name: params.nmae } })) {
        throw 'Series "' + params.name + '" is already taken';
    }

    // save user
    await db.Series.create(params);
}

async function update(id, params) {
    const series = await getSeries(id);

    // copy params to user and save
    Object.assign(series, params);
    await series.save();

    return omitHash(series.get());
}

async function _delete(id) {
    const series = await getSeries(id);
    await series.destroy();
}

// helper functions

async function getSeries(id) {
    const series = await db.Series.findByPk(id);
    if (!series) throw 'Series not found';
    return series;
}