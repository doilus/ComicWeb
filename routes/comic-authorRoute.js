//zaimportowanie bilbioteki express
const express = require('express');
//uzyskanie obiektu routera za pomoc¹ wywo³ania funkcji
const router = express.Router();
//odwo³anie siê do kontrolera
const comicAuthorsController = require('../controllers/comicAuthorController');

router.get('/', comicAuthorsController.showComicsAuthorList);
router.get('/add', comicAuthorsController.showAddComicsAuthorForm);
router.get('/details/:autcom', comicAuthorsController.showComicsAuthorDetails);
router.get('/edit/:autcom', comicAuthorsController.showEditComicsAuthorForm);

router.post('/add', comicAuthorsController.addComicsAuthor); 
router.post('/edit', comicAuthorsController.updateComicsAuthor);
router.get('/delete/:autcom', comicAuthorsController.deleteComicsAuthor);

module.exports = router;