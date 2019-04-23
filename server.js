const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
var exphbs  = require('express-handlebars');

// Require all models
const db = require("./models");

const PORT = 3003;

// Initialize Express
const app = express();

// Configure middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// Use morgan logger for logging requests
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/nprArticles";

mongoose.connect(MONGODB_URI)

// A GET route for scraping the echoJS website
app.get("/scrape", (req, res) => {
  // First, we grab the body of the html with axios
  axios.get("https://www.npr.org/sections/news").then(response => {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    const $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    $("article.item").each((i, element) => {
      // Save an empty result object
      const result = {};

      
    result.title = $(element).find("div.item-info-wrap").find("div.item-info").find("h2.title").text();
    result.link = $(element).find("div.item-info-wrap").find("div.item-info").find("h2.title").find("a").attr("href");
    result.teaser = $(element).find("div.item-info-wrap").find("div.item-info").find("p.teaser").find("a").text();
    result.img = $(element).find("div.item-image").find("div.imagewrap").find("a").find("img").attr("src");

      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(dbArticle => {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(err => {
          // If an error occurred, log it
          console.log(err);
        });
    });

    res.send("hey");
  });
}); 


app.get('/', function (req, res) {
    res.render('landing');
});

app.get("/articles", (req, res) => {
    // Grab every document in the Articles collection
    db.Article.find({})
      .then(dbArticle => {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
      })
      .catch(err => {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });


// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});