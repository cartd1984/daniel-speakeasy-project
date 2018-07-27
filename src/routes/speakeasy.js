// src/routes/speakeasy-practice.js

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/models.js").Drinks;
const jsonParser = require("body-parser").json;

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
  const drinkData = {
      name: req.body.name,
      description: req.body.description,
      rate: req.body.rate,
      comments: req.body.comments
  }
  
  Drink.create(drinkData, function(err, newDrink) {
     if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    res.json(newDrink);
  });
});

//Route GETS specific drink 
router.get("/:drinkID", function(req, res, next) {
  const Drinks = mongoose.model('Drinks');
  const drinkID = req.params.drinkID;

  Drinks.findById(drinkID, function (err, drink) {
      if(err) {
          console.error(err);
          return res.status(500).json(err);
      }
      if(!drink) {
          return res.status(404).end(`Could not find drink '${drinkID}'`);
      }
  });

  res.json(drinkID);

});

//Edits a particular drink
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
});

//Deletes a drink
router.delete('/:drinkID', function(req, res, next) {
  const Drinks = mongoose.model('Drinks');
  const drinkId = req.params.drinkID;

  Drinks.findById(drinkId, function(err, drink) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    if (!drink) {
      return res.status(404).json({message: "File not found"});
    }

    drink.deleted = true;

    drink.save(function(err, deletedDrink) {
      res.json(deletedDrink);
    })

  })
});

module.exports = router;