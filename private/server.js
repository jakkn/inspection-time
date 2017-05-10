#!/usr/bin/env node
'use strict';
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

//expose public files
app.use(express.static('public'));

//middleware parser for POST requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile('index.html', { root: __dirname+"/../" });
});
app.post('/logresults', function (req, res) {
  console.log(req.body.number);
  res.end();
});
app.listen(3000, function () {
  console.log("Started on PORT 3000");
});
