const express = require('express');
const router = express.Router();
const Character = require("../models/Character")

router.get('/json-server-learning-unit', (req, res, next) => {
  res.render('JSONServer');
});


router.get('/getRandomNumbers', (req, res, next) => {
  res.render('getRandomNumbersView');
});

router.get('/gabri/:totalNumbersRequired', (req, res, next) => {
  res.json(Array(+req.params.totalNumbersRequired).fill().map(x => Math.random() * 100))
});

router.get("/charactersGenerator", (req, res) => {
  res.render("charactersGenerator")
})

router.get("/allCharacters", (req, res) => {
  Character
    .find()
    .then(allCharacters => res.json(allCharacters))
})

router.put("/updateCharacter", (req, res) => {
  Character
    .findByIdAndUpdate(req.body.id, req.body)
    .then(allCharacters => {
      Character
        .find()
        .then(allCharacters => res.json(allCharacters))
    })
})

router.post("/charactersGenerator", (req, res) => {
  Character
    .create(req.body)
    .then(newCharacterInMongo => {
      res.redirect("/allCharacters")
    })
})

module.exports = router;
