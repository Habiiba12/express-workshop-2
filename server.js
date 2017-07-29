const express = require("express");
const app = express();

// The extensions 'html' allows us to serve file without adding .html at the end 
// i.e /my-cv will server /my-cv.html
const fs = require("fs");
const exphbs = require('express-handlebars');

const readposts = require("./helpers/readPosts");


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static("public", { 'extensions': ['html'] }));


app.get('/', function (req, res) {
  const filePath = __dirname + '/data/posts.json';
  const callbackFunction = function (error, file) {
    // we call .toString() to turn the file buffer to a String
    const fileData = file.toString();
    // we use JSON.parse to get an object out the String
    const postsJson = JSON.parse(fileData);
    // send the json to the Template to render
    res.render('index', {
      title: 'Habiiba Profile', // insert your name instead
      posts: postsJson
    });
  };
  fs.readFile(filePath, callbackFunction);
});
app.get("/my-cv", function (req, res) {
  res.render("my-cv", {
    title: "khalid blog",
    subheading: "subheading"
  });

})

app.get("/api/posts",function(req,res){
  readposts(function(error,posts){
    res.json(posts);
  })
})

app.get("/contact", function (req, res) {
  res.render("contact");
})
app.get("/admin", function (req, res) {
  res.render("admin"); app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
  app.set('view engine', 'handlebars');
})
// what does this line mean: process.env.PORT || 3000
app.listen(process.env.PORT || 3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});