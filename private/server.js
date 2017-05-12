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
  const CREATE_USER = 'INSERT INTO users(name, correct, wrong, bestTime) VALUES(\'' + name + '\', 0, 0, 0)',
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

var updateUserStats = function (user, correctClick, bestTime) {
  const valueToUpdate = correctClick ? "correct" : "wrong",
    UPDATE_CLICK_STATS = 'UPDATE users SET ' + valueToUpdate + '=' + valueToUpdate + '+1 WHERE name=\'' + user + '\'',
    QUERY_BEST_TIME = 'SELECT bestTime from users WHERE name=\''+user+'\'',
    UPDATE_BEST_TIME = 'UPDATE users SET bestTime =' + bestTime + ' WHERE name=\'' + user + '\'';

  createUser(user);

  connection.query(UPDATE_CLICK_STATS, function (error, results, fields) {
    if (error)
      throw error;
  });

  connection.query(QUERY_BEST_TIME, function (error, results, fields) {
    if(bestTime < results)
      connection.query(UPDATE_BEST_TIME, function (error, results, fields) {
        if(error)
          throw error;
      });
    if(error)
      throw error;
  })
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
  updateUserStats(req.body.user, req.body.correctClick == 'true', req.body.bestTime);
  res.end();
});
app.listen(3000, function () {
  console.log("Started on PORT 3000");
});
