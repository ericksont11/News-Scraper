const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
var exphbs  = require('express-handlebars');
require('dotenv').config()

const db = require("./models");

var PORT = process.env.PORT || 3000

const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


var MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.get("/scrape", (req, res) => {

  axios.get("https://www.npr.org/sections/news").then(response => {

    const $ = cheerio.load(response.data);

    $("article.item").each((i, element) => {

        const result = {};
        result.title = $(element).find("div.item-info-wrap").find("div.item-info").find("h2.title").text();
        result.link = $(element).find("div.item-info-wrap").find("div.item-info").find("h2.title").find("a").attr("href");
        result.teaser = $(element).find("div.item-info-wrap").find("div.item-info").find("p.teaser").find("a").text();
        result.img = $(element).find("div.item-image").find("div.imagewrap").find("a").find("img").attr("src");

        db.Article.create(result)
            .then(dbArticle => {

            console.log(dbArticle);
            })
            .catch(err => {

            console.log(err);
        });
    });
    res.send("Scraping Complete");
  });
}); 


app.get('/', function (req, res) {
    res.render('landing');
});

app.get("/articles", (req, res) => {
    db.Article.find({})
        .then(dbArticle => {
        res.json(dbArticle);
        })
        .catch(err => {
        res.json(err);
    });
});


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});