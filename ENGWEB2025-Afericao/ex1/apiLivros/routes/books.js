var express = require('express');
var router = express.Router();
var Book = require('../controllers/books')

/* GET all books or filtered by character/genre/author */
router.get('/', function(req, res, next) {
  if (req.query.character) {
    Book.listByCharacter(req.query.character)
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro))
  }
  else if (req.query.genre) {
    Book.listByGenre(req.query.genre)
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro))
  }
  else if (req.query.author) {
    Book.listByAuthor(req.query.author)
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro))
  }
  else {
    Book.list()
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro))
  }
});

/* GET unique list of genres */
router.get('/genres', function(req, res, next) {
  Book.getGenres()
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

/* GET unique list of characters */
router.get('/characters', function(req, res, next) {
  Book.getCharacters()
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

/* GET book by ID */
router.get('/:id', function(req, res, next) {
  Book.findById(req.params.id)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

/* POST new book */
router.post('/', function(req, res, next) {
  Book.insert(req.body)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

/* DELETE book */
router.delete('/:id', function(req, res, next) {
  Book.remove(req.params.id)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

/* PUT update book */
router.put('/:id', function(req, res, next) {
  Book.update(req.params.id, req.body)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

module.exports = router;
