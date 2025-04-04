var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page */
router.get('/', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16);
  axios.get('http://localhost:17000/books')
  .then(resp => {
    res.status(200).render('index', {'blist': resp.data, 'date': date});
  })
  .catch(erro => {
    res.status(500).render('error', { 'error': erro });
  })
});

/* GET registration page */
router.get('/registo', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16);
  res.status(200).render('addBookPage', {'date': date});
});

/* POST new book */
router.post('/registo', function(req, res, next) {
  var body = req.body

  axios.post('http://localhost:17000/books', body)
  .then(resp => {
    res.status(201).redirect('/');
  })
  .catch(erro => {
    res.status(500).render('error', { 'error': erro });
  })
});

router.get('/delete/:id', function(req, res, next) {
  var id = req.params.id
  axios.delete('http://localhost:17000/books/'+id)
  .then(resp => {
    res.status(200).redirect('/');
  })
  .catch(erro => {
    res.status(500).render('error', { 'error': erro });
  })
});

/* GET edit book page */
router.get('/edit/:id', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16);
  var id = req.params.id
  axios.get('http://localhost:17000/books/' + req.params.id)
  .then(resp => {
    res.status(200).render('editBookPage', {'book': resp.data, 'date': date});
  })
  .catch(erro => {
    res.status(500).render('error', { 'error': erro });
  })
});

/* POST edit book */
router.post('/edit/:id', function(req, res, next) {
  var id = req.params.id
  var body = req.body

  axios.put('http://localhost:17000/books/' + id, body)
  .then(resp => {
    res.status(201).redirect('/');
  })
  .catch(erro => {
    res.status(500).render('error', { 'error': erro });
  })
});

/* GET book details - must be last */
router.get('/:id', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16);
  axios.get('http://localhost:17000/books/' + req.params.id)
    .then(resp => {
      res.status(200).render('bookPage', {'book': resp.data, 'date': date});
    })
    .catch(erro => {
      res.status(500).render('error', { 'error': erro });
    })
});

module.exports = router;
