var express = require('express');
var router = express.Router();
const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

router.get('/register', (req, res) => {
  res.send('register')
})

module.exports = router