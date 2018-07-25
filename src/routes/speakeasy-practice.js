// src/routes/speakeasy-practice.js
'use strict';

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/models.js").Drinks;

var jsonParser = require("body-parser").json;

//Speakeasy main page.

router.get("/", function(req, res, next) {
  mongoose.model("Drinks").find({deleted: {$ne: true}}, function (err, Drinks) {
    if (err) {
        console.log(err);
        return res.status(500).json(err);
    }
      res.json(Drinks); 
  });
});

//Post new drink information
router.post("/", function(req, res, next) {
  const Drink = mongoose.model('Drinks');
  /* const drinkData = {
    name: req.body.name,
    description: req.body.description,
    rate: req.body.rate,
    comments: req.body.comments
  }; */

  Drink.create(drinkData, function(err, newDrink) {
        /* if(drinkData.rate < 1) {
            const err = new Error("Please choose a number between 1 and 5.");
            return err;
        } else if (drinkData.rate > 5) {
            const err = new Error("Number is too high. Please choose a number between 1 and 5.");
            return err;
        } else if (err) {
            console.error(err);
            return res.status(500).json(err);
        }

        res.json(newDrink);
  }); */
      
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    res.json(newDrink);
  });
});

//Route GETS specific drink 
//an error seems to occur in my route on line 62, there seems to be a problem with my Drinks.find() method
router.get("/:drinkID", function(req, res, next) {
  const Drinks = mongoose.model('Drinks');
  const drinkID = req.params.drinkID;

  const beverage = Drinks.find(entry => entry.id === drinkID);
  if (!beverage) {
    return res.status(404).end(`Could not find file '${drinkID}'`);
  }

  res.json(drinkID);

});

//Edits a particular drink
router.put('/:drinkID', function(req, res, next) {
  const Drinks = mongoose.model('Drinks');
  const drinkID = req.params.drinkID;
  console.log(req.params.drinkID);
  
  Drinks.findById(drinkID, function(err, drink) {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    if (!drink) {
      return res.status(404).json({message: "Drink not found"});
    }
  });

/*
router.put('/:drinkID', function(req, res, next) {
  const Drinks = mongoose.model('Drinks');
  const drinkID = req.params.drinkID;
  
  Drinks.findById(drinkID, function(err, drink) {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    if (!drink) {
      return res.status(404).json({message: "Drink not found"});
    }
  
    drink.name = req.body.name;
    drink.description = req.body.description;
    drink.rate = req.body.rate;
    drink.comments = req.body.comments;
  
    drink.save(function(err, savedDrink) {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      res.json(savedDrink);
    })
  
  })
}); */

/* router.put("/:drinkID", function (req, res) {
    Drinks.findByIdAndUpdate(req.params.drinkID, req.body, {new: true}, function (err, drink) {
        if (err) return res.error(500);
        return res.json(drink);
    });
}); */

//DELETE /speakeasy/:vID
//Delete a specific comment or vote
router.delete("/:drinkID", function (req, res) {
    Drinks.findByIdAndDelete(req.params.drinkID, function (err) {
        if (err) return res.error(500);
        return res.json({});
    });
});

module.exports = router;