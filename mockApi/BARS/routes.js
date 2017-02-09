var express = require('express'),
    allData  = require('./data/all');

var app = module.exports = express.Router();

// get all requests
app.get('/BARS/', function(req, res) {
  res.status(200).send(allData.getAll());
});

// get requests user is involved in
app.get('/BARS/RequestsForSelf/:role/:type', function(req, res) {
  var role = req.params.role;
  var type = req.params.type;
  console.log(`RECIEVED RequestsForSelf -- ROLE: ${role}, TYPE: ${type}`);
  res.status(200).send(allData.GetRequestsForSelf(role, type));
});

// get requests needing approval (manager or security)
app.get('/BARS/RequestsNeedingApproval/:role/:type', function(req, res) {
  var role = req.params.role;
  var type = req.params.type;
  console.log(`RECIEVED RequestsNeedingApproval -- ROLE: ${role}, TYPE: ${type}`);
  res.status(200).send(allData.GetRequestsNeedingApproval(role, type));
});

app.post('/BARS/')
