'use strict';

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var RatingSchema = new Schema ({
    rating: Number,
    comment: String
});

RatingSchema.method("update", function (updates, callback) {
    Object.assign(this, updates, {updatedAt: new Date()});
    this.parent().save(callback);
});

//don't know why but if I change votes to "rating" mongodb crashes
RatingSchema.method("numbers", function(vote, callback) {
    //vote can only be in a number range from 1 to 5 in whole numbers only
    if (number < 1) {
        console.log(err);
    } else if (number > 5) {
        console.log(err);
    } else {
        return number;
    }
    this.parent().save(callback);
});

var DrinkSchema = new Schema ({
    name: String,
    //image:
    description: String,
    votes: [RatingSchema]
});

var DrinkRating = mongoose.model("DrinkRating", DrinkSchema);

module.exports.DrinkRating = DrinkRating;
