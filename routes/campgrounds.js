//===============================
//INDEX ROUTES
//================================
//index route - show all campgrounds
var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");


//INDEX ROUTES
router.get("/", function (req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser: req.user});
        }
    });   
});

//create route
router.post("/", middleware.isLoggedIn, function (req, res){
    var name = req.body.name,
        author = {
            id: req.user._id,
            username: req.user.username
        }
      image = req.body.image,
      description = req.body.description,
      link = req.body.link,
      newCampground = {  name: name,  image: image,  description: description,  link: link, author: author }
  //  create a new campground and save to dB
      Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
      });
});
//new -show form to create new campground
router.get("/new", middleware.isLoggedIn, function (req, res){
    res.render("campgrounds/new");
});

//SHOW Route -shows more info about one campground
router.get("/:id", function(req, res){
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//EDIT CAMPGROUND ROUTE *no issues found*
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
     res.render("campgrounds/edit", {campground: foundCampground}); 
   });
});
//UPDATE CAMPGROUND ROUTE 
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    //findandupdate the correct campground 
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampround){
        if(err){
            res.redirect("/campgrounds");
        } else {
                res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;