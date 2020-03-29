const knex = require('knex');
const configurarion = require('../../knexfile');
const config = process.env.NODE_ENV == 'test' ? configurarion.test : configurarion.development;
const connection = knex(config);
module.exports = connection;