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

RatingSchema.method("vote", function(vote, callback) {
    //vote can only be in a number range from 1 to 5 in whole numbers only
    if (vote < 1) {
        console.log(err);
    } else if (vote > 5) {
        console.log(err);
    } else {
        return vote;
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
