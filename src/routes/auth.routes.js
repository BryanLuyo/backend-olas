const Users = require('../controllers/auth.controller');
module.exports = (router) => {
    router.post('/login',Users.loginUser);
}