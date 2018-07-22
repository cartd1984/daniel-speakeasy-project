// src/routes/speakeasy-practice.js
'use strict';

const express = require("express");
const router = express.Router();
const Drinks = require("../models").Drinks;

var jsonParser = require("body-parser").json;

//Speakeasy main page.
/*
router.get("/", function(req, res, next) {
    Drinks.find({}, function (err, drinks) {
        if (err) return next (err);
        res.json(drinks);
    });
}); */

router.get("/", function(req, res, next) {
  mongoose.model("Drinks").find({}, function (err, drinks) {
    if (err) {
        console.log(err);
        return res.status(500).json(err);
  }
  });

  res.json(drinks);
      
});

/* router.get("/", function(req, res, next) {
    const drinksModel = mongoose.model("Drinks");
    
    drinksModel.find({}, function (err, Drinks) {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        
        res.json(Drinks);
    });
}); */

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
        if (err) return res.error(500);
        return res.json(drink);
    });
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