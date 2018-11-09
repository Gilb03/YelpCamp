var express = require("express");
var app = express();
var bodyParser = require("body-parser");
    
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine","ejs");
var campgrounds =[
    {  name:'The 2nd Shift Podcast',  image:'https://pixabay.com/get/eb32b9072ef3063ed1584d05fb1d4e97e07ee3d21cac104497f5c47da3eab4bb_340.jpg', description: 'A real cool place to be man', link: 'blah' },
    {  name:'The Shoot Your Shot Podcast', image:'https://pixabay.com/get/eb32b9072ef3063ed1584d05fb1d4e97e07ee3d21cac104497f5c47da3eab4bb_340.jpg', description: 'cool stuff ', link: 'blah'  },
    {  name:'The B. Inspired Podcast', image:'https://pixabay.com/get/eb32b9072ef3063ed1584d05fb1d4e97e07ee3d21cac104497f5c47da3eab4bb_340.jpg', description: 'Stay motivated and shit ', link: 'blah' }
    ];


app.get( "/", function (req, res){
res.render("landing");
});
app.get("/campgrounds", function (req, res){
         res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function (req, res){
    var name = req.body.name,
      image = req.body.image,
      description = req.body.description,
      link = req.body.link,
      newCampground = {  name: name,  image: image,  description: description,  link: link }
  campgrounds.push(newCampground)
  res.redirect('/campgrounds')
});
app.get("/campgrounds/new", function (req, res){
    res.render("new.ejs");
});

const port = process.env.PORT || 3000
app.listen(port, process.env.IP, function() {
console.log('server is listening on port: ' + port)
module.exports = app
});
