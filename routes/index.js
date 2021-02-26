var express = require('express');
var router = express.Router();
const i18n = require('i18n');

const LangController = require('../controllers/LangController');
router.get('/changeLang/:lang', LangController.changeLang);


const AuthController = require('../controllers/authController');
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { navLocation: 'main' });
});


module.exports = router;
