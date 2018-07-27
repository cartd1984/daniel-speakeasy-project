// src/server.js

const express = require('express');
const config = require('./config');
const path = require('path');
const app = express();
const speakeasyRoutes = require('./routes/speakeasy');
const publicPath = path.resolve(__dirname, '../public');
const mongoose = require('mongoose');
const jsonParser = require('body-parser').json;
//const logger = require("morgan")

//import models
require('./models/models.js')

console.log(config);

//db connection string
mongoose.connection.openUri(`mongodb://${config.db.username}:${config.db.password}@${config.db.host}/${config.db.dbName}`);

//middleware
app.use(jsonParser());
app.use(express.static(publicPath));
app.use('/speakeasy', speakeasyRoutes);
app.use(express.static(publicPath));
//app.use(logger("dev"));

//template engine & enhanced JS
//app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//Test to see if database is on and working

/*
db.on("error", function(err){
    console.error("connection error:", err);
});

db.once("open", function () {
    console.log("db connection successful");
});

app.get("/", (req, res) => {
    res.render('speakeasy');
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

*/

app.listen(config.port, function() {
  console.log(`${config.appName} is listening on port ${config.port}`);
});