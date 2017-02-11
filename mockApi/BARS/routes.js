var express = require('express'),
  jwt = require('express-jwt'),
  config = require('../config'),
  allData = require('./data/new');

var app = module.exports = express.Router();

var jwtCheck = jwt({secret: config.secret});

app.use('/BARS/', jwtCheck);

// get all requests
app.get('/BARS/', function(req, res) {
  res.status(200).send(allData.getAll());
});

// get requests user is involved in
app.get('/BARS/RequestsForSelf/:role/:type', function(req, res) {
  var role = req.params.role;
  var type = req.params.type;
  console.log(`/BARS/RequestsForSelf/ -- ROLE: ${role}, TYPE: ${type}`);
  res.status(200).send(allData.GetRequestsForSelf(role, type));
});

// get requests needing approval (manager or security)
app.get('/BARS/RequestsNeedingApproval/:role/:type', function(req, res) {
  var role = req.params.role;
  var type = req.params.type;
  console.log(`/BARS/RequestsNeedingApproval/ -- ROLE: ${role}, TYPE: ${type}`);
  // console.log(req);
  res.status(200).send(allData.GetRequestsNeedingApproval(role, type));
});

// create a new request (any role)
app.post('/BARS/CreateNewRequest/', function(req, res) {
  console.log("/BARS/CreateNewRequest/ : ", req.body);
  res.status(201).send({value_recieved: req.body});
});
