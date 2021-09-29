const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const keyService = require('./key.service');

// routes
router.post('/register', authorize(),registerSchema, register);
router.get('/', authorize(), getAll);
router.get('/current', authorize(), getCurrent);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function registerSchema(req, res, next) {
    const schema = Joi.object({
        SeriesId:Joi.number().required(),
        questionId:Joi.string().required(),
        answerId: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
   
    keyService.create(req.body)
        .then(() => res.json({ message: 'Key Registration successful' }))
        .catch(next);
}

function getAll(req, res, next) {
    keyService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.user);
}

function getById(req, res, next) {
    keyService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        SeriesId: Joi.number().empty(''),
        questionId: Joi.string().empty(''),
        answerId: Joi.string().empty(''),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    keyService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}

function _delete(req, res, next) {
    keyService.delete(req.params.id)
        .then(() => res.json({ message: 'Series deleted successfully' }))
        .catch(next);
}