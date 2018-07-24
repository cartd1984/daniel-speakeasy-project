// src/routes/speakeasy.js
'use strict';

var express = require("express");
var router = express.Router();
var Drinks = require("../models").Drinks;

var jsonParser = require("body-parser").json;

//Speakeasy main page.
router.get("/", function(req, res, next) {
    Drinks.find({}, function (err, drinks) {
        if (err) return next (err);
        res.json(drinks);
    });
});

//This route WORKS - show a 200 on the server & postman
router.post("/", function(req, res, next) {
    var drink = new Drinks(req.body);
    drink.save(function(err, drink) {
        if (err) return next (err);
        res.status(201);
        res.json(drink);
    });
});

//Route GETS specific drink vote
router.get("/:drinkID", function(req, res, next) {
    Drinks.findById(req.params.drinkID, function (err, doc) {
        if (err) return next (err);
        res.json(doc);
    });
});

//Edits a particular vote or post
router.put("/:drinkID", function (req, res) {
    Drinks.findByIdAndUpdate(req.params.drinkID, req.body, {new: true}, function (err, drink) {
        if (err) {
            return res.status(500);
        }
        console.log(drink)
        drink.rate.vote(0, function(err, newDrink) {
            if (err) {
                res.status(400).json(err);
            }
        })
        
        return res.json(drink)
    })
});

//DELETE /speakeasy/:vID
//Delete a specific comment or vote
router.delete("/:drinkID", function (req, res) {
    Drinks.findByIdAndDelete(req.params.drinkID, function (err) {
        if (err) return res.error(500);
        return res.json({});
    });
});

module.exports = router;