var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burger: data
    };
    console.log(hbsObject);

    res.render("index", hbsObject);
  });
});

router.post("/", function(req, res) {
  burger.create([
    "name", "devoured"
  ], [
    req.body.name, req.body.devoured
  ], function() {
    res.redirect("/");
  });
});

router.put('/:id', function (req, res) {
  var condition = 'id = ' + req.params.id;
  console.log('condition', condition);
  burger.update({ devoured: req.body.devoured }, condition, function () {
    res.redirect('/');
  });
});

router.delete('/:id', function (req, res) {
  
  var condition = 'id = ' + req.params.id;
//console.log(condition);
  burger.delete(condition, function () {
    res.redirect('/');
  });
});




// router.delete("/:id", function(req, res) {
//   console.log("hello")
//    var condition = "id = " + req.body.id;
//    burger.delete({
//     id:req.body.id
//   }, function() {
//     res.redirect("/");

//   });
// });



// Export routes for server.js to use.
module.exports = router;
