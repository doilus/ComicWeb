//zaimportowanie bilbioteki express
const express = require('express');
//uzyskanie obiektu routera za pomoc� wywo�ania funkcji
const router = express.Router();
//odwo�anie si� do kontrolera
const authorController = require('../controllers/authorController');

router.get('/', authorController.showAuthorList);
router.get('/add', authorController.showAddAuthorForm);
router.get('/edit/:autId', authorController.showEditAuthorForm);
router.get('/details/:autId', authorController.showAuthorDetails);

router.post('/add', authorController.addAuthor); 
router.post('/edit', authorController.updateAuthor);
router.get('/delete/:autId', authorController.deleteAuthor);

module.exports = router;