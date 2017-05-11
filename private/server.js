#!/usr/bin/env node
'use strict';
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'inspection_time'
});

//open db connection
connection.connect();

var logEntry = function (user, successful) {
  var valueToUpdate = successful ? "correct" : "wrong";
  connection.query('UPDATE users SET ' + valueToUpdate + '=' + valueToUpdate + '+1 WHERE name=\'' + user + '\'', function (error, results, fields) {
    if (error)
      throw error;
  });
};

//expose public files
app.use(express.static('public'));

//middleware parser for POST requests
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile('index.html', {root: __dirname + "/../"});
});
app.post('/logresults', function (req, res) {
  logEntry('test', req.body.successful == 'true');
  res.end();
});
app.listen(3000, function () {
  console.log("Started on PORT 3000");
});
