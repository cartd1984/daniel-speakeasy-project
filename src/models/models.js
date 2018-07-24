'use strict';

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var DrinkSchema = new Schema ({
        name: {type: String, default: "whiskey sour"}, //name of the drink
        description: {type: String, default: "a sour whiskey drink"}, //describe the drink
        rate: {type: Number, default: 3}, //scale from 1 to 5
        comments: {type: String, default: "An OK drink. A little too sour though."} //details about the drink, if you liked it, and what needs to be improved
    });
    

    var Beverage = mongoose.model("Beverage", DrinkSchema);
    
    var oldFashioned = new Beverage ({
        name: "smoked old fashioned",
        description: "a classic whiskey cocktail made with sugar and bitters, with a nice smoky flavor",
        rate: 5,
        comments: "great overall drink! Loved it! Could taste the whiskey, sugar, and bitters and it had a smooth, smoky aftertaste."
    });
    
    var beverage = new Beverage({}); //whiskey sour
    
    var ginRickey = new Beverage ({
        name: "gin rickey",
        description: "a classic highball drink made from gin, with lime and carbonated water",
        rate: 4,
        comments: "a nice, refreshing drink. A little too much gin"
    });
    
    var beesKnees = new Beverage ({
        name: "bees knees",
        description: "a gin cocktail that is truly the bees knees",
        rate: 5,
        comments: "this drink was AWESOME! It was truly the bees knees"
    });
    

/* - still need to work on my voting limits here

DrinkSchema.methods.rate = function(vote, comments) {
    //vote can only be in a number range from 1 to 5 in whole numbers only
    if (vote < 1) {
        const err = new Error("You screwed up, dumbass. Put down the bottle and try again.");
        return callback(err);
    } else if (vote > 5) {
        throw new Error("Idiot! Try again.");
    } 
    
    this.rates.push({
        rate: vote,
        comments: comments;
}); */

var Drinks = mongoose.model("Drinks", DrinkSchema);

/* Drinks.count({}, function(err, count) {
  if (err) {
    throw err;
  }
  
  if (count > 0) return ;

  const drinks = require('./file.seed.json');
  Drinks.create(drinks, function(err, newDrinks) {
    if (err) {
      throw err;
    }
    console.log("DB seeded")
  });

}); */

module.exports = Drinks;
