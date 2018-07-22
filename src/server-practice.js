'use strict';

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/drinkpractice");
var db = mongoose.connection;

db.on("error", function (err) {
    console.error("connection error", err);
});

db.once("open", function () {
    console.log("db connection successful");
    //Database communication will go here
    
    var Schema = mongoose.Schema;
    
    var DrinkSchema = new Schema ({
        name: {type: String, default: "whiskey sour"},
        description: {type: String, default: "a sour whiskey drink"},
        rate: {type: Number, default: 3},
        comments: {type: String, default: "An OK drink. A little too sour though."}
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
    
    var whiskeyAndCoke = new Beverage ({
        name: "whiskey and coke",
        description: "a whiskey drink that has a dash of Coca-Cola in it",
        comments: "so so. I'm pretty sure they gave me well whiskey"
    });
    
    Beverage.remove({}, function(err){
        if(err) console.error(err);
        oldFashioned.save(function(err){
          if (err) console.error(err);
            beverage.save(function(err){
                if (err) console.error(err);
                  ginRickey.save(function(err){
                      if (err) console.error(err);
                        beesKnees.save(function(err){
                            if (err) console.error(err);
                            whiskeyAndCoke.save(function(err){
                                if (err) console.error(err);
                                    Beverage.find({rate: 5}, function(err, beverages) {
                                      beverages.forEach(function(beverage){
                                          console.log(beverage.name + " " + beverage.rate);
                                      });
                                    db.close(function(){
                                    console.log("db connection closed");
                            });
                      });
                    });
                });
            });
        });
    });
    });
    });