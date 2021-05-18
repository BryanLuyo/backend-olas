'use strict';
const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {
    PORT,
    HOST,
    HOST_URL,
    FIREBASE_PATH,
    SECRET
} = process.env;

assert(PORT, 'El puerto es requerido');
assert(HOST, 'El host es requerido');

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    firebase : FIREBASE_PATH,
    secret : SECRET
}