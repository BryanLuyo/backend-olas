const firebase = require('firebase-admin');
const config = require('../config/config');
const serviceAccount = require('../../surf-now-a574d-firebase-adminsdk-d6uwf-df4d79b162.json');
const db = firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)
});

module.exports = db;