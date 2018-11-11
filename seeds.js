var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data =[
    {  name:'The 2nd Shift Podcast', 
     image:'https://cdn.pixabay.com/photo/2017/09/26/13/50/rv-2788677_960_720.jpg', 
     description: 'A real cool place to be man',
      link: 'blah' },

    {  name:'The Shoot Your Shot Podcast', 
    image:'https://cdn.pixabay.com/photo/2017/09/26/13/50/rv-2788677_960_720.jpg',
     description: 'cool stuff ',
      link: 'blah'  },

    {  name:'The B. Inspired Podcast', 
    image:'https://cdn.pixabay.com/photo/2017/09/26/13/50/rv-2788677_960_720.jpg',
     description: 'Stay motivated and shit ', 
     link: 'blah' }
]

function seedDB(){ 
    //remove all camgrounds
    Campground.remove({}, function (err){
    if(err){
        console.log(err);
    } else {
    console.log("removed campgrounds!");
    //add a few campgrounds
    data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if (err){
                console.log(err)
            } else {
                console.log("added a campground");
                //create a comment 
                Comment.create(
                    {text: "this place is great",
                             author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                    campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                                }
                            });

                            
            }
        });
    });
    }
});

//add a few comments
}
module.exports = seedDB;