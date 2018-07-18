'use strict';

var express = require("express");
var router = express.Router();

var jsonParser = require("body-parser").json;

router.get("/", function(req, res) {
    res.json({response: "QUESTIONS"});
});


module.exports = router;