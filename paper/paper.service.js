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
    return await db.Paper.findAll();
}

async function getById(id) {
    return await getPaper(id);
}

async function create(params) {
    // validate
    if (await db.Paper.findOne({ where: { name: params.name } })) {
        throw 'Paper "' + params.name + '" is already taken';
    }

    // hash password
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // save user
    await db.Paper.create(params);
}

async function update(id, params) {
    const paper = await getPaper(id);
    // copy params to user and save
    Object.assign(paper, params);
    await paper.save();

    return paper.get();
}

async function _delete(id) {
    const paper = await getPaper(id);
    await paper.destroy();
}

// helper functions

async function getPaper(id) {
    const paper = await db.Paper.findByPk(id);
    if (!paper) throw 'Paper not found';
    return paper;
}