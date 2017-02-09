var express = require('express'),
    allData  = require('./data/all');

var app = module.exports = express.Router();

// get all requests
app.get('/ED/', function(req, res) {
  res.status(200).send(allData.getAll());
});
