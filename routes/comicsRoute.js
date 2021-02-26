//zaimportowanie bilbioteki express
const express = require('express');
//uzyskanie obiektu routera za pomoc¹ wywo³ania funkcji
const router = express.Router();
//odwo³anie siê do kontrolera
const comicController = require('../controllers/comicController');

router.get('/', comicController.showComicsList);
router.get('/add', comicController.showAddComicsForm);
router.get('/edit/:comId', comicController.showEditComicsForm);
router.get('/details/:comId', comicController.showComicsDetails);

router.post('/add', comicController.addComics); 
router.post('/edit', comicController.updateComics);
router.get('/delete/:comId', comicController.deleteComics);

module.exports = router;