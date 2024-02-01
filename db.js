const pgp = require('pg-promise')();
const db = pgp('postgres://postgres:manga13@dorah:5432/software');

module.exports = db;
