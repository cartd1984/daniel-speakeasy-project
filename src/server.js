// src/server.js

'use strict';

const express = require("express");
const path = require("path");
const jsonParser = require("body-parser").json;
const config = require("./config");
const speakeasyRoutes = require("./routes/speakeasy-practice");
const logger = require("morgan");

//require mongoose
const mongoose = require("mongoose");

var db = mongoose.connection;

//connect to mongo database through mongoose
mongoose.connect("mongodb://localhost:27017/drinkpractice");

//import models
const Drinks = require("./models").Drinks;

const app = express();
const publicPath = path.resolve(__dirname, '../public');
app.use(jsonParser());

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(publicPath));

app.use(logger("dev"));
//app.set('view engine', 'pug');

app.use("/speakeasy-practice", speakeasyRoutes);

db.on("error", function(err){
    console.error("connection error:", err);
});

db.once("open", function () {
    console.log("db connection successful");
});

app.get("/", (req, res) => {
    res.render('speakeasy-practice');
});

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