const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
  res.send('Index');
});

router.get('/about', (req,res) => {
  res.send('About the movies App');
});

module.exports = router;