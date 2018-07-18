'use strict';

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/sandbox");
var db = mongoose.connection;

db.on("error", function(err){
    console.error("connection error:", err);
});

/* var sortAnswers = function (a, b) {
    // - negative a before b
    // 0 no change
    // + positive a after b
    
    if(a.votes === b.votes) {
        return b.updatedAt - a.updatedAt;
            
    }
    return b.votes - a.votes;
    
    
} */

var VoteSchema = new Schema({
    id: ObjectId,
    //drinkImage: ObjectId,
    rating: {type: Number, default: 1},
    comments: [{ body: String, date: Date }]
    drinkId: ObjectId
});

var DrinkSchema = new Schema({
    id: ObjectId,
    Name: String,
    Description: String
});


/*
AnswerSchema.method("update", function(updates, callback) {
   Object.assign(this, updates, {updatedAt: new Date()});
    this.parent().save(callback);
});

AnswerSchema.method("vote", function(vote, callback) {
    if (vote === "up") {
        this.votes += 1;
    } else {
        this.votes -= 1;
    }
     this.parent().save(callback);
});

var QuestionSchema = new Schema({
    text: String,
    createdAt: {type: Date, default: Date.now},
    answers: [AnswerSchema]
});

QuestionSchema.pre("save", function(next) {
   this.answers.sort(sortAnswers);
    next();
});

var Question = mongoose.model("Question", QuestionSchema);

module.exports.Question = Question; */