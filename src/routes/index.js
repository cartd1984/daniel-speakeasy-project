'use strict';

var express = require("express");
var router = express.Router();

var jsonParser = require("body-parser").json;

//GET /speakeasy-vote
//Route for drink collection & selection
router.get("/", function(req, res) {
    res.json({response: "You sent me a GET request to the daniel speakeasy page"});
});

//POST /speakeasy-vote
//Route for voting on speakeasy drinks and commenting
router.post("/", function(req, res) {
    res.json({
        response: "You sent me a POST request on the daniel speakeasy page",
        body: req.body
    });
});

//POST /speakeasy-vote/comment
//Route if you BOTH vote AND comment on speakeasy page
router.get("/comment", function(req, res) {
    res.json({
        response: "You sent me a GET request for ID " + req.params.comment
    });
});

//PUT /speakeasy-vote/comment/:aID
//Edit a specific comment
router.put("/speakeasy-vote/comment/:aID", function (req, res) {
    res.json({
        response: "You sent me a PUT request to /speakeasy-vote/comment/",
        commentId: req.params.aID,
        body: req.body
    });
});

//DELETE /speakeasy-vote/comment/:aID
//Delete a specific comment
router.delete("/:speakeasy-vote/comment/:aID", function (req, res) {
    res.json({
        response: "You sent me a DELETE request to /comment",
        commentId: req.params.aID
    });
});

//POST /questions/:qID/answers/:aID/vote-up
//POST /questions/:qID/answers/:aID/vote-down
//Vote on a specific answer

router.post("/:qID/answers/:aID/vote-:dir", function (req, res, next){
    if (req.params.dir.search(/^(up|down)$/) === -1) {
        var err = new Error("Not Found");
        err.status = 404;
        next(err);
    } else {
        next();
    }
}, function (req, res) {
    res.json({
        response: "You sent me a POST request to /vote-" + req.params.dir,
        questionId: req.params.qID,
        answerId: req.params.aID,
        vote: req.params.dir
    });
}); 

module.exports = router;