// src/routes/speakeasy.js
'use strict';

var express = require("express");
var router = express.Router();
var DrinkRating = require("../models").DrinkRating;

var jsonParser = require("body-parser").json;

/* router.param("vID", function(req, res, next, id) {
    DrinkRating.findById (id, function (err, doc) {
        if (err) return next (err);
        if (!doc) {
            err = new Error("Not Found");
            err.status = 404;
            return next(err);
        }
        req.DrinkRating = doc;
        return next();
    });
}); */

//GET /speakeasy
//Speakeasy main page

/* router.get("/", function(req, res) {
    res.json({response: "You sent me a GET request to the daniel speakeasy page"});
}); */

router.get("/", function(req, res, next) {
    DrinkRating.find({}, function (err, DrinkRating) {
        if (err) return next (err);
        res.json(DrinkRating);
    });
});

//POST /speakeasy
//Route for voting on speakeasy drinks and commenting
/* router.post("/", function(req, res) {
    res.json({
        response: "You sent me a POST request on the daniel speakeasy page",
        body: req.body
        //redirect to a page that lets you know that you voted
        //create an error message if you try not to vote
        //have a drink selection for drinks you can choose from
    });
}); */

router.post("/", function(req, res, next) {
    var drinkRating = new DrinkRating(req.body);
    drinkRating.save(function(err, drinkRating) {
        if (err) return next (err);
        res.json(DrinkRating);
    });
});

//GET /speakeasy/:vID
//Route for a specific speakeasy vote
/* router.get("/:vID", function(req, res) {
    res.json({
        response: "You sent me a GET request for ID " + req.params.id
    });
}); */

//when I try this route on Postman I get a 500 Internal Server Error
router.get("/:id", function(req, res, next) {
    DrinkRating.findById(req.params.id, function (err, doc) {
        if (err) return next (err);
        res.json(doc);
    });
});

//This route is connected with the router.param method
/* router.get("/:vID", function(req, res, next) {
    res.json(req.DrinkRating);
}); */


//PUT /speakeasy/:vID
//Edit a specific comment
/* router.put("/:vID", function (req, res) {
    res.json({
        response: "You sent me a PUT request for ID " + req.params.id,
        commentId: req.params.id,
        body: req.body
    });
}); */

router.put("/:id", function (req, res) {
    req.answer.update(req.body, function (err, result){
        if (err) return next (err);
        res.json(result);
    });
});

//DELETE /speakeasy/:vID
//Delete a specific comment
router.delete("/:id", function (req, res) {
    req.answer.remove(function (err) {
        req.DrinkRating.save(function (err, DrinkRating) {
            if (err) return next (err);
            res.json(DrinkRating);
        });
    });
});

/* router.delete("/:vID", function (req, res) {
    res.json({
        response: "You sent me a DELETE request for ID " + req.params.id,
        commentId: req.params.id
    });
}); */ 

module.exports = router;