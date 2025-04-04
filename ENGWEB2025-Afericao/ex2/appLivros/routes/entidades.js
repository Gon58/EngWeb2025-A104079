var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/:idAutor', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16);
  axios.get('http://localhost:17000/books?author=' + req.params.idAutor)
    .then(resp => {
      if (resp.data.length > 0) {
        const authorInfo = {
          id: req.params.idAutor,
          name: resp.data[0].author,
          books: resp.data,
          totalBooks: resp.data.length
        };
        res.render('authorPage', { author: authorInfo, date: date });
      } else {
        res.status(404).render('error', { error: 'Author not found' });
      }
    })
    .catch(erro => {
      res.status(500).render('error', { error: erro });
    });
});

module.exports = router;
