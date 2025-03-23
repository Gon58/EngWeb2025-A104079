var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var date = new Date().toISOString().substring(0, 16);
    res.status(200).render('mainPage', {'date': date});
});

module.exports = router;