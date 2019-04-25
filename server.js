const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
var exphbs  = require('express-handlebars');
const db = require("./models");
const PORT = process.env.PORT || 8000
const app = express();
require('dotenv').config()

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


var MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.get("/", (req, res) => {

    axios.get("https://www.npr.org/sections/news").then(response => {

    const $ = cheerio.load(response.data);

    $("article.item").each((i, element) => {

        const result = {};
        result.title = $(element).find("div.item-info-wrap").find("div.item-info").find("h2.title").text();
        result.link = $(element).find("div.item-info-wrap").find("div.item-info").find("h2.title").find("a").attr("href");
        result.teaser = $(element).find("div.item-info-wrap").find("div.item-info").find("p.teaser").find("a").text();
        result.img = $(element).find("div.item-image").find("div.imagewrap").find("a").find("img").attr("src");


        db.Article.findOne({ link: result.link })
        .then(dbArticle => {
            if (!dbArticle) { 
                db.Article.create(result)
                .then(dbArticle => {

                console.log(dbArticle);
                })
                .catch(err => {

                console.log(err);
            });
            }
        })

    }); 
  }).then(()=>{
    axios.get("https://theundefeated.com/").then(response => {

    const $ = cheerio.load(response.data);

    $("section.panel").each((i, element) => {
      const result = {};
        result.link = $(element).find("a.image").attr("href");
        result.img = $(element).find("a.image").find("img").attr("src");
        result.title = $(element).find("a.link").find("h2").text();
        result.teaser = $(element).find("a.link").find("p").text();

        db.Undefeated.findOne({ link: result.link })
        .then(dbUndefeated=> {
            if (!dbUndefeated ) { 
              db.Undefeated.create(result)
                .then(dbUndefeated  => {

                console.log(dbUndefeated);
                })
                .catch(err => {

                console.log(err);
            });
            }
        })

    })
  })
  }).catch({})
  res.render('landing')
})



app.get("/npr", (req, res) => {
    db.Article.find({})
        .then(dbArticle => {
        res.json(dbArticle);
        })
        .catch(err => {
        res.json(err);
    });
});

app.get("/undefeated", (req, res) => {
    db.Undefeated.find({})
        .then(dbArticle => {
        res.json(dbArticle);
        })
        .catch(err => {
        res.json(err);
    });
});

app.get("/articles/:id", (req, res) => {
  db.Article.findOne({ _id: req.params.id })
    .populate("note")
    .then(dbArticle => {
      res.json(dbArticle);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/delete/:id", (req, res) => {
  db.Note.find({ _id: req.params.id }).remove()
  .then(dbArticle => {
    res.json(dbArticle);
  })
  .catch(err => {
    res.json(err);
  });
});

app.put("/update/:id", (req, res) => {
  if (res.req.body.title == "") {
    console.log("yes")
    db.Note.update({ _id: req.params.id }, {$set: {title: "This is the beginning of the comments!"}})
    .then(dbArticle => {
      res.json(dbArticle);
    })
    .catch(err => {
      res.json(err);
    });
  }
  else {
    console.log("no")
    db.Note.update({ _id: req.params.id }, {$set: {title: res.req.body.title}})
    .then(dbArticle => {
      res.json(dbArticle);
    })
    .catch(err => {
      res.json(err);
    });
  }
});

app.post("/articles/:id", (req, res) => {
  db.Note.create(req.body)
    .then(dbNote => {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
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