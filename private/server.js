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

var createUser = function (name) {
  const CREATE_USER = 'INSERT INTO users(name, total, correct, wrong) VALUES(\'' + name + '\', 0, 0, 0)',
    QUERY_USER = 'SELECT 1 FROM users WHERE name=\'' + name + '\'';

  connection.query(QUERY_USER, function (error, results, fields) {
    if (results < 1) {
      connection.query(CREATE_USER, function (error, results, fields) {
        if (error) {
          throw error;
        }
      });
    }
    if (error) {
      throw error;
    }
  });
};

var logEntry = function (user, successful) {
  const valueToUpdate = successful ? "correct" : "wrong",
    UPDATE_USER = 'UPDATE users SET ' + valueToUpdate + '=' + valueToUpdate + '+1 WHERE name=\'' + user + '\'';

  createUser(user);
  connection.query(UPDATE_USER, function (error, results, fields) {
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
  logEntry(req.body.user, req.body.successful == 'true');
  res.end();
});
app.listen(3000, function () {
  console.log("Started on PORT 3000");
});
