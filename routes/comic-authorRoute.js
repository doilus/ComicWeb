//zaimportowanie bilbioteki express
const express = require('express');
//uzyskanie obiektu routera za pomoc� wywo�ania funkcji
const router = express.Router();
//odwo�anie si� do kontrolera
const comicAuthorsController = require('../controllers/comicAuthorController');

router.get('/', comicAuthorsController.showComicsAuthorList);
router.get('/add', comicAuthorsController.showAddComicsAuthorForm);
router.get('/details/:autcom', comicAuthorsController.showComicsAuthorDetails);
router.get('/edit/:autcom', comicAuthorsController.showEditComicsAuthorForm);

router.post('/add', comicAuthorsController.addComicsAuthor); 
router.post('/edit', comicAuthorsController.updateComicsAuthor);
router.get('/delete/:autcom', comicAuthorsController.deleteComicsAuthor);

module.exports = router;