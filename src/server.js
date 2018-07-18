// src/server.js

'use strict';

var express = require("express");
var app = express();
var config = require("./config");

var jsonParser = require("body-parser").json;
var logger = require("morgan");

app.use(logger("dev"));
app.use(jsonParser());

var mongoose = require("mongoose");
var db = mongoose.connection;

mongoose.connect("mongodb://localhost:27017/qa");

db.on("error", function(err){
    console.error("connection error:", err);
});

db.once("open", function () {
    console.log("db connection successful");
});

var index = require("./routes/index");
var questions = require("./routes/questions");
var speakeasy = require("./routes/speakeasy");

app.use("/", index);
app.use("/questions", questions);
app.use("/speakeasy", speakeasy);

//catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

app.listen(config.port, function() {
  console.log(`${config.appName} is listening on port ${config.port}`);
});