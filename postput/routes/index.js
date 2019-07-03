const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/getRandomNumbers', (req, res, next) => {
  res.render('getRandomNumbersView');
});

router.get('/gabri/:totalNumbersRequired', (req, res, next) => {
  res.json(Array(+req.params.totalNumbersRequired).fill().map(x=> Math.random() * 100))
});

module.exports = router;
