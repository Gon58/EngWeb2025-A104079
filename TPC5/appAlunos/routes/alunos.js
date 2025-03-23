var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16);
  axios.get('http://localhost:3000/alunos?_sort=name')
  .then(resp => {
    res.status(200).render('index', {'slist': resp.data, 'date': date});
  })
  .catch(erro => {
    res.status(500).render('error', { 'error': erro });
  })
});

router.get('/registo', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16);
  res.status(200).render('studentsFormPage', {'date': date});
});

router.post('/registo', function(req, res, next) {
  var body = req.body

  for(let i=1; i <= 8; i++) {
    const tpc = `tpc${i}`
    if(tpc in body) {
        body[tpc] = true
    }
  }

  axios.post('http://localhost:3000/alunos', body)
  .then(resp => {
    res.status(201).redirect('/alunos');
  })
  .catch(erro => {
    res.status(500).render('error', { 'error': erro });
  })
});

router.get('/delete/:id', function(req, res, next) {
  var id = req.params.id
  axios.delete('http://localhost:3000/alunos/'+id)
  .then(resp => {
    res.status(200).redirect('/alunos');
  })
  .catch(erro => {
    res.status(500).render('error', { 'error': erro });
  })
});

router.get('/:id', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16);
  axios.get('http://localhost:3000/alunos/' + req.params.id)
    .then(resp => {
      res.status(200).render('studentPage', {'aluno': resp.data, 'date': date});
    })
    .catch(erro => {
      res.status(500).render('error', { 'error': erro });
    })
});

router.get('/edit/:id', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16);
  var id = req.params.id
  axios.get('http://localhost:3000/alunos/' + req.params.id)
  .then(resp => {
    res.status(200).render('studentEditPage', {'aluno': resp.data, 'date': date});
  })
  .catch(erro => {
    res.status(500).render('error', { 'error': erro });
  })
});

router.post('/edit/:id', function(req, res, next) {
  var id = req.params.id
  var body = req.body

  for(let i=1; i <= 8; i++) {
    const tpc = `tpc${i}`
    if(tpc in body) {
        body[tpc] = true
    }
  }

  axios.put('http://localhost:3000/alunos/' + id, body)
  .then(resp => {
    res.status(201).redirect('/alunos');
  })
  .catch(erro => {
    res.status(500).render('error', { 'error': erro });
  })
});

module.exports = router;