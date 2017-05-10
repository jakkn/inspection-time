#!/usr/bin/env node
'use strict';
var express = require("express");
var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendfile("public/index.html");
});
app.post('/login', function (req, res) {
  var user_name = req.body.user;
  var password = req.body.password;
  console.log("User name = " + user_name + ", password is " + password);
  res.end("yes");
});
app.listen(3000, function () {
  console.log("Started on PORT 3000");
})
